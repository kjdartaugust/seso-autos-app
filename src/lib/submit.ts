import { NextResponse } from "next/server";
import { isDbConfigured } from "./prisma";

// Minimal validation + demo-mode aware persistence wrapper for the
// public submission endpoints. In demo mode (no DATABASE_URL) the
// request is accepted and logged but not persisted, so forms still work.
export async function handleSubmission<T>(
  req: Request,
  required: string[],
  persist: (data: Record<string, unknown>) => Promise<T>
) {
  let data: Record<string, unknown>;
  try {
    data = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const missing = required.filter(
    (k) => data[k] === undefined || data[k] === null || data[k] === ""
  );
  if (missing.length) {
    return NextResponse.json(
      { error: `Missing required field(s): ${missing.join(", ")}` },
      { status: 400 }
    );
  }

  if (!isDbConfigured) {
    console.log("[demo-mode submission]", data);
    return NextResponse.json({ ok: true, demo: true });
  }

  try {
    const record = await persist(data);
    return NextResponse.json({ ok: true, record });
  } catch (err) {
    console.error("Submission failed:", err);
    return NextResponse.json(
      { error: "Could not save your request. Please try again." },
      { status: 500 }
    );
  }
}

export function str(v: unknown): string {
  return typeof v === "string" ? v.trim() : v == null ? "" : String(v);
}
