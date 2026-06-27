"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { CONTACT } from "@/lib/content";
import Icon from "./Icon";

export default function Hero() {
  return (
    <section className="relative flex min-h-[88vh] items-center overflow-hidden">
      <div
        className="absolute inset-0 scale-105 bg-cover bg-center"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920&q=80)",
        }}
      />
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent" />

      <div className="container-x relative py-20">
        <motion.span
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-lime backdrop-blur"
        >
          <span className="h-2 w-2 rounded-full bg-lime" />
          Ghana&apos;s complete automotive partner
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mt-6 max-w-4xl text-5xl font-extrabold leading-[1.05] text-white sm:text-6xl lg:text-7xl"
        >
          Driving More <br />
          Than <span className="text-lime">Cars</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-6 max-w-xl text-lg text-white/85 sm:text-xl"
        >
          Imported vehicles, flexible rentals, insurance, licensing and GPS fleet
          security — everything you need to own and protect your ride, all in one place.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 26 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mt-9 flex flex-wrap gap-4"
        >
          <Link href="/sales" className="btn-accent">
            Browse Vehicles <Icon name="arrow" width={18} height={18} />
          </Link>
          <a href={`tel:${CONTACT.phone}`} className="btn-outline">
            <Icon name="phone" width={18} height={18} /> Call {CONTACT.phoneDisplay}
          </a>
        </motion.div>
      </div>
    </section>
  );
}
