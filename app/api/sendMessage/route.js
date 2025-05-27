import { NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend("re_8fJ82Ngg_AViFxo4R7qhT4Nx8HAPAr9b2");

export async function POST(req) {
  try {
    const body = await req.json();
    const { email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: "Portfolio Contact Form <darshanwijayakumar0@gmail.com>",
      to: [process.env.MY_EMAIL],
      subject,
      reply_to: email,
      text: message,
    });

    return NextResponse.json(data);
  } catch (error) {
    console.error("Email send error:", error);
    return NextResponse.json(
      { error: error.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}
