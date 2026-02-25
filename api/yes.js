export default async function handler(req, res) {
  if (req.method === "POST") {
    try {
      const response = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${process.env.RESEND_API_KEY}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          from: "onboarding@resend.dev",
          to: "YOUR_EMAIL@gmail.com",
          subject: "She clicked YES 😌",
          html: `
            <h2>YES was clicked ❤️</h2>
            <p>Time: ${new Date().toISOString()}</p>
          `
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(JSON.stringify(data));
      }

      return res.status(200).json({ message: "Email sent!" });

    } catch (error) {
      console.error("ERROR:", error);
      return res.status(500).json({ error: "Email failed" });
    }
  }

  return res.status(405).json({ message: "Method not allowed" });
}
