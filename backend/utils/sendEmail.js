// Resend HTTP API (Render free tier me SMTP ports blocked hain, isliye Nodemailer nahi)
export const sendEmail = async ({ email, subject, message }) => {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured");
  }

  const response = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from: "Portfolio <onboarding@resend.dev>",
      to: [email],
      subject,
      text: message,
    }),
  });

  if (!response.ok) {
    throw new Error(`Resend API ${response.status}: ${await response.text()}`);
  }
};