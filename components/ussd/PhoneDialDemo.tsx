"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  m,
  useInView,
  useReducedMotion,
  useSpring,
  useMotionValue,
  useTransform,
} from "framer-motion";
import { BatteryFull, Phone, Signal } from "lucide-react";
import { demo, naira } from "@/config/content";
import { siteConfig } from "@/config/site";
import { LogoMark } from "@/components/ui/Logo";
import { spring } from "@/lib/motion";
import { cn } from "@/lib/cn";

/* ───────────────────────────── timeline ───────────────────────────── */

type StepId = "dial" | "connecting" | "menu" | "reference" | "amount" | "confirm" | "success" | "sms";

const STEPS: { id: StepId; ms: number; stage: number }[] = [
  { id: "dial", ms: 4400, stage: 0 },
  { id: "connecting", ms: 1500, stage: 1 },
  { id: "menu", ms: 3500, stage: 1 },
  { id: "reference", ms: 2900, stage: 2 },
  { id: "amount", ms: 3000, stage: 2 },
  { id: "confirm", ms: 3000, stage: 2 },
  { id: "success", ms: 2400, stage: 3 },
  { id: "sms", ms: 4400, stage: 3 },
];

type DialogCopy = { lines: string[]; input?: string; delay?: number; loading?: boolean; ok?: boolean };

const DIALOGS: Partial<Record<StepId, DialogCopy>> = {
  connecting: { lines: ["USSD code running…"], loading: true },
  menu: {
    lines: [`Welcome back, ${demo.name}`, "1. Apply for a loan", "2. Repay a loan", "3. My balance", "4. Help"],
    input: "2",
    delay: 1500,
  },
  reference: { lines: ["Enter your loan reference:"], input: demo.loanRef, delay: 600 },
  amount: { lines: ["Enter the amount to repay (₦):"], input: String(demo.amount), delay: 600 },
  confirm: {
    lines: [`Repay ${naira(demo.amount)} to KINLEND for loan ${demo.loanRef}.`, "1. Confirm", "2. Cancel"],
    input: "1",
    delay: 1200,
  },
  success: { lines: ["Payment received.", `Thank you, ${demo.name}. Your SMS receipt is on its way.`], ok: true },
};

/** Types `text` out one character at a time once `run` is true. */
function useTyped(text: string, run: boolean, { delay = 500, speed = 130, instant = false } = {}) {
  const [progress, setProgress] = useState({ text: "", run: false, n: 0 });
  useEffect(() => {
    if (!run || instant) return;
    let i = 0;
    let tick: ReturnType<typeof setInterval> | undefined;
    const start = setTimeout(() => {
      tick = setInterval(() => {
        i += 1;
        setProgress({ text, run, n: i });
        if (i >= text.length && tick) clearInterval(tick);
      }, speed);
    }, delay);
    return () => {
      clearTimeout(start);
      if (tick) clearInterval(tick);
    };
  }, [text, run, delay, speed, instant]);
  if (instant && run) return text;
  return progress.text === text && progress.run === run ? text.slice(0, progress.n) : "";
}

/* ───────────────────────────── cursor tilt ───────────────────────────── */

/**
 * Tracks the pointer anywhere on the page and returns a smoothed
 * `{ rotateX, rotateY, shadowX, shadowY }` that makes a target face the cursor.
 *
 * Coordinates are normalized to -1..1 relative to the target's own center,
 * so the phone responds based on where your mouse sits *in the viewport*,
 * not just when it's over the phone.
 */
