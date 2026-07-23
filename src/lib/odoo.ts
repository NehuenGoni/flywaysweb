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

/** Create a `crm.lead` in Odoo from a normalized lead. Throws on failure. */
export async function createOdooLead(lead: NormalizedLead): Promise<void> {
  const config = getConfig();
  if (!config) {
    throw new Error("Odoo is not configured (missing ODOO_* env vars)");
  }
  const { url, db, login, apiKey } = config;

  const uid = await jsonRpcCall<number | false>(url, "common", "authenticate", [
    db,
    login,
    apiKey,
    {},
  ]);
  if (!uid) {
    throw new Error("Odoo authentication failed — check ODOO_DB/ODOO_LOGIN/ODOO_API_KEY");
  }

  // NOTE: country/state are currently folded into `description` as free text.
  // Mapping them to res.country / res.country.state IDs (country_id /
  // state_id on crm.lead) would need a name -> id lookup and is left as a
  // follow-up once Odoo's country list is confirmed.
  await jsonRpcCall(url, "object", "execute_kw", [
    db,
    uid,
    apiKey,
    "crm.lead",
    "create",
    [
      {
        name: `Website lead — ${lead.contactName}`,
        contact_name: lead.contactName,
        email_from: lead.email,
        phone: lead.phone,
        description: lead.description,
        // Free-text page path the lead came from (e.g. "/contact").
        ...(lead.source ? { referred: lead.source } : {}),
      },
    ],
  ]);
}
