"use client";

import { useState } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

export default function Gallery({ images, alt }: { images: string[]; alt: string }) {
  const [active, setActive] = useState(0);
  const list = images.length ? images : ["https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200&q=80"];

  return (
    <div>
      <div className="relative aspect-[16/10] overflow-hidden rounded-2xl bg-navy-50">
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0"
          >
            <Image
              src={list[active]}
              alt={alt}
              fill
              priority
              sizes="(max-width:1024px) 100vw, 60vw"
              className="object-cover"
            />
          </motion.div>
        </AnimatePresence>
      </div>
      {list.length > 1 && (
        <div className="mt-4 flex gap-3">
          {list.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`relative h-20 w-28 shrink-0 overflow-hidden rounded-xl ring-2 transition ${
                i === active ? "ring-electric" : "ring-transparent opacity-70 hover:opacity-100"
              }`}
            >
              <Image src={src} alt={`${alt} ${i + 1}`} fill sizes="120px" className="object-cover" />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
