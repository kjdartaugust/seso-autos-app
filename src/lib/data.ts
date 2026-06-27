// Data-access layer with demo-mode fallback. When no database is
// configured (or a query fails) we serve the static demo data so the
// site stays fully functional on a fresh Vercel deploy.

import { prisma, isDbConfigured } from "./prisma";
import { demoVehicles, demoRentals, type DemoVehicle, type DemoRental } from "./demo-data";

export type VehicleView = DemoVehicle;
export type RentalView = DemoRental;

function normalizeVehicle(v: {
  images: string;
  [k: string]: unknown;
}): VehicleView {
  let images: string[] = [];
  try {
    images = JSON.parse(v.images);
  } catch {
    images = v.images ? [v.images] : [];
  }
  return { ...(v as unknown as VehicleView), images };
}

export async function getVehicles(): Promise<VehicleView[]> {
  if (!isDbConfigured) return demoVehicles;
  try {
    const rows = await prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } });
    if (rows.length === 0) return demoVehicles;
    return rows.map(normalizeVehicle);
  } catch {
    return demoVehicles;
  }
}

export async function getFeaturedVehicles(): Promise<VehicleView[]> {
  const all = await getVehicles();
  const featured = all.filter((v) => v.featured);
  return (featured.length ? featured : all).slice(0, 3);
}

export async function getVehicleById(id: string): Promise<VehicleView | null> {
  if (!isDbConfigured) return demoVehicles.find((v) => v.id === id) ?? null;
  try {
    const v = await prisma.vehicle.findUnique({ where: { id } });
    if (!v) return demoVehicles.find((d) => d.id === id) ?? null;
    return normalizeVehicle(v);
  } catch {
    return demoVehicles.find((v) => v.id === id) ?? null;
  }
}

export async function getRentals(): Promise<RentalView[]> {
  if (!isDbConfigured) return demoRentals;
  try {
    const rows = await prisma.rentalVehicle.findMany({ orderBy: { dailyRate: "asc" } });
    if (rows.length === 0) return demoRentals;
    return rows as unknown as RentalView[];
  } catch {
    return demoRentals;
  }
}

// Admin dashboard aggregate counts (safe in demo mode).
export async function getAdminStats() {
  if (!isDbConfigured) {
    return {
      vehicles: demoVehicles.length,
      bookings: 0,
      insurance: 0,
      licensing: 0,
      tracking: 0,
      demo: true,
    };
  }
  try {
    const [vehicles, bookings, insurance, licensing, tracking] = await Promise.all([
      prisma.vehicle.count(),
      prisma.rentalBooking.count(),
      prisma.insuranceInquiry.count(),
      prisma.licensingRequest.count(),
      prisma.trackingInquiry.count(),
    ]);
    return { vehicles, bookings, insurance, licensing, tracking, demo: false };
  } catch {
    return { vehicles: 0, bookings: 0, insurance: 0, licensing: 0, tracking: 0, demo: true };
  }
}
