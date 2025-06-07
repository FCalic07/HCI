// src/app/api/send-email/route.ts mora bit ovakav folder

import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  const body = await request.json();

  const formMessage: string = body.message;
  const senderEmail: string = body.email;

  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: "Mail poslan preko FUBAR stranice",
    html: `
      <p>Mail poslao: ${senderEmail}</p>
      <p>Sadržaj poruke:<br /><br />${formMessage}</p>
    `,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASS,
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(message);
    return NextResponse.json({ message: "Email Sent Successfully" }, { status: 200 });
  } catch (err) {
    const error = err as Error;
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
