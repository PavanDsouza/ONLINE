
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      await resend.emails.send({
        from: "onboarding@resend.dev",
        to: "YOUR_EMAIL@gmail.com",  // <-- CHANGE THIS
        subject: "She clicked YES 😌",
        html: `
          <h2>YES was clicked ❤️</h2>
          <p>Time: ${new Date().toISOString()}</p>
        `,
      });

      return res.status(200).json({ message: "Email sent successfully!" });
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Email failed to send." });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
