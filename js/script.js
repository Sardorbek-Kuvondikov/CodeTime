const canvas = document.getElementById("bgCanvas");
const ctx = canvas.getContext("2d");

let width = 0;
let height = 0;
let particles = [];
let animationFrame = null;

const pointer = {
  x: 0,
  y: 0,
  active: false,
};

function resizeCanvas() {
  const ratio = Math.min(window.devicePixelRatio || 1, 2);
  width = window.innerWidth;
  height = window.innerHeight;

  canvas.width = width * ratio;
  canvas.height = height * ratio;
  canvas.style.width = `${width}px`;
  canvas.style.height = `${height}px`;
  ctx.setTransform(ratio, 0, 0, ratio, 0, 0);

  const count = Math.min(120, Math.max(58, Math.floor(width / 13)));
  particles = Array.from({ length: count }, createParticle);
}

function createParticle() {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    z: Math.random() * 0.9 + 0.1,
    vx: (Math.random() - 0.5) * 0.45,
    vy: (Math.random() - 0.5) * 0.45,
    hue: 195 + Math.random() * 95,
  };
}

function drawGrid(time) {
  const centerX = width / 2 + Math.sin(time * 0.0004) * 32;
  const centerY = height * 0.58;
  const spacing = 72;

  ctx.save();
  ctx.translate(centerX, centerY);
  ctx.rotate(Math.sin(time * 0.00025) * 0.08);
  ctx.strokeStyle = "rgba(125, 211, 252, 0.085)";
  ctx.lineWidth = 1;

  for (let i = -12; i <= 12; i++) {
    ctx.beginPath();
    ctx.moveTo(i * spacing, -height);
    ctx.lineTo(i * spacing * 0.38, height);
    ctx.stroke();

    ctx.beginPath();
    ctx.moveTo(-width, i * spacing);
    ctx.lineTo(width, i * spacing * 0.42);
    ctx.stroke();
  }

  ctx.restore();
}

function drawParticles(time) {
  particles.forEach((particle, index) => {
    const parallaxX = pointer.active
      ? (pointer.x - width / 2) * particle.z * 0.018
      : 0;
    const parallaxY = pointer.active
      ? (pointer.y - height / 2) * particle.z * 0.018
      : 0;

    particle.x += particle.vx * (0.5 + particle.z);
    particle.y += particle.vy * (0.5 + particle.z);

    if (particle.x < -40) particle.x = width + 40;
    if (particle.x > width + 40) particle.x = -40;
    if (particle.y < -40) particle.y = height + 40;
    if (particle.y > height + 40) particle.y = -40;

    const drawX =
      particle.x + parallaxX + Math.sin(time * 0.001 + index) * particle.z * 8;
    const drawY =
      particle.y + parallaxY + Math.cos(time * 0.001 + index) * particle.z * 8;
    const size = 1.2 + particle.z * 2.8;

    ctx.fillStyle = `hsla(${particle.hue}, 90%, 68%, ${0.28 + particle.z * 0.44})`;
    ctx.shadowBlur = 16 * particle.z;
    ctx.shadowColor = `hsl(${particle.hue}, 90%, 62%)`;
    ctx.beginPath();
    ctx.arc(drawX, drawY, size, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    for (let j = index + 1; j < particles.length; j++) {
      const other = particles[j];
      const otherX =
        other.x +
        (pointer.active ? (pointer.x - width / 2) * other.z * 0.018 : 0);
      const otherY =
        other.y +
        (pointer.active ? (pointer.y - height / 2) * other.z * 0.018 : 0);
      const dx = drawX - otherX;
      const dy = drawY - otherY;
      const distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < 118) {
        ctx.strokeStyle = `rgba(125, 211, 252, ${0.14 * (1 - distance / 118)})`;
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(drawX, drawY);
        ctx.lineTo(otherX, otherY);
        ctx.stroke();
      }
    }
  });
}

