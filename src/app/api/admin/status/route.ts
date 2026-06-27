import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, demoModeResponse, isDbConfigured } from "@/lib/admin-auth";

const VALID_STATUS = ["NEW", "IN_PROGRESS", "COMPLETED", "CANCELLED"] as const;

// Maps the dashboard tab key to its Prisma delegate.
const MODELS = {
  bookings: () => prisma.rentalBooking,
  insurance: () => prisma.insuranceInquiry,
  licensing: () => prisma.licensingRequest,
  tracking: () => prisma.trackingInquiry,
  sales: () => prisma.salesInquiry,
} as const;

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;

  let body: { model?: string; id?: string; status?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { model, id, status } = body;
  if (!model || !id || !status) {
    return NextResponse.json({ error: "model, id and status are required" }, { status: 400 });
  }
  if (!(model in MODELS)) {
    return NextResponse.json({ error: "Unknown model" }, { status: 400 });
  }
  if (!VALID_STATUS.includes(status as (typeof VALID_STATUS)[number])) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 });
  }

  if (!isDbConfigured) return demoModeResponse();

  try {
    const delegate = MODELS[model as keyof typeof MODELS]();
    // @ts-expect-error delegates share the update signature we need
    await delegate.update({ where: { id }, data: { status } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Status update failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
