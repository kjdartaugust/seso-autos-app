import Link from "next/link";
import Image from "next/image";
import type { VehicleView } from "@/lib/data";
import Icon from "./Icon";

const sourceColors: Record<string, string> = {
  USA: "bg-blue-100 text-blue-800",
  CANADA: "bg-red-100 text-red-800",
  CHINA: "bg-yellow-100 text-yellow-800",
  LOCAL: "bg-lime/20 text-lime-dark",
};

export default function VehicleCard({ v }: { v: VehicleView }) {
  return (
    <Link href={`/sales/${v.id}`} className="card group overflow-hidden">
      <div className="relative aspect-[4/3] overflow-hidden">
        <Image
          src={v.images[0]}
          alt={v.title}
          fill
          sizes="(max-width:768px) 100vw, 33vw"
          className="object-cover transition duration-500 group-hover:scale-105"
        />
        <span
          className={`badge absolute left-3 top-3 ${sourceColors[v.importSource]}`}
        >
          {v.importSource} Import
        </span>
        {v.status !== "AVAILABLE" && (
          <span className="badge absolute right-3 top-3 bg-navy text-white">
            {v.status}
          </span>
        )}
      </div>
      <div className="p-5">
        <div className="flex items-start justify-between gap-3">
          <h3 className="font-bold leading-snug text-navy group-hover:text-electric">
            {v.title}
          </h3>
        </div>
        <p className="mt-1 text-2xl font-extrabold text-electric">
          ${v.price.toLocaleString()}
        </p>
        <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-sm text-navy/65">
          <span className="flex items-center gap-1.5">
            <Icon name="calendar" width={16} height={16} /> {v.year}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="gauge" width={16} height={16} />
            {v.mileage.toLocaleString()} km
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="fuel" width={16} height={16} /> {v.fuelType}
          </span>
          <span className="flex items-center gap-1.5">
            <Icon name="gear" width={16} height={16} /> {v.transmission}
          </span>
        </div>
      </div>
    </Link>
  );
}
