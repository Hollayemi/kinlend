"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/cn";
import type { MediaSlot } from "@/config/site";

type NetworkInformation = EventTarget & { saveData?: boolean; effectiveType?: string };

/** True when the visitor asked to save data or is on a 2G-class connection. */
function useConstrainedNetwork() {
  const [constrained, setConstrained] = useState(false);
  useEffect(() => {
    const conn = (navigator as Navigator & { connection?: NetworkInformation }).connection;
    if (!conn) return;
    const read = () => setConstrained(Boolean(conn.saveData) || /(^|-)2g$/.test(conn.effectiveType ?? ""));
    read();
    conn.addEventListener("change", read);
    return () => conn.removeEventListener("change", read);
  }, []);
  return constrained;
}

const fallbackTone = {
  pri: "bg-pri-900",
  sec: "bg-sec-900",
  ter: "bg-ter-900",
} as const;

/**
 * Fills its (relatively positioned) parent with a photo, and optionally a
 * muted looping video layered on top.
 *
 * Built for a metered 3G audience:
 *  - the still image loads first and always shows as the poster;
 *  - the video element is only created once the block scrolls into view, and
 *    never when Save-Data is on, the connection is 2G, or motion is reduced;
 *  - it pauses when scrolled out of view.
 *
 * If the image file is missing, a labelled placeholder shows in development and
 * a plain brand-colour panel shows in production.
 */
export function Media({
  slot,
  sizes = "(min-width: 1024px) 40vw, 100vw",
  priority = false,
  tone = "pri",
  className,
  imgClassName,
}: {
  slot: MediaSlot;
  sizes?: string;
  priority?: boolean;
  tone?: keyof typeof fallbackTone;
  className?: string;
  imgClassName?: string;
}) {
  const [imgFailed, setImgFailed] = useState(false);
  const [videoReady, setVideoReady] = useState(false);
  const [armed, setArmed] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const inView = useInView(wrap, { margin: "0px 0px -5% 0px" });
  const reduced = useReducedMotion();
  const constrained = useConstrainedNetwork();
  const canPlay = Boolean(slot.video) && !reduced && !constrained && !imgFailed;

  useEffect(() => {
    if (inView && canPlay) setArmed(true);
  }, [inView, canPlay]);

  useEffect(() => {
    const el = video.current;
    if (!el) return;
    if (inView) el.play().catch(() => {});
    else el.pause();
  }, [inView, armed]);

  return (
    <div ref={wrap} className={cn("absolute inset-0 overflow-hidden", className)}>
      {imgFailed ? (
        <div
          className={cn(
            "absolute inset-0 grid place-items-center [background-image:repeating-linear-gradient(135deg,transparent_0_14px,rgb(255_255_255/0.045)_14px_15px)]",
            fallbackTone[tone],
          )}
        >
          {process.env.NODE_ENV !== "production" && (
            <p className="max-w-[17rem] px-4 text-center text-xs leading-relaxed text-white/70">
              <span className="block font-mono text-white">{slot.src}</span>
              <span className="mt-1 block">{slot.brief}</span>
            </p>
          )}
        </div>
      ) : (
        <Image
          src={slot.src}
          alt={slot.alt}
          fill
          sizes={sizes}
          priority={priority}
          // onError={() => setImgFailed(true)}
          className={cn("object-cover", imgClassName)}
        />
      )}

      {armed && canPlay && (
        <video
          ref={video}
          muted
          loop
          playsInline
          autoPlay
          preload="metadata"
          aria-hidden
          onCanPlay={() => setVideoReady(true)}
          onError={() => setArmed(false)}
          className={cn("absolute inset-0 h-full w-full object-cover transition-opacity duration-700", videoReady ? "opacity-100" : "opacity-0")}
        >
          {slot.videoWebm && <source src={slot.videoWebm} type="video/webm" />}
          {slot.video && <source src={slot.video} type="video/mp4" />}
        </video>
      )}
    </div>
  );
}
