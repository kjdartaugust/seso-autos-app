"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { testimonials } from "@/lib/content";
import Icon from "./Icon";

export default function Testimonials() {
  const [i, setI] = useState(0);
  const t = testimonials[i];
  const go = (dir: number) =>
    setI((p) => (p + dir + testimonials.length) % testimonials.length);

  return (
    <div className="mx-auto mt-12 max-w-3xl">
      <div className="relative min-h-[260px] rounded-3xl bg-white p-8 shadow-xl sm:p-12">
        <AnimatePresence mode="wait">
          <motion.div
            key={i}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.35 }}
          >
            <div className="flex gap-1 text-lime">
              {Array.from({ length: t.rating }).map((_, k) => (
                <Icon key={k} name="star" width={20} height={20} fill="currentColor" />
              ))}
            </div>
            <p className="mt-5 text-lg leading-relaxed text-navy/85 sm:text-xl">
              “{t.quote}”
            </p>
            <div className="mt-6">
              <p className="font-bold text-navy">{t.name}</p>
              <p className="text-sm text-navy/60">{t.role}</p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="mt-6 flex items-center justify-center gap-4">
        <button
          aria-label="Previous"
          onClick={() => go(-1)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy/15 text-navy transition hover:border-electric hover:text-electric"
        >
          <Icon name="arrow" className="rotate-180" width={18} height={18} />
        </button>
        <div className="flex gap-2">
          {testimonials.map((_, k) => (
            <button
              key={k}
              aria-label={`Go to testimonial ${k + 1}`}
              onClick={() => setI(k)}
              className={`h-2.5 rounded-full transition-all ${
                k === i ? "w-7 bg-electric" : "w-2.5 bg-navy/20"
              }`}
            />
          ))}
        </div>
        <button
          aria-label="Next"
          onClick={() => go(1)}
          className="grid h-11 w-11 place-items-center rounded-full border-2 border-navy/15 text-navy transition hover:border-electric hover:text-electric"
        >
          <Icon name="arrow" width={18} height={18} />
        </button>
      </div>
    </div>
  );
}
