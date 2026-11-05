"use client";

import { useId, type ReactNode } from "react";
import { cn } from "@/lib/cn";

export const inputClass =
  "mt-2 w-full rounded-lg border border-neu-300 bg-white px-4 text-base text-neu-900 placeholder:text-neu-400 focus:border-ter-600 focus:outline-none focus:ring-2 focus:ring-ter-600/25 aria-[invalid=true]:border-neu-900";

type Common = { label: string; hint?: string; error?: string; className?: string };

function Wrap({ id, label, hint, error, className, children }: Common & { id: string; children: ReactNode }) {
  return (
    <div className={className}>
      <label htmlFor={id} className="text-sm font-semibold text-neu-900">{label}</label>
      {children}
      {hint && !error && <p id={`${id}-h`} className="mt-1.5 text-[0.8125rem] text-neu-600">{hint}</p>}
      {error && <p id={`${id}-e`} role="alert" className="mt-1.5 text-sm font-medium text-neu-900">{error}</p>}
    </div>
  );
}

const describe = (id: string, hint?: string, error?: string) => (error ? `${id}-e` : hint ? `${id}-h` : undefined);

export function TextField({
  name, value, onChange, type = "text", autoComplete, inputMode, placeholder, ...c
}: Common & {
  name: string; value: string; onChange: (v: string) => void; type?: string; autoComplete?: string;
  inputMode?: "text" | "tel" | "email" | "numeric"; placeholder?: string;
}) {
  const id = useId();
  return (
    <Wrap id={id} {...c}>
      <input
        id={id} name={name} type={type} value={value} autoComplete={autoComplete} inputMode={inputMode} placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!c.error} aria-describedby={describe(id, c.hint, c.error)}
        className={cn(inputClass, "h-12")}
      />
    </Wrap>
  );
}

export function SelectField({
  name, value, onChange, options, placeholder = "Choose one", ...c
}: Common & { name: string; value: string; onChange: (v: string) => void; options: string[]; placeholder?: string }) {
  const id = useId();
  return (
    <Wrap id={id} {...c}>
      <select
        id={id} name={name} value={value} onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!c.error} aria-describedby={describe(id, c.hint, c.error)}
        className={cn(inputClass, "h-12")}
      >
        <option value="">{placeholder}</option>
        {options.map((o) => <option key={o}>{o}</option>)}
      </select>
    </Wrap>
  );
}

export function TextAreaField({
  name, value, onChange, rows = 4, placeholder, ...c
}: Common & { name: string; value: string; onChange: (v: string) => void; rows?: number; placeholder?: string }) {
  const id = useId();
  return (
    <Wrap id={id} {...c}>
      <textarea
        id={id} name={name} value={value} rows={rows} placeholder={placeholder} onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!c.error} aria-describedby={describe(id, c.hint, c.error)}
        className={cn(inputClass, "py-3 leading-relaxed")}
      />
    </Wrap>
  );
}

export function CheckField({
  name, checked, onChange, children, error,
}: { name: string; checked: boolean; onChange: (v: boolean) => void; children: ReactNode; error?: string }) {
  const id = useId();
  return (
    <div>
      <div className="flex items-start gap-3">
        <input
          id={id} name={name} type="checkbox" checked={checked} onChange={(e) => onChange(e.target.checked)}
          aria-invalid={!!error} aria-describedby={error ? `${id}-e` : undefined}
          className="mt-1 h-5 w-5 shrink-0 rounded border-neu-400 accent-sec-600"
        />
        <label htmlFor={id} className="text-[0.9375rem] leading-relaxed text-neu-800">{children}</label>
      </div>
      {error && <p id={`${id}-e`} role="alert" className="mt-1.5 pl-8 text-sm font-medium text-neu-900">{error}</p>}
    </div>
  );
}

/** Hidden from people, tempting to bots. The server drops any submission that fills it. */
export function Honeypot({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div aria-hidden className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
      <label>
        Website
        <input tabIndex={-1} autoComplete="off" name="website" value={value} onChange={(e) => onChange(e.target.value)} />
      </label>
    </div>
  );
}
