import { navigationItems } from "@/entities/navigation/model/items";
import { Icon } from "@/shared/ui/icon";

export function BottomNavigation() {
  return (
    <nav className="bottom-nav" aria-label="Telefon menyusi">
      {navigationItems.map((item, index) => (
        <a
          key={item.href}
          className={`bottom-nav-item ${index === 0 ? "active" : ""}`}
          href={item.href}
        >
          {item.icon ? <Icon name={item.icon} /> : null}
          <span>{item.label}</span>
        </a>
      ))}
    </nav>
  );
}
