import { Resend } from "resend";

export async function POST(req) {
  try {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !subject || !message) {
      return new Response(JSON.stringify({ error: "Alle Felder sind erforderlich." }), { status: 400 });
    }

    const resend = new Resend(process.env.RESEND_API_KEY);

    const response = await resend.emails.send({
        from: "KOKOMO House <onboarding@resend.dev>",  // Verifizierte Sender-Adresse
        to: "michi.mauch@netnode.ch",                  // Deine Empfänger-Adresse
        subject: `Neue Nachricht von ${name}: ${subject}`,
        html: `
          <h2>Neue Nachricht über das Kontaktformular</h2>
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Betreff:</strong> ${subject}</p>
          <p><strong>Nachricht:</strong></p>
          <p>${message}</p>
        `,
        headers: {
          "Reply-To": email,  // Erzwingt die Antwort-Adresse über Header
        },
      });
      
    return new Response(JSON.stringify({ success: "E-Mail erfolgreich gesendet!", response }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Fehler beim Senden der E-Mail." }), { status: 500 });
  }
}