function animate(time) {
  const bg = ctx.createLinearGradient(0, 0, width, height);
  bg.addColorStop(0, "#0b2438");
  bg.addColorStop(0.48, "#10304a");
  bg.addColorStop(1, "#0b3b3c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, width, height);

  drawGrid(time);
  drawParticles(time);
  animationFrame = requestAnimationFrame(animate);
}

window.addEventListener("resize", resizeCanvas);
window.addEventListener("mousemove", (event) => {
  pointer.x = event.clientX;
  pointer.y = event.clientY;
  pointer.active = true;
});
window.addEventListener("mouseleave", () => {
  pointer.active = false;
});

resizeCanvas();
animationFrame = requestAnimationFrame(animate);

const navSelect = document.querySelector(".nav-select");
const navTrigger = document.querySelector(".nav-trigger");
const selectedNavText = document.querySelector(".selected-nav span");
const navOptions = document.querySelectorAll(".nav-option");
const menuToggle = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".mobile-sidebar");
const sidebarClose = document.querySelector(".sidebar-close");
const sidebarOverlay = document.querySelector(".sidebar-overlay");
const sidebarLinks = document.querySelectorAll(".sidebar-nav a, .sidebar-cta");
const bottomNavItems = document.querySelectorAll(".bottom-nav-item");

function closeNavSelect() {
  navSelect?.classList.remove("open");
  navTrigger?.setAttribute("aria-expanded", "false");
}

function setActiveNav(hash) {
  const activeOption = document.querySelector(`.nav-option[href="${hash}"]`);

  if (activeOption) {
    navOptions.forEach((option) => option.classList.remove("active"));
    activeOption.classList.add("active");
  }

  bottomNavItems.forEach((item) => {
    item.classList.toggle("active", item.getAttribute("href") === hash);
  });

  if (activeOption && selectedNavText) {
    selectedNavText.textContent = activeOption.dataset.label;
  }
}

navTrigger?.addEventListener("click", (event) => {
  event.stopPropagation();
  const isOpen = navSelect.classList.toggle("open");
  navTrigger.setAttribute("aria-expanded", String(isOpen));
});

navOptions.forEach((option) => {
  option.addEventListener("click", () => {
    const href = option.getAttribute("href");

    if (href?.startsWith("#")) {
      setActiveNav(href);
    }

    closeNavSelect();
  });
});

bottomNavItems.forEach((item) => {
  item.addEventListener("click", () => {
    bottomNavItems.forEach((navItem) => navItem.classList.remove("active"));
    item.classList.add("active");

    const href = item.getAttribute("href");
    if (href?.startsWith("#")) {
      setActiveNav(href);
    }
  });
});

document.addEventListener("click", (event) => {
  if (!event.target.closest(".nav-select")) {
    closeNavSelect();
  }
});

function openSidebar() {
  document.body.classList.add("sidebar-open");
  menuToggle?.setAttribute("aria-expanded", "true");
}

function closeSidebar() {
  document.body.classList.remove("sidebar-open");
  menuToggle?.setAttribute("aria-expanded", "false");
}

menuToggle?.addEventListener("click", openSidebar);
sidebarClose?.addEventListener("click", closeSidebar);
sidebarOverlay?.addEventListener("click", closeSidebar);
sidebarLinks.forEach((link) => link.addEventListener("click", closeSidebar));

document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") {
    closeNavSelect();
    closeSidebar();
  }
});

const observedSections = ["#courses", "#advantages", "#results", "#contact"]
  .map((hash) => ({
    hash,
    element: document.querySelector(hash),
  }))
  .filter((section) => section.element);

function getActiveThreshold() {
  return window.scrollY + Math.min(window.innerHeight * 0.35, 320);
}

function updateActiveSection() {
  const activeThreshold = getActiveThreshold();
  let currentSection = observedSections[0];

  observedSections.forEach((section) => {
    if (section.element.offsetTop <= activeThreshold) {
      currentSection = section;
    }
  });

  if (currentSection) {
    setActiveNav(currentSection.hash);
  }
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
window.addEventListener("resize", updateActiveSection);
updateActiveSection().filter(Boolean);

function updateActiveSection() {
  let currentSection = null;

  observedSections.forEach((section) => {
    if (section.getBoundingClientRect().top <= 160) {
      currentSection = section;
    }
  });

  if (currentSection) {
    setActiveNav(`#${currentSection.id}`);
  }
}

window.addEventListener("scroll", updateActiveSection, { passive: true });
updateActiveSection();
