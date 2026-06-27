"use client";

import { useState } from "react";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { Row } from "@/lib/admin-data";
import Icon, { type IconName } from "./Icon";
import VehicleFormModal from "./VehicleFormModal";

const STATUS_OPTIONS = ["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"];
const REQUEST_TABS = ["bookings", "insurance", "licensing", "tracking", "sales"];

type Data = {
  demo: boolean;
  vehicles: Row[];
  bookings: Row[];
  insurance: Row[];
  licensing: Row[];
  tracking: Row[];
  sales: Row[];
};

const tabs: { key: keyof Omit<Data, "demo">; label: string; icon: IconName }[] = [
  { key: "vehicles", label: "Vehicle Listings", icon: "car" },
  { key: "bookings", label: "Rental Bookings", icon: "key" },
  { key: "insurance", label: "Insurance Inquiries", icon: "shield" },
  { key: "licensing", label: "Licensing Requests", icon: "doc" },
  { key: "tracking", label: "Tracking Inquiries", icon: "satellite" },
  { key: "sales", label: "Sales Inquiries", icon: "mail" },
];

const columns: Record<string, string[]> = {
  vehicles: ["title", "price", "importSource", "status"],
  bookings: ["name", "phone", "category", "pricingPlan", "startDate", "endDate", "delivery", "status"],
  insurance: ["name", "phone", "coverageType", "vehicleDetail", "status"],
  licensing: ["name", "phone", "serviceType", "vehicleInfo", "status"],
  tracking: ["name", "phone", "plan", "fleetSize", "status"],
  sales: ["name", "phone", "email", "message", "status"],
};

function fmt(key: string, value: unknown): string {
  if (value === null || value === undefined || value === "") return "—";
  if (key === "price") return `$${Number(value).toLocaleString()}`;
  if (key === "delivery") return value ? "Yes" : "No";
  if (key.endsWith("Date") || key === "createdAt") {
    const d = new Date(String(value));
    return isNaN(d.getTime()) ? String(value) : d.toLocaleDateString();
  }
  const s = String(value);
  return s.length > 48 ? s.slice(0, 48) + "…" : s;
}

