import { prisma, isDbConfigured } from "./prisma";
import { demoVehicles } from "./demo-data";

export type Row = Record<string, unknown> & { id: string; createdAt: string };

function serialize<T extends { createdAt: Date }>(rows: T[]): Row[] {
  return rows.map((r) => ({
    ...r,
    createdAt: r.createdAt.toISOString(),
  })) as unknown as Row[];
}

export async function getAdminData() {
  if (!isDbConfigured) {
    return {
      demo: true,
      vehicles: demoVehicles.map((v) => ({
        id: v.id,
        title: v.title,
        price: v.price,
        importSource: v.importSource,
        status: v.status,
        createdAt: new Date().toISOString(),
      })) as Row[],
      bookings: [] as Row[],
      insurance: [] as Row[],
      licensing: [] as Row[],
      tracking: [] as Row[],
      sales: [] as Row[],
    };
  }

  try {
    const [vehicles, bookings, insurance, licensing, tracking, sales] =
      await Promise.all([
        prisma.vehicle.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.rentalBooking.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.insuranceInquiry.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.licensingRequest.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.trackingInquiry.findMany({ orderBy: { createdAt: "desc" } }),
        prisma.salesInquiry.findMany({ orderBy: { createdAt: "desc" } }),
      ]);
    return {
      demo: false,
      vehicles: serialize(vehicles),
      bookings: serialize(bookings),
      insurance: serialize(insurance),
      licensing: serialize(licensing),
      tracking: serialize(tracking),
      sales: serialize(sales),
    };
  } catch {
    return {
      demo: true,
      vehicles: [] as Row[],
      bookings: [] as Row[],
      insurance: [] as Row[],
      licensing: [] as Row[],
      tracking: [] as Row[],
      sales: [] as Row[],
    };
  }
}
