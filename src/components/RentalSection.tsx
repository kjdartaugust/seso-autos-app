"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RentalView } from "@/lib/data";
import { rentalCategories } from "@/lib/content";
import RentalBrowser from "./RentalBrowser";
import Icon from "./Icon";

const plans = ["Daily", "Weekly", "Monthly", "Long-term"];

export default function RentalSection({ rentals }: { rentals: RentalView[] }) {
  const [selected, setSelected] = useState<RentalView | null>(null);
  const [delivery, setDelivery] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");
  const formRef = useRef<HTMLDivElement>(null);

  function book(r: RentalView) {
    setSelected(r);
    setStatus("idle");
    setTimeout(() => formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 60);
  }

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const fd = new FormData(e.currentTarget);
    const payload = {
      name: fd.get("name"),
      email: fd.get("email"),
      phone: fd.get("phone"),
      category: fd.get("category"),
      rentalVehicleId: selected?.id ?? null,
      startDate: fd.get("startDate"),
      endDate: fd.get("endDate"),
      pricingPlan: fd.get("pricingPlan"),
      delivery,
      deliveryAddress: delivery ? fd.get("deliveryAddress") : null,
      notes: fd.get("notes") ?? "",
    };
    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
    } catch {
      setStatus("error");
    }
  }

  const today = new Date().toISOString().split("T")[0];

  return (
    <>
      <section className="container-x py-16">
        <RentalBrowser rentals={rentals} onBook={book} />
      </section>

      <section ref={formRef} className="bg-navy-50/60 py-20 scroll-mt-24">
        <div className="container-x grid gap-10 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Reserve Your Ride</p>
            <h2 className="section-title mt-2">Rental booking</h2>
            <p className="mt-4 text-lg text-navy/65">
              Choose your dates and pricing plan. Need it delivered? Toggle the
              delivery option and we&apos;ll bring it to you.
            </p>
            {selected && (
              <div className="mt-6 flex items-center gap-4 rounded-2xl border border-electric/20 bg-white p-4">
                <img src={selected.image} alt={selected.name} className="h-16 w-24 rounded-xl object-cover" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-navy/50">Selected vehicle</p>
                  <p className="font-bold text-navy">{selected.name}</p>
                  <p className="text-sm text-electric">${selected.dailyRate}/day · ${selected.weeklyRate}/wk · ${selected.monthlyRate}/mo</p>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-sm sm:p-8">
            <AnimatePresence mode="wait">
              {status === "done" ? (
                <motion.div key="done" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="py-8 text-center">
                  <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-navy">
                    <Icon name="check" />
                  </div>
                  <h3 className="mt-4 text-xl font-bold text-navy">Booking Received</h3>
                  <p className="mt-2 text-navy/70">We&apos;ll confirm availability and pricing with you shortly.</p>
                  <button onClick={() => setStatus("idle")} className="btn-ghost mt-6">New booking</button>
                </motion.div>
              ) : (
                <motion.form key="form" onSubmit={onSubmit} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid gap-5 sm:grid-cols-2">
                  <div>
                    <label className="label">Full Name</label>
                    <input name="name" required className="input" />
                  </div>
                  <div>
                    <label className="label">Phone</label>
                    <input name="phone" type="tel" required className="input" />
                  </div>
                  <div className="sm:col-span-2">
                    <label className="label">Email</label>
                    <input name="email" type="email" required className="input" />
                  </div>
                  <div>
                    <label className="label">Category</label>
                    <select name="category" required defaultValue={selected?.category ?? ""} className="input">
                      <option value="" disabled>Select</option>
                      {rentalCategories.map((c) => <option key={c.value} value={c.value}>{c.label}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Pricing Plan</label>
                    <select name="pricingPlan" required defaultValue="Daily" className="input">
                      {plans.map((p) => <option key={p} value={p}>{p}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="label">Start Date</label>
                    <input name="startDate" type="date" min={today} required className="input" />
                  </div>
                  <div>
                    <label className="label">End Date</label>
                    <input name="endDate" type="date" min={today} required className="input" />
                  </div>

                  <div className="sm:col-span-2">
                    <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-navy/15 px-4 py-3">
                      <input type="checkbox" checked={delivery} onChange={(e) => setDelivery(e.target.checked)} className="h-5 w-5 accent-lime" />
                      <span className="text-sm font-medium text-navy/80">Deliver the vehicle to my location</span>
                    </label>
                  </div>
                  <AnimatePresence>
                    {delivery && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="sm:col-span-2 overflow-hidden">
                        <label className="label">Delivery Address</label>
                        <input name="deliveryAddress" className="input" placeholder="Where should we deliver?" />
                      </motion.div>
                    )}
                  </AnimatePresence>

                  <div className="sm:col-span-2">
                    <label className="label">Notes (optional)</label>
                    <textarea name="notes" rows={3} className="input resize-none" placeholder="Anything else we should know?" />
                  </div>

                  {status === "error" && (
                    <p className="sm:col-span-2 text-sm text-red-600">Something went wrong. Please try again or call us.</p>
                  )}

                  <div className="sm:col-span-2">
                    <button disabled={status === "loading"} className="btn-accent w-full sm:w-auto disabled:opacity-60">
                      {status === "loading" ? "Sending…" : "Request Booking"}
                      {status !== "loading" && <Icon name="arrow" width={18} height={18} />}
                    </button>
                  </div>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </section>
    </>
  );
}
