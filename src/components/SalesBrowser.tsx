"use client";

import { useMemo, useState } from "react";
import type { VehicleView } from "@/lib/data";
import { importSources } from "@/lib/content";
import VehicleCard from "./VehicleCard";
import Icon from "./Icon";

export default function SalesBrowser({ vehicles }: { vehicles: VehicleView[] }) {
  const [make, setMake] = useState("");
  const [model, setModel] = useState("");
  const [source, setSource] = useState("");
  const [year, setYear] = useState("");
  const [maxPrice, setMaxPrice] = useState("");

  const makes = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.make))).sort(),
    [vehicles]
  );
  const years = useMemo(
    () => Array.from(new Set(vehicles.map((v) => v.year))).sort((a, b) => b - a),
    [vehicles]
  );

  const filtered = vehicles.filter((v) => {
    if (make && v.make !== make) return false;
    if (model && !v.model.toLowerCase().includes(model.toLowerCase())) return false;
    if (source && v.importSource !== source) return false;
    if (year && v.year !== Number(year)) return false;
    if (maxPrice && v.price > Number(maxPrice)) return false;
    return true;
  });

  const reset = () => {
    setMake(""); setModel(""); setSource(""); setYear(""); setMaxPrice("");
  };

  return (
    <div className="container-x py-16">
      <div className="grid gap-10 lg:grid-cols-[280px_1fr]">
        {/* Filters */}
        <aside className="h-fit rounded-2xl border border-navy/10 bg-white p-6 shadow-sm lg:sticky lg:top-24">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-navy">Filters</h3>
            <button onClick={reset} className="text-sm font-medium text-electric hover:underline">
              Reset
            </button>
          </div>
          <div className="mt-5 space-y-4">
            <div>
              <label className="label">Make</label>
              <select className="input" value={make} onChange={(e) => setMake(e.target.value)}>
                <option value="">All makes</option>
                {makes.map((m) => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Model</label>
              <input
                className="input"
                placeholder="e.g. Camry"
                value={model}
                onChange={(e) => setModel(e.target.value)}
              />
            </div>
            <div>
              <label className="label">Year</label>
              <select className="input" value={year} onChange={(e) => setYear(e.target.value)}>
                <option value="">Any year</option>
                {years.map((y) => <option key={y} value={y}>{y}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Import Source</label>
              <select className="input" value={source} onChange={(e) => setSource(e.target.value)}>
                <option value="">All sources</option>
                {importSources.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
              </select>
            </div>
            <div>
              <label className="label">Max Price (${maxPrice ? Number(maxPrice).toLocaleString() : "any"})</label>
              <input
                type="range"
                min={20000}
                max={100000}
                step={5000}
                value={maxPrice || 100000}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full accent-lime"
              />
            </div>
          </div>
        </aside>

        {/* Results */}
        <div>
          <p className="mb-6 text-sm font-medium text-navy/60">
            Showing <span className="text-navy">{filtered.length}</span> of {vehicles.length} vehicles
          </p>
          {filtered.length === 0 ? (
            <div className="grid place-items-center rounded-2xl border border-dashed border-navy/20 py-24 text-center">
              <Icon name="car" width={40} height={40} className="text-navy/30" />
              <p className="mt-3 font-semibold text-navy">No vehicles match your filters</p>
              <button onClick={reset} className="btn-ghost mt-4">Clear filters</button>
            </div>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {filtered.map((v) => <VehicleCard key={v.id} v={v} />)}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
