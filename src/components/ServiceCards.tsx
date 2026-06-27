"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { services } from "@/lib/content";
import Icon, { type IconName } from "./Icon";

export default function ServiceCards() {
  return (
    <section className="relative z-10 -mt-20">
      <div className="container-x">
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {services.map((s, i) => (
            <motion.div
              key={s.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.07, duration: 0.5 }}
            >
              <Link
                href={s.href}
                className="group flex h-full flex-col rounded-2xl bg-white p-6 shadow-lg ring-1 ring-navy/5 transition hover:-translate-y-1.5 hover:shadow-2xl"
              >
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-lime transition group-hover:bg-lime group-hover:text-navy">
                  <Icon name={s.icon as IconName} />
                </div>
                <h3 className="mt-4 font-bold leading-snug text-navy">{s.title}</h3>
                <p className="mt-2 flex-1 text-sm text-navy/60">{s.short}</p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-electric">
                  Explore <Icon name="arrow" width={16} height={16} />
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
