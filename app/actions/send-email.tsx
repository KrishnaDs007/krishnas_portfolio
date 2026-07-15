"use server";

import React from "react";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { contactInfo } from "@/lib/constants";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function sendEmail(formData: {
  name: string;
  email: string;
  subject: string;
  message: string;
}) {
  const name = formData.name.trim();
  const email = formData.email.trim();
  const subject = formData.subject.trim();
  const message = formData.message.trim();

  if (name.length < 2 || name.length > 100) {
    return { success: false, error: "Please enter a valid name." };
  }

  if (!emailPattern.test(email) || email.length > 254) {
    return { success: false, error: "Please enter a valid email address." };
  }

  if (subject.length < 2 || subject.length > 120) {
    return { success: false, error: "Please enter a valid subject." };
  }

  if (message.length < 10 || message.length > 5000) {
    return {
      success: false,
      error: "Please enter a message between 10 and 5000 characters.",
    };
  }

  const apiKey = process.env.RESEND_API_KEY;

  if (!apiKey || apiKey === "re_your_api_key_here") {
    console.error("ERROR: RESEND_API_KEY is missing or not set.");
    return {
      success: false,
      error: "API Configuration error. Please check server logs.",
    };
  }

  const resend = new Resend(apiKey);

  try {
    console.log(`Attempting to send email from ${name} (${email})...`);

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
      console.error("Resend API Error:", data.error);
      return { success: false, error: data.error.message };
    }

    console.log("Email sent successfully.", data);
    return { success: true, data };
  } catch (error: unknown) {
    const message =
      error instanceof Error ? error.message : "Internal server error";

    console.error("Server Action Error:", error);
    return { success: false, error: message };
  }
}
