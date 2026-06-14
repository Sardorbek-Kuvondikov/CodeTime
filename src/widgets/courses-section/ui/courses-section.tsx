import { courseCards } from "@/entities/course/model/items";
import { Icon } from "@/shared/ui/icon";
import { SectionHeading } from "@/shared/ui/section-heading";

export function CoursesSection() {
  return (
    <section className="section" id="courses">
      <div className="container">
        <SectionHeading
          kicker="Yo'nalishlar"
          title="IT kasbga kirish uchun amaliy kurslar"
        />

        <div className="course-grid">
          {courseCards.map((course) => (
            <article className="course-card" key={course.title}>
              <div className={`card-icon ${course.tone}`}>
                <Icon name={course.icon} />
              </div>
              <h3>{course.title}</h3>
              <p>{course.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
