"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { services, CONTACT } from "@/lib/content";
import Icon from "./Icon";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  if (pathname?.startsWith("/admin")) return null;

  return (
    <>
    <div className="h-20" aria-hidden />
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-navy/95 shadow-lg backdrop-blur"
          : "bg-navy/80 backdrop-blur-sm"
      }`}
    >
      <nav className="container-x flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime font-extrabold text-navy">
            S
          </span>
          <span className="leading-tight">
            <span className="block text-lg font-extrabold text-white">
              SESO Autos
            </span>
            <span className="block text-[10px] font-medium uppercase tracking-[0.18em] text-lime">
              Driving More Than Cars
            </span>
          </span>
        </Link>

        <div className="hidden items-center gap-1 lg:flex">
          {services.map((s) => {
            const active = pathname === s.href;
            return (
              <Link
                key={s.slug}
                href={s.href}
                className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                  active
                    ? "bg-white/10 text-lime"
                    : "text-white/85 hover:bg-white/10 hover:text-white"
                }`}
              >
                {s.title.split(" ")[0] === "Car"
                  ? s.title.replace("Car ", "")
                  : s.title.split(" &")[0]}
              </Link>
            );
          })}
        </div>

        <div className="flex items-center gap-3">
          <a
            href={`tel:${CONTACT.phone}`}
            className="btn-accent hidden sm:inline-flex"
          >
            <Icon name="phone" width={18} height={18} />
            Call Us
          </a>
          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((o) => !o)}
            className="grid h-11 w-11 place-items-center rounded-xl text-white lg:hidden"
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden bg-navy-900 lg:hidden"
          >
            <div className="container-x flex flex-col gap-1 py-4">
              {services.map((s) => (
                <Link
                  key={s.slug}
                  href={s.href}
                  className="rounded-lg px-3 py-3 text-white/90 hover:bg-white/10"
                >
                  {s.title}
                </Link>
              ))}
              <a href={`tel:${CONTACT.phone}`} className="btn-accent mt-3">
                <Icon name="phone" width={18} height={18} /> Call {CONTACT.phoneDisplay}
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
    </>
  );
}
