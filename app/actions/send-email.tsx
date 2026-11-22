"use server";

import React from "react";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/email-template";
import { contactInfo } from "@/lib/constants";
import { getContactMessageError } from "@/lib/contact-message";
import { allowContactSubmission } from "@/lib/contact-rate-limit";

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const deliveryFailure = { success: false, error: "Something went wrong. Please try again later." } as const;

type ContactSubmission = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

type ContactResult = { success: true } | { success: false; error: string };

export async function sendEmail(formData: ContactSubmission): Promise<ContactResult> {
  if (
    !formData ||
    typeof formData.name !== "string" ||
    typeof formData.email !== "string" ||
    typeof formData.subject !== "string" ||
    typeof formData.message !== "string"
  ) {
    return { success: false, error: "Please check your contact form fields." };
  }

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

  const messageError = getContactMessageError(formData.message);
  if (messageError) {
    return { success: false, error: messageError };
  }

  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL?.trim();
  const toEmail = process.env.CONTACT_TO_EMAIL?.trim() || contactInfo.email;

  if (!apiKey || apiKey === "your_resend_api_key_here" || apiKey === "re_your_api_key_here") {
    console.error("ERROR: RESEND_API_KEY is missing or not set.");
    return deliveryFailure;
  }

  if (!fromEmail || !emailPattern.test(fromEmail) || !emailPattern.test(toEmail)) {
    console.error("Contact email sender or recipient is invalid.");
    return deliveryFailure;
  }

  try {
    if (!(await allowContactSubmission())) {
      return { success: false, error: "Too many messages. Please try again in a few minutes." };
    }
  } catch {
    console.error("Contact rate limiter is unavailable or misconfigured.");
    return deliveryFailure;
  }

  try {
    const resend = new Resend(apiKey);
    const { error } = await resend.emails.send({
      from: `Portfolio <${fromEmail}>`,
      to: [toEmail],
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

    if (error) {
      console.error("Resend rejected contact email:", error.name);
      return deliveryFailure;
    }

    return { success: true };
  } catch {
    console.error("Resend contact request failed.");
    return deliveryFailure;
  }
}
