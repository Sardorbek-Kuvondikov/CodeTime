import Image from "next/image";

import { siteConfig } from "@/shared/config/site";
import { Icon } from "@/shared/ui/icon";

export function Hero() {
  return (
    <section className="hero">
      <div className="container hero-inner">
        <div className="hero-content">
          <span className="eyebrow">
            <Icon name="zap" />
            Zamonaviy IT ta'lim markazi
          </span>
          <h1>CodeTime IT Academy</h1>
          <p>
            Dasturlash, web va raqamli kasblarni amaliy loyiha orqali o'rganing.
            Har bir dars real vazifa, mentor fikri va portfolio uchun tayyor ish
            bilan mustahkamlanadi.
          </p>

          <div className="hero-actions">
            <a className="btn btn-primary" href="#contact">
              <Icon name="send" />
              Kursga yozilish
            </a>
            <a className="btn btn-ghost" href="#courses">
              Kurslarni ko'rish
            </a>
          </div>

          <div className="hero-stats" aria-label="Akademiya ko'rsatkichlari">
            <div>
              <strong>450+</strong>
              <span>bitiruvchi</span>
            </div>
            <div>
              <strong>4</strong>
              <span>amaliy kurs</span>
            </div>
            <div>
              <strong>4.9</strong>
              <span>o'quvchi bahosi</span>
            </div>
          </div>
        </div>

        <div className="hero-media" aria-label="CodeTime akademiyasi muhiti">
          <Image
            src={siteConfig.heroImage}
            alt="Kompyuterda birga dars qilayotgan talabalar"
            width={1100}
            height={520}
            priority
          />
          <div className="schedule-card">
            <span>
              <Icon name="gift" />
              Maxsus taklif
            </span>
            <strong>
              Birinchi dars <b>bepul</b>
            </strong>
            <p>Sinov darsiga yoziling</p>
          </div>
        </div>
      </div>
    </section>
  );
}
