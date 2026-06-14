import { Icon } from "@/shared/ui/icon";
import { SectionHeading } from "@/shared/ui/section-heading";

export function MentorSection() {
  return (
    <section className="section section-soft">
      <div className="container mentor-layout">
        <SectionHeading
          align="left"
          kicker="Mentorlar"
          title="Tajriba faqat nazariya emas, kod bilan beriladi"
          text="CodeTime darslarida mentorlar oddiy tushuntirish bilan cheklanmaydi: ular siz bilan birga kod yozadi, xatoni topadi va yechimni professional tartibda ko'rsatadi."
        />

        <div className="mentor-card">
          <span className="mentor-ico">
            <Icon name="presentation" />
          </span>
          <h3>Live coding + review</h3>
          <p>
            Har hafta guruhdagi ishlar tahlil qilinadi va keyingi qadamlar
            belgilanadi.
          </p>
        </div>
      </div>
    </section>
  );
}
