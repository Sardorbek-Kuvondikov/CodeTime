"use client";

import { useEffect } from "react";

const sectionHashes = ["#courses", "#advantages", "#results", "#contact"];

export function NavigationScrollspy() {
  useEffect(() => {
    const navLinks = document.querySelectorAll(".top-nav-link, .bottom-nav-item");
    const sections = sectionHashes
      .map((hash) => ({ hash, el: document.querySelector<HTMLElement>(hash) }))
      .filter((section): section is { hash: string; el: HTMLElement } => Boolean(section.el));

    function setActiveNav(hash: string) {
      navLinks.forEach((link) => {
        link.classList.toggle("active", link.getAttribute("href") === hash);
      });
    }

    function updateActiveSection() {
      const threshold = window.scrollY + window.innerHeight * 0.32;
      let current = sections[0];

      sections.forEach((section) => {
        if (section.el.offsetTop <= threshold) {
          current = section;
        }
      });

      if (current) {
        setActiveNav(current.hash);
      }
    }

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        const href = link.getAttribute("href");

        if (href?.startsWith("#")) {
          setActiveNav(href);
        }
      });
    });

    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    updateActiveSection();

    return () => {
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  return null;
}
