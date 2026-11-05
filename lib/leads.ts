export type LeadType = "investor" | "partner" | "kinmaster_application";

/** "sent" = the server accepted it. "unavailable" = no lead endpoint is configured (or unreachable). */
export type LeadResult = "sent" | "unavailable" | "error";

/**
 * Posts a lead to our own /api/leads route, which forwards it server-side.
 * Never claim success unless this returns "sent".
 */
export async function submitLead(type: LeadType, data: Record<string, string | boolean>): Promise<LeadResult> {
  try {
    const res = await fetch("/api/leads", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ type, data }),
    });
    if (res.ok) return "sent";
    if (res.status === 503) return "unavailable";
    return "error";
  } catch {
    return "unavailable";
  }
}
