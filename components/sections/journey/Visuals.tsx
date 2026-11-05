import { Check } from "lucide-react";
import { demo, naira } from "@/config/content";
import { photos } from "@/config/site";
import { cn } from "@/lib/cn";
import { Media } from "@/components/ui/Media";
import { UssdCodeLoader } from "@/components/ussd/UssdCodeLoader";

/** Small illustrations for each step of the journey. All figures are examples. */

const panel = "relative flex min-h-[18rem] items-center justify-center overflow-hidden rounded-2xl p-6 sm:p-8";
const caption = "absolute bottom-3 left-4 text-xs text-neu-600";

export function VouchVisual() {
  return (
    <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-sec-900">
      <Media slot={photos.marketPakuro} tone="sec" sizes="(min-width: 1024px) 40vw, 100vw" />
      <div aria-hidden className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-neu-900/75 to-transparent" />
      <p className="absolute bottom-4 left-5 rounded-md bg-white px-3 py-1.5 text-sm font-semibold text-neu-900">Vetting happens in person</p>
    </div>
  );
}

export function ApplyVisual() {
  const lines = ["1. Apply for a loan", "2. Repay a loan", "3. My balance", "4. Help"];
  return (
    <div className={cn(panel, "bg-ter-50")}>
      <div className="w-full max-w-xs rounded-[1.4rem] bg-white p-5 shadow-card ring-1 ring-neu-200">
        <p className="text-sm font-medium text-neu-900">Welcome back, {demo.name}</p>
        <ul className="mt-2 space-y-1 text-sm">
          {lines.map((l, i) => (
            <li key={l} className={cn("rounded-md px-2 py-1", i === 0 ? "bg-ter-100 font-semibold text-ter-800" : "text-neu-700")}>{l}</li>
          ))}
        </ul>
      </div>
      <p className={caption}>Illustration</p>
    </div>
  );
}

export function ReceiveVisual() {
  return (
    <div className={cn(panel, "bg-ter-50")}>
      <div className="w-full max-w-xs rounded-2xl bg-ter-900 p-6 text-white shadow-pop">
        <p className="eyebrow text-ter-300">KinPay</p>
        <p className="mt-6 text-sm text-white/70">Loan sent to your wallet</p>
        <p className="mt-1 text-4xl font-extrabold tabular-nums">{naira(demo.amount + demo.balance)}</p>
        <div className="mt-6 flex items-center justify-between border-t border-white/15 pt-4 text-xs text-white/70">
          <span>{demo.name}</span>
          <span className="inline-flex items-center gap-1.5 font-semibold text-white"><Check className="h-3.5 w-3.5" /> SMS confirmed</span>
        </div>
      </div>
      <p className={caption}>Illustration. Amounts are examples.</p>
    </div>
  );
}

export function RepayVisual() {
  return (
    <div className={cn(panel, "bg-ter-900 text-white")}>
      <div className="flex flex-col items-start gap-5">
        <p className="text-sm font-medium text-white/70">Dial on any phone</p>
        <UssdCodeLoader size="xl" tone="light" />
        <ul className="flex flex-wrap gap-2 text-xs font-semibold">
          {["Loan reference", "Amount", "Confirm"].map((s) => (
            <li key={s} className="rounded-md border border-white/25 px-2.5 py-1">{s}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function ReceiptVisual() {
  return (
    <div className={cn(panel, "bg-ter-50")}>
      <div className="w-full max-w-sm">
        <div className="rounded-2xl rounded-tl-sm bg-white p-4 shadow-card ring-1 ring-neu-200">
          <p className="text-xs font-semibold text-ter-700">KINLEND</p>
          <p className="mt-1.5 font-mono text-[0.8125rem] leading-relaxed text-neu-900">
            Payment received. {naira(demo.amount)} for loan {demo.loanRef}. Balance {naira(demo.balance)}. Paid direct to KINLEND. Ref {demo.receiptRef}.
          </p>
        </div>
      </div>
      <p className={caption}>Illustration. Amounts are examples.</p>
    </div>
  );
}

export function LadderVisual() {
  const rungs = [
    { name: "Trust", h: "h-16", c: "bg-pri-600" },
    { name: "Bronze", h: "h-28", c: "bg-tier-bronze" },
    { name: "Silver", h: "h-40", c: "bg-tier-silver" },
    { name: "Gold", h: "h-52", c: "bg-acc-500" },
  ];
  return (
    <div className={cn(panel, "items-end bg-neu-100")}>
      <ol className="flex w-full max-w-sm items-end gap-3">
        {rungs.map((r) => (
          <li key={r.name} className="flex-1 text-center">
            <div className={cn("w-full rounded-t-lg", r.h, r.c)} />
            <p className="mt-2 text-xs font-semibold text-neu-800">{r.name}</p>
          </li>
        ))}
      </ol>
    </div>
  );
}
