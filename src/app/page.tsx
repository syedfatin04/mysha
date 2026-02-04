import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceCoverage } from "@/components/home/ServiceCoverage";
import { ClientsPreview } from "@/components/home/ClientsPreview";
import { VehiclesPreview } from "@/components/home/VehiclesPreview";
import { FinalCTA } from "@/components/home/FinalCTA";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <AboutPreview />
      <WhyChooseUs />
      <ServiceCoverage />
      <ClientsPreview />
      <VehiclesPreview />
      <FinalCTA />
    </div>
  );
}
