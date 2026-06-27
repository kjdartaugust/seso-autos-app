import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import SectionHeading from "@/components/SectionHeading";
import Reveal from "@/components/Reveal";
import InquiryForm from "@/components/InquiryForm";
import Icon, { type IconName } from "@/components/Icon";
import { licensingServices, licensingSteps } from "@/lib/content";

export const metadata: Metadata = {
  title: "Licensing & Registration",
  description:
    "DVLA vehicle registration, ownership transfer, licence renewal, customs clearance, number plates and roadworthy certificates.",
};

export default function LicensingPage() {
  return (
    <>
      <PageHero
        eyebrow="Licensing & Registration"
        title="Paperwork, handled."
        subtitle="Skip the queues. We manage your DVLA registration, transfers, renewals, customs clearance and roadworthy certification end-to-end."
        image="https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=1920&q=80"
      />

      {/* Service cards */}
      <section className="container-x py-24">
        <SectionHeading
          center
          eyebrow="Our Services"
          title="Everything DVLA & Customs"
          subtitle="Pick the service you need — we handle the rest."
        />
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {licensingServices.map((s, i) => (
            <Reveal key={s.title} delay={(i % 3) * 0.08}>
              <div className="card h-full p-6">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-lime/15 text-lime-dark">
                  <Icon name={s.icon as IconName} />
                </div>
                <h3 className="mt-4 text-lg font-bold text-navy">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-navy/65">{s.desc}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* Process timeline */}
      <section className="bg-navy-50/60 py-24">
        <div className="container-x">
          <SectionHeading center eyebrow="How It Works" title="A simple 4-step process" />
          <div className="mt-14 grid gap-8 md:grid-cols-4">
            {licensingSteps.map((s, i) => (
              <Reveal key={s.step} delay={i * 0.1}>
                <div className="relative text-center">
                  <div className="mx-auto grid h-16 w-16 place-items-center rounded-2xl bg-navy text-xl font-extrabold text-lime">
                    {s.step}
                  </div>
                  {i < licensingSteps.length - 1 && (
                    <div className="absolute left-1/2 top-8 hidden h-0.5 w-full bg-navy/15 md:block" />
                  )}
                  <h3 className="mt-5 font-bold text-navy">{s.title}</h3>
                  <p className="mt-2 text-sm text-navy/65">{s.desc}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Request form */}
      <section className="container-x py-24">
        <div className="mx-auto max-w-2xl rounded-3xl border border-navy/10 bg-white p-6 shadow-sm sm:p-10">
          <SectionHeading center title="Request a service" subtitle="Tell us what you need and we'll get started." />
          <div className="mt-8">
            <InquiryForm
              endpoint="/api/licensing"
              submitLabel="Submit Request"
              successMessage="Thanks! Our licensing team will reach out to begin your request."
              fields={[
                { name: "name", label: "Full Name", required: true },
                { name: "phone", label: "Phone", type: "tel", required: true },
                { name: "email", label: "Email", type: "email", required: true, full: true },
                {
                  name: "serviceType",
                  label: "Service Needed",
                  type: "select",
                  required: true,
                  placeholder: "Select a service",
                  options: licensingServices.map((s) => ({ value: s.title, label: s.title })),
                },
                { name: "vehicleInfo", label: "Vehicle Info", placeholder: "Make / model / reg no." },
                { name: "message", label: "Details", type: "textarea", placeholder: "Describe your request" },
              ]}
            />
          </div>
        </div>
      </section>
    </>
  );
}