export default function AdminDashboard({ data, adminName }: { data: Data; adminName: string }) {
  const router = useRouter();
  const [active, setActive] = useState<keyof Omit<Data, "demo">>("vehicles");
  const [notice, setNotice] = useState("");
  const [busyId, setBusyId] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Row | null>(null);
  const rows = data[active];

  const statCards = tabs.map((t) => ({ ...t, count: data[t.key].length }));

  function flash(msg: string) {
    setNotice(msg);
    setTimeout(() => setNotice(""), 4000);
  }

  async function updateStatus(id: string, status: string) {
    setBusyId(id);
    try {
      const res = await fetch("/api/admin/status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ model: active, id, status }),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Update failed");
      if (json.demo) flash("Demo mode — status change not persisted.");
      else {
        flash("Status updated.");
        router.refresh();
      }
    } catch (e) {
      flash(e instanceof Error ? e.message : "Update failed");
    } finally {
      setBusyId("");
    }
  }

  async function deleteVehicle(id: string) {
    if (!confirm("Delete this vehicle listing? This cannot be undone.")) return;
    setBusyId(id);
    try {
      const res = await fetch(`/api/admin/vehicles?id=${encodeURIComponent(id)}`, { method: "DELETE" });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Delete failed");
      if (json.demo) flash("Demo mode — deletion not persisted.");
      else {
        flash("Vehicle deleted.");
        router.refresh();
      }
    } catch (e) {
      flash(e instanceof Error ? e.message : "Delete failed");
    } finally {
      setBusyId("");
    }
  }

  function onSaved(demo: boolean) {
    setModalOpen(false);
    setEditing(null);
    if (demo) flash("Demo mode — change not persisted.");
    else {
      flash("Vehicle saved.");
      router.refresh();
    }
  }

  return (
    <div className="flex min-h-screen flex-col lg:flex-row">
      {/* Sidebar */}
      <aside className="border-b border-navy/10 bg-navy text-white lg:w-64 lg:border-b-0 lg:border-r lg:border-white/10">
        <div className="flex items-center gap-2.5 px-6 py-6">
          <span className="grid h-9 w-9 place-items-center rounded-lg bg-lime font-extrabold text-navy">S</span>
          <span className="font-extrabold">SESO Admin</span>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 lg:flex-col lg:overflow-visible lg:pb-0">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setActive(t.key)}
              className={`flex shrink-0 items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition ${
                active === t.key ? "bg-white/15 text-lime" : "text-white/75 hover:bg-white/10"
              }`}
            >
              <Icon name={t.icon} width={18} height={18} />
              <span className="whitespace-nowrap">{t.label}</span>
              <span className="ml-auto hidden rounded-full bg-white/10 px-2 py-0.5 text-xs lg:inline">
                {data[t.key].length}
              </span>
            </button>
          ))}
        </nav>
      </aside>

      {/* Main */}
      <div className="flex-1">
        <header className="flex items-center justify-between gap-4 border-b border-navy/10 bg-white px-6 py-4">
          <div>
            <h1 className="text-lg font-bold text-navy">Dashboard</h1>
            <p className="text-xs text-navy/55">Welcome back, {adminName}</p>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/" className="btn-ghost !px-4 !py-2 text-xs">View Site</Link>
            <button onClick={() => signOut({ callbackUrl: "/admin/login" })} className="btn-primary !px-4 !py-2 text-xs">
              <Icon name="logout" width={16} height={16} /> Sign Out
            </button>
          </div>
        </header>

        <div className="p-6">
          {data.demo && (
            <div className="mb-6 flex items-start gap-3 rounded-2xl border border-amber-300 bg-amber-50 p-4 text-amber-900">
              <Icon name="shield" width={20} height={20} className="mt-0.5 shrink-0" />
              <p className="text-sm">
                <strong>Demo mode.</strong> No database connected — vehicle listings come from
                sample data and submissions are not persisted. Set <code>DATABASE_URL</code> and run the
                seed to enable full functionality.
              </p>
            </div>
          )}

          {/* Stat cards */}
          <div className="grid gap-4 sm:grid-cols-3 lg:grid-cols-6">
            {statCards.map((s) => (
              <button
                key={s.key}
                onClick={() => setActive(s.key)}
                className={`rounded-2xl border p-4 text-left transition ${
                  active === s.key ? "border-electric bg-electric/5" : "border-navy/10 bg-white hover:border-electric/40"
                }`}
              >
                <Icon name={s.icon} width={20} height={20} className="text-electric" />
                <p className="mt-2 text-2xl font-extrabold text-navy">{s.count}</p>
                <p className="text-xs text-navy/55">{s.label}</p>
              </button>
            ))}
          </div>

          {/* Table */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-6 overflow-hidden rounded-2xl border border-navy/10 bg-white"
          >
            <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
              <h2 className="font-bold text-navy">{tabs.find((t) => t.key === active)?.label}</h2>
              <div className="flex items-center gap-4">
                <span className="text-sm text-navy/55">{rows.length} record{rows.length === 1 ? "" : "s"}</span>
                {active === "vehicles" && (
                  <button
                    onClick={() => { setEditing(null); setModalOpen(true); }}
                    className="btn-accent !px-4 !py-2 text-xs"
                  >
                    <Icon name="plus" width={16} height={16} /> Add Vehicle
                  </button>
                )}
              </div>
            </div>
            {rows.length === 0 ? (
              <div className="grid place-items-center py-20 text-center">
                <Icon name="doc" width={36} height={36} className="text-navy/25" />
                <p className="mt-3 text-sm text-navy/55">No records yet.</p>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead>
                    <tr className="border-b border-navy/10 bg-navy-50/60 text-xs uppercase tracking-wide text-navy/55">
                      {columns[active].map((c) => (
                        <th key={c} className="px-5 py-3 font-semibold">{c.replace(/([A-Z])/g, " $1")}</th>
                      ))}
                      <th className="px-5 py-3 font-semibold">Date</th>
                      {active === "vehicles" && <th className="px-5 py-3 font-semibold">Actions</th>}
                    </tr>
                  </thead>
                  <tbody>
                    {rows.map((r) => {
                      const isRequest = REQUEST_TABS.includes(active);
                      return (
                      <tr key={r.id} className="border-b border-navy/5 last:border-0 hover:bg-navy-50/40">
                        {columns[active].map((c) => (
                          <td key={c} className="px-5 py-3 text-navy/80">
                            {c === "status" && isRequest ? (
                              <select
                                value={String(r.status ?? "NEW")}
                                disabled={busyId === r.id}
                                onChange={(e) => updateStatus(r.id, e.target.value)}
                                className="rounded-lg border border-navy/15 bg-white px-2 py-1 text-xs font-semibold text-navy outline-none focus:border-electric disabled:opacity-50"
                              >
                                {STATUS_OPTIONS.map((s) => <option key={s} value={s}>{s.replace("_", " ")}</option>)}
                              </select>
                            ) : c === "status" ? (
                              <span className="badge bg-navy-50 text-navy">{fmt(c, r[c])}</span>
                            ) : (
                              fmt(c, r[c])
                            )}
                          </td>
                        ))}
                        <td className="px-5 py-3 text-navy/60">{fmt("createdAt", r.createdAt)}</td>
                        {active === "vehicles" && (
                          <td className="px-5 py-3">
                            <div className="flex gap-2">
                              <button
                                onClick={() => { setEditing(r); setModalOpen(true); }}
                                className="rounded-lg border border-navy/15 px-3 py-1.5 text-xs font-semibold text-navy hover:border-electric hover:text-electric"
                              >
                                Edit
                              </button>
                              <button
                                onClick={() => deleteVehicle(r.id)}
                                disabled={busyId === r.id}
                                className="rounded-lg border border-red-200 px-3 py-1.5 text-xs font-semibold text-red-600 hover:bg-red-50 disabled:opacity-50"
                              >
                                Delete
                              </button>
                            </div>
                          </td>
                        )}
                      </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      {/* Toast */}
      <AnimatePresence>
        {notice && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-6 left-1/2 z-[60] -translate-x-1/2 rounded-full bg-navy px-5 py-3 text-sm font-medium text-white shadow-xl"
          >
            {notice}
          </motion.div>
        )}
      </AnimatePresence>

      {modalOpen && (
        <VehicleFormModal
          vehicle={editing}
          onClose={() => { setModalOpen(false); setEditing(null); }}
          onSaved={onSaved}
        />
      )}
    </div>
  );
}
