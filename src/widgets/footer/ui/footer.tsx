import { siteConfig } from "@/shared/config/site";
import { Icon } from "@/shared/ui/icon";

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <p>© 2026 CodeTime IT Academy. Barcha huquqlar himoyalangan.</p>
        <div className="socials">
          <a target="_blank" rel="noopener" href={siteConfig.telegramChannelUrl} aria-label="Telegram">
            <Icon name="telegram" />
          </a>
          <a target="_blank" rel="noopener" href={siteConfig.instagramUrl} aria-label="Instagram">
            <Icon name="instagram" />
          </a>
          <a target="_blank" rel="noopener" href={siteConfig.youtubeUrl} aria-label="YouTube">
            <Icon name="youtube" />
          </a>
        </div>
      </div>
    </footer>
  );
}
