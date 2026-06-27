import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import Icon, { type IconName } from "@/components/Icon";
import { insuranceCoverage, insuranceWhy } from "@/lib/content";

export const metadata: Metadata = {
  title: "Insurance",
  description:
    "Vehicle insurance in Ghana: third-party, comprehensive, fire & theft, personal accident, windscreen and add-ons. Get a quick quote.",
};

export default function InsurancePage() {
  return (
    <>
      <PageHero
        eyebrow="Insurance"
        title="Cover that keeps you moving"
        subtitle="Protect your vehicle, your passengers and your peace of mind with insurance tailored to your needs and budget."
        image="https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=1920&q=80"
      />

      {/* Coverage options */}
      <section className="container-x py-24">
        <SectionHeading
          center
          eyebrow="Coverage Options"
          title="Choose the protection that fits"
          subtitle="Mix and match cover types to build the right policy for you."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {insuranceCoverage.map((c, i) => (
            <Reveal key={c.title} delay={(i % 3) * 0.08}>
              <div className="card h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-navy text-lime">
                  <Icon name={c.icon as IconName} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{c.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{c.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Why + Quote */}
      <section className="bg-navy py-24">
        <div className="container-x grid gap-12 lg:grid-cols-2">
          <div className="text-white">
            <p className="eyebrow">Why Choose Us</p>
            <h2 className="mt-2 text-3xl font-extrabold sm:text-4xl">
              Insurance made simple and fair
            </h2>
            <p className="mt-4 text-lg text-white/75">
              We work with Ghana&apos;s most trusted underwriters to get you the
              right cover at the right price — and we&apos;re in your corner when
              it&apos;s time to claim.
            </p>
            <ul className="mt-8 space-y-4">
              {insuranceWhy.map((w) => (
                <li key={w} className="flex items-center gap-3 text-white/90">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-lime text-navy">
                    <Icon name="check" width={18} height={18} />
                  </span>
                  {w}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-3xl bg-white p-6 sm:p-8">
            <h3 className="text-xl font-bold text-navy">Get a quick quote</h3>
            <p className="mt-1 text-sm text-navy/60">Tell us a little about your vehicle and we&apos;ll do the rest.</p>
            <div className="mt-5">
              <InquiryForm
                endpoint="/api/insurance"
                submitLabel="Request Quote"
                successMessage="Thanks! Your insurance quote will be ready within 24 hours."
                fields={[
                  { name: "name", label: "Full Name", required: true },
                  { name: "phone", label: "Phone", type: "tel", required: true },
                  { name: "email", label: "Email", type: "email", required: true, full: true },
                  {
                    name: "coverageType",
                    label: "Coverage Type",
                    type: "select",
                    required: true,
                    placeholder: "Select cover",
                    options: insuranceCoverage.map((c) => ({ value: c.title, label: c.title })),
                  },
                  { name: "vehicleValue", label: "Estimated Vehicle Value", placeholder: "e.g. $25,000" },
                  { name: "vehicleDetail", label: "Vehicle (make / model / year)", placeholder: "e.g. Toyota Camry 2021", full: true },
                  { name: "message", label: "Additional Notes", type: "textarea", placeholder: "Anything else?" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
