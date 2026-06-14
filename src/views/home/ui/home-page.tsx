import { NavigationScrollspy } from "@/features/navigation-scrollspy/ui/navigation-scrollspy";
import { AdvantagesSection } from "@/widgets/advantages-section/ui/advantages-section";
import { BottomNavigation } from "@/widgets/bottom-navigation/ui/bottom-navigation";
import { ContactSection } from "@/widgets/contact-section/ui/contact-section";
import { CoursesSection } from "@/widgets/courses-section/ui/courses-section";
import { Footer } from "@/widgets/footer/ui/footer";
import { Header } from "@/widgets/header/ui/header";
import { Hero } from "@/widgets/hero/ui/hero";
import { MentorSection } from "@/widgets/mentor-section/ui/mentor-section";
import { ResultsSection } from "@/widgets/results-section/ui/results-section";

export function HomePage() {
  return (
    <>
      <NavigationScrollspy />
      <Header />
      <main id="top">
        <Hero />
        <CoursesSection />
        <AdvantagesSection />
        <ResultsSection />
        <MentorSection />
        <ContactSection />
      </main>
      <Footer />
      <BottomNavigation />
    </>
  );
}
