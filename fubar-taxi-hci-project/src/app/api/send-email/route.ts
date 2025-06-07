//mora biti ovakav folder
import { NextResponse } from "next/server";
const nodemailer = require("nodemailer");

export async function POST(request: Request) {
  const body = await request.json();

  const formMessage = body.message;

  const message = {
    from: process.env.EMAIL_FROM,
    to: process.env.EMAIL_FROM,
    subject: "Mail poslan preko FUBAR stranice",
    html: `
        <p>
          Mail poslao: ${body.email}
        </p>
        <p>
            Sadržaj poruke: 
            <br />
            <br />
            ${formMessage}
        </p>`,
    headers: {
      "X-Entity-Ref-ID": "newmail",
    },
  };

  var transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_FROM,
      pass: process.env.PASS,
    },
    tls: {
      // do not fail on invalid certs
      rejectUnauthorized: false,
    },
  });

  try {
    await transporter.sendMail(message);
    return NextResponse.json(
      { message: "Email Sent Successfully" },
      { status: 200 }
    );
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
