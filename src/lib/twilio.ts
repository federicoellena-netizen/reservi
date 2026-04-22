const TWILIO_SID = process.env.TWILIO_ACCOUNT_SID!;
const TWILIO_TOKEN = process.env.TWILIO_AUTH_TOKEN!;
const TWILIO_FROM = process.env.TWILIO_WHATSAPP_NUMBER || "+14155238886";

export async function sendWhatsApp(to: string, body: string) {
  // Normalizza il numero
  const toNum = to.startsWith("+") ? to : `+${to}`;

  const params = new URLSearchParams();
  params.append("From", `whatsapp:${TWILIO_FROM}`);
  params.append("To", `whatsapp:${toNum}`);
  params.append("Body", body);

  const response = await fetch(
    `https://api.twilio.com/2010-04-01/Accounts/${TWILIO_SID}/Messages.json`,
    {
      method: "POST",
      headers: {
        Authorization: `Basic ${Buffer.from(`${TWILIO_SID}:${TWILIO_TOKEN}`).toString("base64")}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    }
  );

  const data = await response.json();

  if (!response.ok) {
    console.error("Errore invio WhatsApp:", data);
    throw new Error(data.message || "Errore invio WhatsApp");
  }

  return data;
}
