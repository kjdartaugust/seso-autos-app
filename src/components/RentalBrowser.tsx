"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import type { RentalView } from "@/lib/data";
import { rentalCategories } from "@/lib/content";
import Icon from "./Icon";

const categoryLabel: Record<string, string> = {
  ECONOMY: "Economy",
  SEDAN: "Sedan",
  SUV: "SUV",
  LUXURY: "Luxury",
  VANS_AND_BUSES: "Vans & Buses",
};

export default function RentalBrowser({
  rentals,
  onBook,
}: {
  rentals: RentalView[];
  onBook: (r: RentalView) => void;
}) {
  const [cat, setCat] = useState("");
  const filtered = cat ? rentals.filter((r) => r.category === cat) : rentals;

  return (
    <div>
      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => setCat("")}
          className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
            cat === "" ? "bg-navy text-white" : "bg-navy-50 text-navy hover:bg-navy/10"
          }`}
        >
          All
        </button>
        {rentalCategories.map((c) => (
          <button
            key={c.value}
            onClick={() => setCat(c.value)}
            className={`rounded-full px-5 py-2.5 text-sm font-semibold transition ${
              cat === c.value ? "bg-navy text-white" : "bg-navy-50 text-navy hover:bg-navy/10"
            }`}
          >
            {c.label}
          </button>
        ))}
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((r, i) => (
          <motion.div
            key={r.id}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: (i % 3) * 0.08 }}
            className="card overflow-hidden"
          >
            <div className="relative aspect-[4/3]">
              <Image src={r.image} alt={r.name} fill sizes="33vw" className="object-cover" />
              <span className="badge absolute left-3 top-3 bg-white/90 text-navy">
                {categoryLabel[r.category]}
              </span>
            </div>
            <div className="p-5">
              <h3 className="font-bold text-navy">{r.name}</h3>
              <div className="mt-2 flex gap-4 text-sm text-navy/60">
                <span className="flex items-center gap-1.5">
                  <Icon name="seat" width={16} height={16} /> {r.seats} seats
                </span>
                <span className="flex items-center gap-1.5">
                  <Icon name="gear" width={16} height={16} /> {r.transmission}
                </span>
              </div>
              <div className="mt-4 flex items-end justify-between">
                <p>
                  <span className="text-2xl font-extrabold text-electric">${r.dailyRate}</span>
                  <span className="text-sm text-navy/55">/day</span>
                </p>
                <button onClick={() => onBook(r)} className="btn-accent !px-4 !py-2 text-xs">
                  Book Now
                </button>
              </div>
              <div className="mt-3 flex justify-between text-xs text-navy/55">
                <span>${r.weeklyRate}/wk</span>
                <span>${r.monthlyRate}/mo</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
