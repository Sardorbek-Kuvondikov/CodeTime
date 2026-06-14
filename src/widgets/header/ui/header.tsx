import { navigationItems } from "@/entities/navigation/model/items";
import { siteConfig } from "@/shared/config/site";
import { Icon } from "@/shared/ui/icon";

export function Header() {
  return (
    <header className="site-header">
      <div className="container header-inner">
        <a className="logo" href="#top">
          <span className="logo-icon">
            <Icon name="code" />
          </span>
          <span>{siteConfig.name}</span>
        </a>

        <nav className="top-nav" aria-label="Asosiy menu">
          {navigationItems.map((item, index) => (
            <a
              key={item.href}
              className={`top-nav-link ${index === 0 ? "active" : ""}`}
              href={item.href}
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="header-actions">
          <a
            className="header-cta"
            href={siteConfig.telegramAdminUrl}
            target="_blank"
            rel="noopener"
          >
            <Icon name="send" />
            <span>Kursga yozilish</span>
          </a>
        </div>
      </div>
    </header>
  );
}
