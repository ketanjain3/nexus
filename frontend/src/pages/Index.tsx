import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ProblemSection from "@/components/ProblemSection";
import ProductsSection from "@/components/ProductsSection";
import TechnologySection from "@/components/TechnologySection";
import AnimatedStats from "@/components/AnimatedStats";
import RevenueSection from "@/components/RevenueSection";
import RoadmapSection from "@/components/RoadmapSection";
import FAQSection from "@/components/FAQSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <ProblemSection />
      <ProductsSection />
      <TechnologySection />
      <AnimatedStats />
      <RevenueSection />
      <RoadmapSection />
      <FAQSection />
      <Footer />
    </main>
  );
};

export default Index;
