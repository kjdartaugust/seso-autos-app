import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import RentalSection from "@/components/RentalSection";
import { getRentals } from "@/lib/data";

export const metadata: Metadata = {
  title: "Car Rentals",
  description:
    "Rent economy, sedan, SUV, luxury vehicles, vans and buses. Daily, weekly, monthly and long-term plans with delivery available.",
};

export default async function RentalsPage() {
  const rentals = await getRentals();
  return (
    <>
      <PageHero
        eyebrow="Car Rentals"
        title="Rentals for every journey"
        subtitle="From budget runabouts to luxury saloons and 14-seater buses — flexible daily, weekly, monthly and long-term plans, with optional doorstep delivery."
        image="https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=1920&q=80"
      />
      <RentalSection rentals={rentals} />
    </>
  );
}
