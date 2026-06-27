import { getServerSession } from "next-auth";
import { NextResponse } from "next/server";
import { authOptions } from "./auth";
import { isDbConfigured } from "./prisma";

/**
 * Guard for admin API mutations. Returns a NextResponse to short-circuit
 * the handler when the caller is unauthenticated, or `null` to proceed.
 */
export async function requireAdmin(): Promise<NextResponse | null> {
  const session = await getServerSession(authOptions);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
  return null;
}

/** Standard response for mutations attempted while no database is connected. */
export function demoModeResponse() {
  return NextResponse.json({
    ok: true,
    demo: true,
    message: "Demo mode — connect a database to persist this change.",
  });
}

export { isDbConfigured };
