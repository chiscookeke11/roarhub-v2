import OurPillars from "@/components/OurPillars";
import Hero from "../components/Hero";
import WhoWeAre from "@/components/WhoWeAre";
import OurEcosystem from "@/components/OurEcosystem";
import CTASection from "@/components/CTASection";
import Leadership from "@/components/Leadership";
import Footer from "@/components/ui/Footer";



export default function Home() {
  return (
    <div className="w-full bg-white h-full " >
      <Hero />
      <WhoWeAre />
      <OurPillars />
      <OurEcosystem />
      <CTASection />
      <Leadership />
      <Footer/>
    </div>
  )
}