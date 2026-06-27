import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SalesBrowser from "@/components/SalesBrowser";
import { getVehicles } from "@/lib/data";

export const metadata: Metadata = {
  title: "Car Sales & Importation",
  description:
    "Browse quality vehicles imported from the USA, Canada and China. Filter by make, model, year and price.",
};

export default async function SalesPage() {
  const vehicles = await getVehicles();
  return (
    <>
      <PageHero
        eyebrow="Car Sales & Importation"
        title="Find your next vehicle"
        subtitle="Quality, customs-cleared imports from the USA, Canada and China — inspected, priced transparently and ready to drive."
        image="https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1920&q=80"
      />
      <SalesBrowser vehicles={vehicles} />
    </>
  );
}
