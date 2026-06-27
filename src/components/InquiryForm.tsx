"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Icon from "./Icon";

export type Field = {
  name: string;
  label: string;
  type?: "text" | "email" | "tel" | "textarea" | "select" | "date" | "checkbox" | "number";
  required?: boolean;
  options?: { value: string; label: string }[];
  placeholder?: string;
  defaultValue?: string;
  full?: boolean;
};

export default function InquiryForm({
  endpoint,
  fields,
  submitLabel = "Submit Request",
  successMessage = "Thank you! Our team will reach out to you shortly.",
  hidden = {},
}: {
  endpoint: string;
  fields: Field[];
  submitLabel?: string;
  successMessage?: string;
  hidden?: Record<string, string>;
}) {
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    const form = e.currentTarget;
    const fd = new FormData(form);
    const payload: Record<string, unknown> = { ...hidden };
    fields.forEach((f) => {
      if (f.type === "checkbox") payload[f.name] = fd.get(f.name) === "on";
      else payload[f.name] = fd.get(f.name) ?? "";
    });
    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error();
      setStatus("done");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  return (
    <AnimatePresence mode="wait">
      {status === "done" ? (
        <motion.div
          key="done"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          className="rounded-2xl border border-lime/30 bg-lime/10 p-8 text-center"
        >
          <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-lime text-navy">
            <Icon name="check" />
          </div>
          <h3 className="mt-4 text-xl font-bold text-navy">Request Received</h3>
          <p className="mt-2 text-navy/70">{successMessage}</p>
          <button
            onClick={() => setStatus("idle")}
            className="btn-ghost mt-6"
          >
            Submit another
          </button>
        </motion.div>
      ) : (
        <motion.form
          key="form"
          onSubmit={onSubmit}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="grid gap-5 sm:grid-cols-2"
        >
          {fields.map((f) => (
            <div
              key={f.name}
              className={f.full || f.type === "textarea" ? "sm:col-span-2" : ""}
            >
              {f.type !== "checkbox" && <label className="label">{f.label}</label>}
              {f.type === "textarea" ? (
                <textarea
                  name={f.name}
                  required={f.required}
                  rows={4}
                  placeholder={f.placeholder}
                  className="input resize-none"
                />
              ) : f.type === "select" ? (
                <select
                  name={f.name}
                  required={f.required}
                  defaultValue={f.defaultValue ?? ""}
                  className="input"
                >
                  <option value="" disabled>
                    {f.placeholder ?? "Select an option"}
                  </option>
                  {f.options?.map((o) => (
                    <option key={o.value} value={o.value}>
                      {o.label}
                    </option>
                  ))}
                </select>
              ) : f.type === "checkbox" ? (
                <label className="flex cursor-pointer items-center gap-3 rounded-xl border border-navy/15 px-4 py-3">
                  <input
                    type="checkbox"
                    name={f.name}
                    className="h-5 w-5 accent-lime"
                  />
                  <span className="text-sm font-medium text-navy/80">{f.label}</span>
                </label>
              ) : (
                <input
                  type={f.type ?? "text"}
                  name={f.name}
                  required={f.required}
                  placeholder={f.placeholder}
                  defaultValue={f.defaultValue}
                  className="input"
                />
              )}
            </div>
          ))}

          {status === "error" && (
            <p className="sm:col-span-2 text-sm text-red-600">
              Something went wrong. Please try again or call us directly.
            </p>
          )}

          <div className="sm:col-span-2">
            <button
              type="submit"
              disabled={status === "loading"}
              className="btn-accent w-full sm:w-auto disabled:opacity-60"
            >
              {status === "loading" ? "Sending…" : submitLabel}
              {status !== "loading" && <Icon name="arrow" width={18} height={18} />}
            </button>
          </div>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
