import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { requireAdmin, demoModeResponse, isDbConfigured } from "@/lib/admin-auth";

const SOURCES = ["USA", "CANADA", "CHINA", "LOCAL"];
const STATUSES = ["AVAILABLE", "RESERVED", "SOLD"];

function toImagesJson(value: unknown): string {
  if (Array.isArray(value)) return JSON.stringify(value.filter(Boolean));
  if (typeof value === "string") {
    const urls = value
      .split(/[\n,]/)
      .map((s) => s.trim())
      .filter(Boolean);
    return JSON.stringify(urls);
  }
  return JSON.stringify([]);
}

function buildData(d: Record<string, unknown>) {
  return {
    title: String(d.title ?? "").trim(),
    make: String(d.make ?? "").trim(),
    model: String(d.model ?? "").trim(),
    year: Number(d.year) || new Date().getFullYear(),
    price: Number(d.price) || 0,
    mileage: Number(d.mileage) || 0,
    fuelType: String(d.fuelType ?? "Petrol"),
    transmission: String(d.transmission ?? "Automatic"),
    bodyType: String(d.bodyType ?? "Sedan"),
    color: String(d.color ?? "Black"),
    engine: String(d.engine ?? ""),
    description: String(d.description ?? ""),
    images: toImagesJson(d.images),
    importSource: SOURCES.includes(String(d.importSource)) ? String(d.importSource) : "USA",
    status: STATUSES.includes(String(d.status)) ? String(d.status) : "AVAILABLE",
    featured: Boolean(d.featured),
  } as const;
}

export async function POST(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!d.title || !d.make || !d.model) {
    return NextResponse.json({ error: "title, make and model are required" }, { status: 400 });
  }
  if (!isDbConfigured) return demoModeResponse();
  try {
    // @ts-expect-error enum strings are validated above
    const record = await prisma.vehicle.create({ data: buildData(d) });
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("Vehicle create failed:", err);
    return NextResponse.json({ error: "Create failed" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  let d: Record<string, unknown>;
  try {
    d = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }
  if (!d.id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  if (!isDbConfigured) return demoModeResponse();
  try {
    // @ts-expect-error enum strings are validated above
    const record = await prisma.vehicle.update({ where: { id: String(d.id) }, data: buildData(d) });
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("Vehicle update failed:", err);
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const denied = await requireAdmin();
  if (denied) return denied;
  const id = new URL(req.url).searchParams.get("id");
  if (!id) return NextResponse.json({ error: "id is required" }, { status: 400 });
  if (!isDbConfigured) return demoModeResponse();
  try {
    await prisma.vehicle.delete({ where: { id } });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Vehicle delete failed:", err);
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
