import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Gallery from "@/components/Gallery";
import InquiryForm from "@/components/InquiryForm";
import Icon from "@/components/Icon";
import { getVehicleById, getVehicles } from "@/lib/data";

type Props = { params: { id: string } };

export async function generateStaticParams() {
  const vehicles = await getVehicles();
  return vehicles.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const v = await getVehicleById(params.id);
  return { title: v ? v.title : "Vehicle" };
}

const sourceColors: Record<string, string> = {
  USA: "bg-blue-100 text-blue-800",
  CANADA: "bg-red-100 text-red-800",
  CHINA: "bg-yellow-100 text-yellow-800",
  LOCAL: "bg-lime/20 text-lime-dark",
};

export default async function VehicleDetail({ params }: Props) {
  const v = await getVehicleById(params.id);
  if (!v) notFound();

  const specs = [
    { label: "Make", value: v.make, icon: "car" as const },
    { label: "Model", value: v.model, icon: "car" as const },
    { label: "Year", value: String(v.year), icon: "calendar" as const },
    { label: "Mileage", value: `${v.mileage.toLocaleString()} km`, icon: "gauge" as const },
    { label: "Fuel Type", value: v.fuelType, icon: "fuel" as const },
    { label: "Transmission", value: v.transmission, icon: "gear" as const },
    { label: "Body Type", value: v.bodyType, icon: "car" as const },
    { label: "Engine", value: v.engine || "—", icon: "gear" as const },
    { label: "Color", value: v.color, icon: "car" as const },
  ];

  return (
    <div className="container-x py-12">
      <Link href="/sales" className="inline-flex items-center gap-1.5 text-sm font-medium text-electric hover:underline">
        <Icon name="arrow" className="rotate-180" width={16} height={16} /> Back to listings
      </Link>

      <div className="mt-6 grid gap-10 lg:grid-cols-[1.4fr_1fr]">
        <div>
          <Gallery images={v.images} alt={v.title} />

          <div className="mt-10">
            <h2 className="text-xl font-bold text-navy">Specifications</h2>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
              {specs.map((s) => (
                <div key={s.label} className="flex items-center gap-3 rounded-xl border border-navy/10 p-3.5">
                  <span className="grid h-9 w-9 place-items-center rounded-lg bg-navy-50 text-electric">
                    <Icon name={s.icon} width={18} height={18} />
                  </span>
                  <span>
                    <span className="block text-xs text-navy/55">{s.label}</span>
                    <span className="block text-sm font-semibold text-navy">{s.value}</span>
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <h2 className="text-xl font-bold text-navy">Description</h2>
            <p className="mt-3 leading-relaxed text-navy/70">{v.description}</p>
          </div>
        </div>

        {/* Sidebar */}
        <div className="lg:sticky lg:top-24 lg:h-fit">
          <div className="rounded-2xl border border-navy/10 bg-white p-6 shadow-sm">
            <div className="flex flex-wrap items-center gap-2">
              <span className={`badge ${sourceColors[v.importSource]}`}>{v.importSource} Import</span>
              <span className={`badge ${v.status === "AVAILABLE" ? "bg-lime/20 text-lime-dark" : "bg-navy/10 text-navy"}`}>
                {v.status}
              </span>
            </div>
            <h1 className="mt-3 text-2xl font-extrabold text-navy">{v.title}</h1>
            <p className="mt-2 text-3xl font-extrabold text-electric">${v.price.toLocaleString()}</p>

            <h3 className="mt-7 font-bold text-navy">Enquire about this vehicle</h3>
            <p className="mt-1 text-sm text-navy/60">Reserve a viewing or request more details.</p>
            <div className="mt-4">
              <InquiryForm
                endpoint="/api/inquiries"
                submitLabel="Send Enquiry"
                hidden={{ vehicleId: v.id }}
                successMessage="Thanks! We'll contact you about this vehicle within 24 hours."
                fields={[
                  { name: "name", label: "Full Name", required: true, full: true },
                  { name: "phone", label: "Phone", type: "tel", required: true, full: true },
                  { name: "email", label: "Email", type: "email", required: true, full: true },
                  { name: "message", label: "Message", type: "textarea", required: true, defaultValue: `I'm interested in the ${v.title}.` },
                ]}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
