"use server";

import React from "react";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { contactInfo } from "@/lib/constants";

export async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.error(
      "❌ ERROR: RESEND_API_KEY is missing or not set in .env file.",
    );
    return {
      success: false,
      error: "API Configuration error. Please check server logs.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    const { name, email, subject, message } = formData;
    console.log(`📨 Attempting to send email from ${name} (${email})...`);

    const data = await resend.emails.send({
      from: "Portfolio <onboarding@resend.dev>",
      to: [contactInfo.email],
      subject: `[Portfolio] ${subject}: from ${name}`,
      react: (
        <EmailTemplate
          name={name}
          email={email}
          subject={subject}
          message={message}
        />
      ),
      replyTo: email,
    });

    if (data.error) {
      console.error("❌ Resend API Error:", data.error);
      return { success: false, error: data.error.message };
    }

    console.log("✅ Email sent successfully!", data);
    return { success: true, data };
  } catch (error: any) {
    console.error("❌ Server Action Error:", error);
    return { success: false, error: error?.message || "Internal server error" };
  }
}
