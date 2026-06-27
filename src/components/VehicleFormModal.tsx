"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import type { Row } from "@/lib/admin-data";
import { importSources } from "@/lib/content";
import Icon from "./Icon";

const statuses = ["AVAILABLE", "RESERVED", "SOLD"];

function imagesToText(value: unknown): string {
  if (Array.isArray(value)) return value.join("\n");
  if (typeof value === "string") {
    try {
      const parsed = JSON.parse(value);
      if (Array.isArray(parsed)) return parsed.join("\n");
    } catch {
      /* not JSON */
    }
    return value;
  }
  return "";
}

export default function VehicleFormModal({
  vehicle,
  onClose,
  onSaved,
}: {
  vehicle: Row | null; // null = create
  onClose: () => void;
  onSaved: (demo: boolean) => void;
}) {
  const editing = Boolean(vehicle);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaving(true);
    setError("");
    const fd = new FormData(e.currentTarget);
    const payload: Record<string, unknown> = Object.fromEntries(fd.entries());
    payload.featured = fd.get("featured") === "on";
    if (editing && vehicle) payload.id = vehicle.id;

    try {
      const res = await fetch("/api/admin/vehicles", {
        method: editing ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      onSaved(Boolean(data.demo));
    } catch (err) {
      setError(err instanceof Error ? err.message : "Save failed");
      setSaving(false);
    }
  }

  const v = vehicle ?? {};
  const field = (k: string, fallback: string | number = "") =>
    (v as Record<string, unknown>)[k] ?? fallback;

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-navy-900/60 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl bg-white p-6 shadow-2xl"
      >
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold text-navy">
            {editing ? "Edit Vehicle" : "Add Vehicle"}
          </h2>
          <button onClick={onClose} className="grid h-9 w-9 place-items-center rounded-lg text-navy/60 hover:bg-navy-50">
            <Icon name="close" width={20} height={20} />
          </button>
        </div>

        <form onSubmit={onSubmit} className="mt-5 grid gap-4 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <label className="label">Title</label>
            <input name="title" required defaultValue={String(field("title"))} className="input" placeholder="2022 Toyota Land Cruiser VXR" />
          </div>
          <div>
            <label className="label">Make</label>
            <input name="make" required defaultValue={String(field("make"))} className="input" />
          </div>
          <div>
            <label className="label">Model</label>
            <input name="model" required defaultValue={String(field("model"))} className="input" />
          </div>
          <div>
            <label className="label">Year</label>
            <input name="year" type="number" defaultValue={String(field("year", new Date().getFullYear()))} className="input" />
          </div>
          <div>
            <label className="label">Price (USD)</label>
            <input name="price" type="number" defaultValue={String(field("price"))} className="input" />
          </div>
          <div>
            <label className="label">Mileage (km)</label>
            <input name="mileage" type="number" defaultValue={String(field("mileage", 0))} className="input" />
          </div>
          <div>
            <label className="label">Color</label>
            <input name="color" defaultValue={String(field("color"))} className="input" />
          </div>
          <div>
            <label className="label">Fuel Type</label>
            <input name="fuelType" defaultValue={String(field("fuelType", "Petrol"))} className="input" />
          </div>
          <div>
            <label className="label">Transmission</label>
            <input name="transmission" defaultValue={String(field("transmission", "Automatic"))} className="input" />
          </div>
          <div>
            <label className="label">Body Type</label>
            <input name="bodyType" defaultValue={String(field("bodyType", "Sedan"))} className="input" />
          </div>
          <div>
            <label className="label">Engine</label>
            <input name="engine" defaultValue={String(field("engine"))} className="input" />
          </div>
          <div>
            <label className="label">Import Source</label>
            <select name="importSource" defaultValue={String(field("importSource", "USA"))} className="input">
              {importSources.map((s) => <option key={s.value} value={s.value}>{s.label}</option>)}
            </select>
          </div>
          <div>
            <label className="label">Status</label>
            <select name="status" defaultValue={String(field("status", "AVAILABLE"))} className="input">
              {statuses.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
          </div>
          <div className="sm:col-span-2">
            <label className="label">Image URLs (one per line)</label>
            <textarea name="images" rows={3} defaultValue={imagesToText(field("images"))} className="input resize-none" placeholder="https://…" />
          </div>
          <div className="sm:col-span-2">
            <label className="label">Description</label>
            <textarea name="description" rows={3} defaultValue={String(field("description"))} className="input resize-none" />
          </div>
          <label className="flex cursor-pointer items-center gap-3 sm:col-span-2">
            <input type="checkbox" name="featured" defaultChecked={Boolean(field("featured"))} className="h-5 w-5 accent-lime" />
            <span className="text-sm font-medium text-navy/80">Show in featured vehicles</span>
          </label>

          {error && <p className="sm:col-span-2 text-sm text-red-600">{error}</p>}

          <div className="sm:col-span-2 flex justify-end gap-3">
            <button type="button" onClick={onClose} className="btn-ghost">Cancel</button>
            <button type="submit" disabled={saving} className="btn-primary disabled:opacity-60">
              {saving ? "Saving…" : editing ? "Save Changes" : "Add Vehicle"}
            </button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
