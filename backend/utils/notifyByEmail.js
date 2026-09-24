// Resend HTTP API se email (Render free tier me SMTP ports blocked hain)
export const notifyByEmail = async ({ senderName, email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.NOTIFY_EMAIL;

  if (!apiKey || !to) {
    console.warn("RESEND_API_KEY / NOTIFY_EMAIL missing — email notification skipped");
    return;
  }

  const safeSubject = String(subject).replace(/[\r\n]+/g, " ").slice(0, 150);

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [to],
      reply_to: email,
      subject: `Portfolio: ${safeSubject}`,
      text: `New message on your portfolio\n\nFrom: ${senderName} <${email}>\nSubject: ${subject}\n\n${message}`,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API ${response.status}: ${await response.text()}`);
  }
};