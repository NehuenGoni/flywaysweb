import type { NormalizedLead } from "@/lib/lead";

/**
 * Minimal Odoo JSON-RPC client — just enough to authenticate and create a
 * `crm.lead`. Server-only: never import this from a Client Component.
 *
 * Odoo's JSON-RPC exposes two "services" we need:
 *  - `common.authenticate(db, login, password, {})` → uid
 *  - `object.execute_kw(db, uid, password, model, method, args)` → result
 * ("password" here is the API key — Odoo accepts an API key wherever a
 * password is expected for RPC auth.)
 *
 * Docs: https://www.odoo.com/documentation/latest/developer/reference/external_api.html
 */

const RPC_TIMEOUT_MS = 8_000;

function getConfig() {
  const url = process.env.ODOO_URL;
  const db = process.env.ODOO_DB;
  const login = process.env.ODOO_LOGIN;
  const apiKey = process.env.ODOO_API_KEY;
  if (!url || !db || !login || !apiKey) return null;
  return { url: url.replace(/\/+$/, ""), db, login, apiKey };
}

/** Whether all four ODOO_* env vars are set. */
export function isOdooConfigured(): boolean {
  return getConfig() !== null;
}

type JsonRpcResponse<T> = { result: T; error?: { message: string; data?: unknown } };

async function jsonRpcCall<T>(url: string, service: string, method: string, args: unknown[]): Promise<T> {
  const res = await fetch(`${url}/jsonrpc`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      jsonrpc: "2.0",
      method: "call",
      params: { service, method, args },
      id: Date.now(),
    }),
    // A hung Odoo instance shouldn't hang the /api/lead request indefinitely.
    signal: AbortSignal.timeout(RPC_TIMEOUT_MS),
  });

  if (!res.ok) {
    throw new Error(`Odoo RPC HTTP error: ${res.status}`);
  }

  const body = (await res.json()) as JsonRpcResponse<T>;
  if (body.error) {
    throw new Error(`Odoo RPC error: ${body.error.message}`);
  }
  return body.result;
}

async function authenticate(config: NonNullable<ReturnType<typeof getConfig>>): Promise<number> {
  const uid = await jsonRpcCall<number | false>(config.url, "common", "authenticate", [
    config.db,
    config.login,
    config.apiKey,
    {},
  ]);
  if (!uid) {
    throw new Error("Odoo authentication failed — check ODOO_DB/ODOO_LOGIN/ODOO_API_KEY");
  }
  return uid;
}

async function searchRead<T>(
  config: NonNullable<ReturnType<typeof getConfig>>,
  uid: number,
  model: string,
  domain: unknown[],
  fields: string[],
): Promise<T[]> {
  return jsonRpcCall<T[]>(config.url, "object", "execute_kw", [
    config.db,
    uid,
    config.apiKey,
    model,
    "search_read",
    [domain, fields],
    { limit: 1 },
  ]);
}

/**
 * Resolves a normalized lead's ISO country/state codes to Odoo's
 * res.country / res.country.state IDs. Best-effort: any failure here just
 * means the lead is created without country_id/state_id, never blocks
 * delivery of the lead itself.
 */
async function resolveGeography(
  config: NonNullable<ReturnType<typeof getConfig>>,
  uid: number,
  countryCode?: string,
  stateCode?: string,
): Promise<{ country_id?: number; state_id?: number }> {
  if (!countryCode || countryCode === "OTHER") return {};

  try {
    const countries = await searchRead<{ id: number }>(
      config,
      uid,
      "res.country",
      [["code", "=", countryCode]],
      ["id"],
    );
    const countryId = countries[0]?.id;
    if (!countryId) return {};

    if (!stateCode) return { country_id: countryId };

    const states = await searchRead<{ id: number }>(
      config,
      uid,
      "res.country.state",
      [
        ["country_id", "=", countryId],
        "|",
        ["code", "=", stateCode],
        ["name", "=", stateCode],
      ],
      ["id"],
    );
    const stateId = states[0]?.id;
    return stateId ? { country_id: countryId, state_id: stateId } : { country_id: countryId };
  } catch (err) {
    console.warn("[odoo] country/state lookup failed, creating lead without it", err);
    return {};
  }
}

/** Create a `crm.lead` in Odoo from a normalized lead. Throws on failure. */
export async function createOdooLead(lead: NormalizedLead): Promise<void> {
  const config = getConfig();
  if (!config) {
    throw new Error("Odoo is not configured (missing ODOO_* env vars)");
  }

  const uid = await authenticate(config);
  const geography = await resolveGeography(config, uid, lead.countryCode, lead.stateCode);

  await jsonRpcCall(config.url, "object", "execute_kw", [
    config.db,
    uid,
    config.apiKey,
    "crm.lead",
    "create",
    [
      {
        name: lead.isNewsletterSignup
          ? `Newsletter signup — ${lead.contactName}`
          : `Website lead — ${lead.contactName}`,
        contact_name: lead.contactName,
        email_from: lead.email,
        ...(lead.phone ? { phone: lead.phone } : {}),
        description: lead.description,
        ...geography,
        // Free-text page path the lead came from (e.g. "/contact").
        ...(lead.source ? { referred: lead.source } : {}),
        // No dedicated CRM field for either of these without confirming the
        // client's tag/stage setup — kept as tags so sales can filter by them.
        ...(lead.experienceOfInterest ? { tag_ids: [[0, 0, { name: lead.experienceOfInterest }]] } : {}),
        ...(lead.isNewsletterSignup ? { tag_ids: [[0, 0, { name: "Newsletter" }]] } : {}),
      },
    ],
  ]);
}
