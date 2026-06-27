import Link from "next/link";
import Hero from "@/components/Hero";
import ServiceCards from "@/components/ServiceCards";
import StatStrip from "@/components/StatStrip";
import Testimonials from "@/components/Testimonials";
import SectionHeading from "@/components/SectionHeading";
import VehicleCard from "@/components/VehicleCard";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import Icon from "@/components/Icon";
import { getFeaturedVehicles } from "@/lib/data";
import { CONTACT } from "@/lib/content";

export default async function HomePage() {
  const featured = await getFeaturedVehicles();

  return (
    <>
      <Hero />
      <ServiceCards />

      {/* About */}
      <section id="about" className="container-x py-24">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <Reveal>
            <p className="eyebrow">Who We Are</p>
            <h2 className="section-title mt-2">
              One trusted partner for your entire automotive journey
            </h2>
            <p className="mt-4 text-lg text-navy/65">
              From sourcing and importing the perfect vehicle to keeping it
              insured, licensed and protected, SESO Autos brings every service
              under one roof. We make car ownership in Ghana simple, transparent
              and stress-free.
            </p>
            <ul className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                "Verified imported vehicles",
                "Transparent, upfront pricing",
                "End-to-end paperwork handled",
                "Nationwide delivery & support",
              ].map((f) => (
                <li key={f} className="flex items-center gap-2.5 text-navy/80">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-lime/20 text-lime-dark">
                    <Icon name="check" width={15} height={15} />
                  </span>
                  {f}
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={0.15} className="grid grid-cols-2 gap-4">
            <img
              src="https://images.unsplash.com/photo-1552519507-da3b142c6e3d?w=600&q=80"
              alt="Luxury vehicle"
              className="h-full w-full rounded-2xl object-cover"
            />
            <img
              src="https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?w=600&q=80"
              alt="Vehicle interior"
              className="mt-8 h-full w-full rounded-2xl object-cover"
            />
          </Reveal>
        </div>
      </section>

      <StatStrip />

      {/* Featured vehicles */}
      <section className="container-x py-24">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="In Stock Now"
            title="Featured Vehicles"
            subtitle="Hand-picked imports ready for the road."
          />
          <Link href="/sales" className="btn-ghost">
            View all <Icon name="arrow" width={18} height={18} />
          </Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((v) => (
            <Reveal key={v.id}>
              <VehicleCard v={v} />
            </Reveal>
          ))}
        </div>
      </section>

      {/* Testimonials */}
      <section className="bg-navy-50/60 py-24">
        <div className="container-x">
          <SectionHeading
            center
            eyebrow="Testimonials"
            title="Trusted by drivers across Ghana"
          />
          <Testimonials />
        </div>
      </section>

      {/* Contact CTA */}
      <section id="contact" className="bg-navy py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="text-white">
            <p className="eyebrow">Get in Touch</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Let&apos;s get you on the road
            </h2>
            <p className="mt-4 text-lg text-white/75">
              Have a question about buying, renting, insuring or tracking a
              vehicle? Send us a message and our team will respond within 24 hours.
            </p>
            <div className="mt-8 space-y-4">
              <a href={`tel:${CONTACT.phone}`} className="flex items-center gap-3 text-white/90 hover:text-lime">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-lime">
                  <Icon name="phone" />
                </span>
                {CONTACT.phoneDisplay}
              </a>
              <a href={`mailto:${CONTACT.email}`} className="flex items-center gap-3 text-white/90 hover:text-lime">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-lime">
                  <Icon name="mail" />
                </span>
                {CONTACT.email}
              </a>
              <p className="flex items-center gap-3 text-white/90">
                <span className="grid h-11 w-11 place-items-center rounded-xl bg-white/10 text-lime">
                  <Icon name="pin" />
                </span>
                {CONTACT.address}
              </p>
            </div>
          </div>
          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <InquiryForm
              endpoint="/api/contact"
              submitLabel="Send Message"
              fields={[
                { name: "name", label: "Full Name", required: true, placeholder: "Your name" },
                { name: "phone", label: "Phone", type: "tel", required: true, placeholder: "0XX XXX XXXX" },
                { name: "email", label: "Email", type: "email", required: true, placeholder: "you@email.com", full: true },
                { name: "message", label: "Message", type: "textarea", required: true, placeholder: "How can we help?" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
