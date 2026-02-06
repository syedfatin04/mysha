import { Hero } from "@/components/home/Hero";
import { AboutPreview } from "@/components/home/AboutPreview";
import { WhyChooseUs } from "@/components/home/WhyChooseUs";
import { ServiceCoverage } from "@/components/home/ServiceCoverage";
import { ClientsPreview } from "@/components/home/ClientsPreview";
import { VehiclesPreview } from "@/components/home/VehiclesPreview";
import { FinalCTA } from "@/components/home/FinalCTA";
import Link from "next/link";

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
      
      {/* Internal links for SEO */}
      <nav className="sr-only" aria-label="Site navigation">
        <Link href="/about">About MYSHA Transport</Link>
        <Link href="/services">Transportation Services</Link>
        <Link href="/fleet">Truck Fleet</Link>
        <Link href="/clients">Our Clients</Link>
        <Link href="/contact">Contact Transportation Experts</Link>
      </nav>
    </div>
  );
}
