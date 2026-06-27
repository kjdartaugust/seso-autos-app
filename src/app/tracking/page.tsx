import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import Icon, { type IconName } from "@/components/Icon";
import { trackingFeatures, trackingIdealFor, trackingPlans } from "@/lib/content";

export const metadata: Metadata = {
  title: "GPS Tracking & Fleet Security",
  description:
    "Real-time GPS tracking, geo-fencing, speed monitoring, engine cut-off, reports and anti-theft for vehicles and fleets in Ghana.",
};

export default function TrackingPage() {
  return (
    <>
      <PageHero
        eyebrow="GPS Tracking & Fleet Security"
        title="See it. Secure it. Control it."
        subtitle="Live tracking, geo-fencing, speed alerts, remote engine cut-off and rich reporting — total visibility and control over every vehicle."
        image="https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=1920&q=80"
      />

      {/* Features */}
      <section className="container-x py-24">
        <SectionHeading
          center
          eyebrow="Capabilities"
          title="Powerful protection, built in"
          subtitle="Everything you need to monitor and safeguard your assets."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {trackingFeatures.map((f, i) => (
            <Reveal key={f.title} delay={(i % 3) * 0.08}>
              <div className="card h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-electric text-white">
                  <Icon name={f.icon as IconName} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{f.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{f.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Ideal for */}
      <section className="bg-navy py-20">
        <div className="container-x">
          <SectionHeading light center eyebrow="Ideal For" title="Built for every kind of driver" />
          <div className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-4 sm:grid-cols-3">
            {trackingIdealFor.map((item, i) => (
              <Reveal key={item} delay={(i % 3) * 0.06}>
                <div className="flex items-center gap-3 rounded-xl bg-white/5 p-4 text-white/90 ring-1 ring-white/10">
                  <Icon name="check" width={18} height={18} className="text-lime" />
                  <span className="text-sm font-medium">{item}</span>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Plans */}
      <section className="container-x py-24">
        <SectionHeading
          center
          eyebrow="Subscription Plans"
          title="Pricing that scales with you"
          subtitle="Per-device monthly pricing. Cancel anytime."
        />
        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {trackingPlans.map((p, i) => (
            <Reveal key={p.name} delay={i * 0.1}>
              <div
                className={`relative flex h-full flex-col rounded-3xl p-8 ${
                  p.highlighted
                    ? "bg-navy text-white shadow-2xl ring-2 ring-lime"
                    : "card"
                }`}
              >
                {p.highlighted && (
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-lime px-4 py-1 text-xs font-bold text-navy">
                    Most Popular
                  </span>
                )}
                <h3 className={`text-lg font-bold ${p.highlighted ? "text-lime" : "text-navy"}`}>
                  {p.name}
                </h3>
                <p className="mt-3">
                  <span className={`text-4xl font-extrabold ${p.highlighted ? "text-white" : "text-navy"}`}>
                    ${p.price}
                  </span>
                  <span className={`text-sm ${p.highlighted ? "text-white/70" : "text-navy/55"}`}>
                    {" "}
                    {p.period}
                  </span>
                </p>
                <ul className={`mt-6 flex-1 space-y-3 text-sm ${p.highlighted ? "text-white/85" : "text-navy/75"}`}>
                  {p.features.map((f) => (
                    <li key={f} className="flex items-center gap-2.5">
                      <Icon name="check" width={16} height={16} className="text-lime" />
                      {f}
                    </li>
                  ))}
                </ul>
                <a
                  href="#tracking-contact"
                  className={p.highlighted ? "btn-accent mt-8" : "btn-ghost mt-8"}
                >
                  Get Started
                </a>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id="tracking-contact" className="bg-navy-50/60 py-24 scroll-mt-24">
        <div className="container-x mx-auto max-w-2xl rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-10">
          <SectionHeading center title="Talk to our team" subtitle="Get a tailored tracking solution for your vehicle or fleet." />
          <div className="mt-8">
            <InquiryForm
              endpoint="/api/tracking"
              submitLabel="Request Demo"
              successMessage="Thanks! A tracking specialist will contact you to set things up."
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "email", label: "Email", type: "email", required: true, full: true },
                {
                  name: "plan",
                  label: "Plan of Interest",
                  type: "select",
                  required: true,
                  placeholder: "Select a plan",
                  options: trackingPlans.map((p) => ({ value: p.name, label: `${p.name} — $${p.price}/mo` })),
                },
                { name: "fleetSize", label: "Number of Vehicles", type: "number", placeholder: "e.g. 5" },
                { name: "message", label: "Message", type: "textarea", placeholder: "Tell us about your needs" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
