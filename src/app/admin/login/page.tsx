"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { motion } from "framer-motion";
import Icon from "@/components/Icon";

export default function AdminLogin() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    const res = await signIn("credentials", { email, password, redirect: false });
    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password.");
      return;
    }
    router.push("/admin");
    router.refresh();
  }

  return (
    <div className="grid min-h-screen place-items-center px-5">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-md rounded-3xl border border-navy/10 bg-white p-8 shadow-xl"
      >
        <Link href="/" className="flex items-center gap-2.5">
          <span className="grid h-10 w-10 place-items-center rounded-xl bg-lime font-extrabold text-navy">S</span>
          <span className="text-lg font-extrabold text-navy">SESO Autos</span>
        </Link>
        <h1 className="mt-6 text-2xl font-extrabold text-navy">Admin Sign In</h1>
        <p className="mt-1 text-sm text-navy/60">Manage listings, bookings and inquiries.</p>

        <form onSubmit={onSubmit} className="mt-6 space-y-4">
          <div>
            <label className="label">Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="input"
              placeholder="admin@sesoautos.com"
            />
          </div>
          <div>
            <label className="label">Password</label>
            <input
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="input"
              placeholder="••••••••"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button disabled={loading} className="btn-primary w-full disabled:opacity-60">
            {loading ? "Signing in…" : "Sign In"}
            {!loading && <Icon name="arrow" width={18} height={18} />}
          </button>
        </form>

        <p className="mt-6 rounded-xl bg-navy-50 p-3 text-center text-xs text-navy/60">
          Demo: <strong>admin@sesoautos.com</strong> / <strong>seso-admin-2026</strong>
        </p>
      </motion.div>
    </div>
  );
}
