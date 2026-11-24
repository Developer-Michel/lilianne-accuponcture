import type { Context } from "@netlify/functions";

function jsonResponse(
  body: { error: string } | { success: true },
  status = 200,
) {
  return Response.json(body, {
    status,
    headers: { "Cache-Control": "no-store" },
  });
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isEmail(value: string) {
  return value.length <= 254 && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

export default async function sendContactEmail(
  request: Request,
  _context: Context,
): Promise<Response> {
  if (request.method !== "POST") {
    return jsonResponse({ error: "Method not allowed." }, 405);
  }

  const origin = request.headers.get("origin");
  if (origin) {
    try {
      if (new URL(origin).origin !== new URL(request.url).origin) {
        return jsonResponse({ error: "Origin not allowed." }, 403);
      }
    } catch {
      return jsonResponse({ error: "Invalid origin." }, 403);
    }
  }

  const apiKey = process.env.RESEND_API_KEY;
  const from = process.env.RESEND_FROM_EMAIL;
  const to = process.env.CONTACT_TO_EMAIL;
  if (!apiKey || !from || !to) {
    console.error(
      "Missing Netlify email configuration: RESEND_API_KEY, RESEND_FROM_EMAIL, or CONTACT_TO_EMAIL.",
    );
    return jsonResponse({ error: "Email service is not configured." }, 500);
  }

  let payload: unknown;
  try {
    payload = await request.json();
  } catch {
    return jsonResponse({ error: "Request body must be valid JSON." }, 400);
  }

  if (!isRecord(payload)) {
    return jsonResponse({ error: "Invalid contact form data." }, 400);
  }

  const { name: rawName, email: rawEmail, message: rawMessage } = payload;
  if (
    typeof rawName !== "string" ||
    typeof rawEmail !== "string" ||
    typeof rawMessage !== "string"
  ) {
    return jsonResponse({ error: "All contact form fields are required." }, 400);
  }

  const name = rawName.trim();
  const email = rawEmail.trim();
  const message = rawMessage.trim();
  if (
    name.length === 0 ||
    name.length > 100 ||
    !isEmail(email) ||
    message.length === 0 ||
    message.length > 3000
  ) {
    return jsonResponse({ error: "Contact form data is invalid." }, 400);
  }

  try {
    const resendResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        from,
        to: [to],
        reply_to: email,
        subject: "New contact form message",
        text: `Name: ${name}\nEmail: ${email}\n\n${message}`,
      }),
    });

    if (!resendResponse.ok) {
      console.error(
        `Resend rejected the contact email with status ${resendResponse.status}.`,
      );
      return jsonResponse({ error: "Unable to send your message." }, 502);
    }
  } catch (error) {
    console.error("Resend email request failed:", error);
    return jsonResponse({ error: "Unable to send your message." }, 502);
  }

  return jsonResponse({ success: true });
}
