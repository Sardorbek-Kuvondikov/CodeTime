import { ContactForm } from "@/features/contact-form/ui/contact-form";
import { siteConfig } from "@/shared/config/site";
import { Icon } from "@/shared/ui/icon";
import { SectionHeading } from "@/shared/ui/section-heading";

export function ContactSection() {
  return (
    <section className="section contact-section" id="contact">
      <div className="container contact-layout">
        <div>
          <SectionHeading
            align="left"
            kicker="Qabul ochiq"
            title="Birinchi dars uchun ariza qoldiring"
            text="Admin siz bilan bog'lanib, kurs va guruh vaqtlari bo'yicha ma'lumot beradi."
          />

          <div className="contact-info">
            <a href={siteConfig.phoneHref}>
              <span className="ci-ico">
                <Icon name="phone" />
              </span>
              {siteConfig.phone}
            </a>
            <a href={siteConfig.telegramAdminUrl} target="_blank" rel="noopener">
              <span className="ci-ico">
                <Icon name="send" />
              </span>
              codetime_admin
            </a>
          </div>
        </div>

        <ContactForm />
      </div>
    </section>
  );
}
