import { advantageItems } from "@/entities/advantage/model/items";
import { Icon } from "@/shared/ui/icon";
import { SectionHeading } from "@/shared/ui/section-heading";

export function AdvantagesSection() {
  return (
    <section className="section section-soft" id="advantages">
      <div className="container advantages-layout">
        <SectionHeading
          align="left"
          kicker="Nega CodeTime?"
          title="O'qish jarayoni natijaga yo'naltirilgan"
          text="Har bir modul yakunida kichik loyiha qilinadi. Mentorlar kodni tekshiradi, xatolarni tushuntiradi va portfolioni tartibga soladi."
        />

        <div className="advantages-list">
          {advantageItems.map((item) => (
            <div className="advantage-item" key={item.title}>
              <span className="adv-ico">
                <Icon name={item.icon} />
              </span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