function useCursorTilt(
  targetRef: React.RefObject<HTMLElement | null>,
  { enabled = true, strength = 12, rest = { x: -14, y: 5 }, idleMs = 1400 } = {}
) {
  const rawX = useMotionValue(0); // -1..1 across viewport width
  const rawY = useMotionValue(0); // -1..1 across viewport height
  const idle = useRef(true);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  // Springy values so it doesn't feel twitchy.
  const sx = useSpring(rawX, { stiffness: 140, damping: 20, mass: 0.6 });
  const sy = useSpring(rawY, { stiffness: 140, damping: 20, mass: 0.6 });

  // Map to rotations. Cursor right → phone's left edge comes forward (positive
  // rotateY). Cursor down → phone's top comes forward (positive rotateX).
  const rotateY = useTransform(sx, (v) => rest.x + v * strength * -1);
  const rotateX = useTransform(sy, (v) => rest.y + v * strength);
  // Shadow tracks opposite so the "light source" stays put.
  const shadowX = useTransform(sx, (v) => v * -18);
  const shadowY = useTransform(sy, (v) => v * -12);
  const shadowBlur = useMotionValue(40);

  useEffect(() => {
    if (!enabled) return;

    const reset = () => {
      rawX.set(0);
      rawY.set(0);
    };

    const onMove = (e: PointerEvent) => {
      const el = targetRef.current;
      if (!el) return;
      const r = el.getBoundingClientRect();
      // Use viewport-relative delta from the target's center so moving toward
      // the phone from anywhere on the page pulls its face toward you.
      const cx = r.left + r.width / 2;
      const cy = r.top + r.height / 2;
      const dx = (e.clientX - cx) / (window.innerWidth / 2);
      const dy = (e.clientY - cy) / (window.innerHeight / 2);
      rawX.set(Math.max(-1, Math.min(1, dx)));
      rawY.set(Math.max(-1, Math.min(1, dy)));

      idle.current = false;
      if (idleTimer.current) clearTimeout(idleTimer.current);
      idleTimer.current = setTimeout(() => {
        idle.current = true;
        reset();
      }, idleMs);
    };

    const onLeave = () => reset();

    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerleave", onLeave);
    document.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerleave", onLeave);
      document.removeEventListener("pointerleave", onLeave);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [enabled, idleMs, rawX, rawY, targetRef]);

  return { rotateX, rotateY, shadowX, shadowY, shadowBlur };
}

/* ───────────────────────────── hardware ───────────────────────────── */

function PhoneFrame({
  children,
  className,
  rotateX,
  rotateY,
  shadowX,
  shadowY,
}: {
  children: ReactNode;
  className?: string;
  rotateX: ReturnType<typeof useMotionValue<number>>;
  rotateY: ReturnType<typeof useMotionValue<number>>;
  shadowX: ReturnType<typeof useMotionValue<number>>;
  shadowY: ReturnType<typeof useMotionValue<number>>;
}) {
  return (
    <div className={cn("relative mx-auto w-[17.25rem] sm:w-[18.5rem]", className)}>
      <div className="relative [perspective:1400px] [transform-style:preserve-3d]">
        {/*
          Ground shadow — clipped to the top half of the phone so the tilted
          phone never shows a hard black smear across its lower body.
          Uses a mask to fade out by the vertical midpoint.
        */}
        <m.span
          aria-hidden
          className="pointer-events-none absolute -top-10 left-1/2 -z-10 h-[55%] w-[130%] -translate-x-1/2 rounded-[3.5rem] bg-[radial-gradient(ellipse_at_center,rgba(0,0,0,0.16),transparent_70%)] blur-2xl"
          style={{
            x: shadowX,
            y: shadowY,
            maskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
            WebkitMaskImage:
              "linear-gradient(to bottom, black 0%, black 35%, transparent 85%)",
          }}
        />
        <m.div
          className="relative [transform-style:preserve-3d]"
          style={{ rotateX, rotateY, transformOrigin: "center center" }}
        >
          <span aria-hidden className="absolute -left-[3px] top-24 h-8 w-[3px] rounded-l bg-neu-700" />
          <span aria-hidden className="absolute -left-[3px] top-36 h-8 w-[3px] rounded-l bg-neu-700" />
          <span aria-hidden className="absolute -right-[3px] top-32 h-14 w-[3px] rounded-r bg-neu-700" />
          <div className="relative aspect-[9/19.2] rounded-[2.6rem] bg-neu-900 p-[0.6rem] shadow-phone ring-1 ring-white/10">
            <div className="relative h-full w-full overflow-hidden rounded-[2.05rem] bg-neu-50 text-neu-900">
              {children}
              <span
                aria-hidden
                className="absolute left-1/2 top-2.5 z-40 h-2.5 w-2.5 -translate-x-1/2 rounded-full bg-neu-900"
              />
            </div>
          </div>
        </m.div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2.5 text-[0.65rem] font-semibold text-neu-900">
      <span className="tabular-nums">10:24</span>
      <span className="flex items-center gap-1">
        <span className="text-[0.55rem] font-bold">3G</span>
        <Signal className="h-3 w-3" strokeWidth={2.5} />
        <BatteryFull className="h-3.5 w-3.5" />
      </span>
    </div>
  );
}

/* ───────────────────────────── screens ───────────────────────────── */

const KEYS: [string, string][] = [
  ["1", ""], ["2", "ABC"], ["3", "DEF"],
  ["4", "GHI"], ["5", "JKL"], ["6", "MNO"],
  ["7", "PQRS"], ["8", "TUV"], ["9", "WXYZ"],
  ["*", ""], ["0", "+"], ["#", ""],
];

function Dialer({ number, called }: { number: string; called: boolean }) {
  const last = number.slice(-1);
  return (
    <div className="absolute inset-0 flex flex-col bg-neu-50 text-neu-900">
      <StatusBar />
      <div className="flex flex-1 items-end justify-center px-4 pb-4">
        <p className="relative min-h-[2.3rem] font-light text-[1.9rem] tracking-[0.08em] tabular-nums">
          {number}
          {!called && (
            <span
              aria-hidden
              className="ml-0.5 inline-block h-[1.7rem] w-[2px] translate-y-1 animate-caret bg-ter-600"
            />
          )}
        </p>
      </div>
      <div className="grid grid-cols-3 gap-y-1 px-5">
        {KEYS.map(([k, letters]) => (
          <div key={k} className="relative grid h-[2.75rem] place-items-center">
            {last === k && number.length > 0 && !called && (
              <m.span
                key={number.length}
                aria-hidden
                className="absolute h-11 w-11 rounded-full bg-pri-200"
                initial={{ opacity: 0.95, scale: 0.6 }}
                animate={{ opacity: 0, scale: 1.15 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              />
            )}
            <span className="relative text-center leading-none">
              <span className="block text-[1.15rem] font-medium">{k}</span>
              <span className="block h-2 text-[0.45rem] font-semibold tracking-[0.12em] text-neu-600">{letters}</span>
            </span>
          </div>
        ))}
      </div>
      <div className="flex justify-center pb-6 pt-2">
        <div className="relative">
          {called && (
            <m.span
              aria-hidden
              className="absolute inset-0 rounded-full bg-pri-600"
              initial={{ opacity: 0.5, scale: 1 }}
              animate={{ opacity: 0, scale: 1.9 }}
              transition={{ duration: 0.9, ease: "easeOut" }}
            />
          )}
          <m.div
            animate={called ? { scale: [1, 0.86, 1] } : { scale: 1 }}
            transition={{ duration: 0.35 }}
            className="relative grid h-12 w-12 place-items-center rounded-full bg-pri-600 text-white"
          >
            <Phone className="h-5 w-5" fill="currentColor" strokeWidth={0} />
          </m.div>
        </div>
      </div>
    </div>
  );
}

function DialogBody({ id, copy, typed }: { id: StepId; copy: DialogCopy; typed: string }) {
  const done = copy.input !== undefined && typed === copy.input;
  return (
    <m.div
      key={id}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -6 }}
      transition={{ duration: 0.18 }}
    >
      <div className="min-h-[5.5rem] space-y-0.5 text-[0.8rem] leading-snug text-neu-900">
        {copy.loading && (
          <div className="flex items-center gap-3 py-5">
            <m.span
              aria-hidden
              className="h-5 w-5 rounded-full border-[2.5px] border-ter-200 border-t-ter-600"
              animate={{ rotate: 360 }}
              transition={{ duration: 0.8, ease: "linear", repeat: Infinity }}
            />
            <p className="font-medium">{copy.lines[0]}</p>
          </div>
        )}
        {!copy.loading && copy.lines.map((l, i) => <p key={i}>{l}</p>)}
      </div>

      {copy.input !== undefined && (
        <div className="mt-3 border-b-2 border-ter-600 pb-1 text-[0.95rem] font-medium tabular-nums">
          {typed}
          <span
            aria-hidden
            className="ml-px inline-block h-[1.05rem] w-px translate-y-0.5 animate-caret bg-neu-900"
          />
        </div>
      )}

      {!copy.loading && (
        <div className="mt-4 flex justify-end gap-1 text-[0.78rem] font-semibold text-ter-700">
          {copy.ok ? (
            <span className="rounded-full bg-ter-100 px-3.5 py-1.5">OK</span>
          ) : (
            <>
              <span className="px-3.5 py-1.5">Cancel</span>
              <span className={cn("rounded-full px-3.5 py-1.5 transition-colors duration-200", done && "bg-ter-100")}>Send</span>
            </>
          )}
        </div>
      )}
    </m.div>
  );
}

function SmsNotification() {
  return (
    <m.div
      initial={{ y: -96, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: -96, opacity: 0 }}
      transition={spring.soft}
      className="absolute inset-x-2.5 top-9 z-30 rounded-2xl bg-white p-3 shadow-pop ring-1 ring-neu-200"
    >
      <div className="flex items-center gap-1.5">
        <LogoMark className="h-4 w-4" />
        <span className="text-[0.62rem] font-semibold text-neu-900">KINLEND</span>
        <span className="ml-auto text-[0.6rem] text-neu-600">now</span>
      </div>
      <p className="mt-1.5 text-[0.72rem] leading-snug text-neu-800">
        {naira(demo.amount)} received for loan {demo.loanRef}. Balance {naira(demo.balance)}. Paid direct to KINLEND. Ref{" "}
        {demo.receiptRef}.
      </p>
    </m.div>
  );
}

/* ───────────────────────────── component ───────────────────────────── */

export function PhoneDialDemo({
  code = siteConfig.ussd.code,
  onStageChange,
  jump,
  className,
}: {
  code?: string;
  onStageChange?: (stage: number) => void;
  jump?: { stage: number; nonce: number } | null;
  className?: string;
}) {
  const reduced = Boolean(useReducedMotion());
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.3 });
  const [idx, setIdx] = useState(0);
  const step = STEPS[reduced ? STEPS.length - 1 : idx];

  useEffect(() => {
    if (reduced || !inView) return;
    const t = setTimeout(() => setIdx((i) => (i + 1) % STEPS.length), STEPS[idx].ms);
    return () => clearTimeout(t);
  }, [idx, inView, reduced]);

  useEffect(() => {
    if (!jump) return;
    const first = STEPS.findIndex((s) => s.stage === jump.stage);
    if (first < 0) return;

    const handle = setTimeout(() => setIdx(first), 0);
    return () => clearTimeout(handle);
  }, [jump]);

  useEffect(() => {
    onStageChange?.(step.stage);
  }, [step.stage, onStageChange]);

  // Disable tracking for reduced-motion users (they get the static neutral lean).
  const tilt = useCursorTilt(ref, { enabled: !reduced, strength: 14, rest: { x: -14, y: 5 } });

  const copy = DIALOGS[step.id];
  const typedCode = useTyped(code, step.id === "dial", { delay: 600, speed: 420, instant: reduced });
  const typedInput = useTyped(copy?.input ?? "", Boolean(copy?.input), {
    delay: copy?.delay ?? 600,
    speed: 150,
    instant: reduced,
  });

  const number = step.id === "dial" ? typedCode : step.id === "sms" ? "" : code;
  const called = step.id === "dial" ? typedCode === code && code.length > 0 : step.id !== "sms";

  return (
    <div
      ref={ref}
      role="img"
      aria-label={`Animated demonstration: dial ${code}, choose repay, enter your loan reference and amount, confirm, then receive an SMS receipt.`}
      className={className}
      tabIndex={0}
    >
      <PhoneFrame
        rotateX={tilt.rotateX}
        rotateY={tilt.rotateY}
        shadowX={tilt.shadowX}
        shadowY={tilt.shadowY}
      >
        <Dialer number={number} called={called} />

        <AnimatePresence>
          {copy && (
            <m.div
              key="dim"
              className="absolute inset-0 z-20 grid place-items-center bg-black/45 px-3"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <m.div
                className="w-full rounded-[1.6rem] bg-white p-5 shadow-pop"
                initial={{ scale: 0.92, y: 10 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.96, opacity: 0 }}
                transition={spring.soft}
              >
                <AnimatePresence mode="wait" initial={false}>
                  <DialogBody key={step.id} id={step.id} copy={copy} typed={typedInput} />
                </AnimatePresence>
              </m.div>
            </m.div>
          )}
        </AnimatePresence>

        <AnimatePresence>{step.id === "sms" && <SmsNotification key="sms" />}</AnimatePresence>
      </PhoneFrame>
    </div>
  );
}