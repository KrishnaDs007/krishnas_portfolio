"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Send,
  MessageSquare,
  Loader2,
} from "lucide-react";
import { contactInfo } from "@/lib/constants";
import { sendEmail } from "@/app/actions/send-email";

export function Contact() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Project Discussion",
    message: "",
  });
  const [customSubject, setCustomSubject] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [quickMessage, setQuickMessage] = useState("");

  const handleQuickMail = (e: React.FormEvent) => {
    e.preventDefault();
    if (!quickMessage.trim()) return;
    const subject = encodeURIComponent("Quick Collaboration / Inquiry");
    const body = encodeURIComponent(quickMessage);
    window.location.href = `mailto:${contactInfo.email}?subject=${subject}&body=${body}`;
    setQuickMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    // Determine the final subject to use
    const finalSubject =
      formData.subject === "Other" ? customSubject : formData.subject;

    try {
      const result = await sendEmail({
        ...formData,
        subject: finalSubject,
      });

      if (result.success) {
        // Show success message
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 5000);

        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "Project Discussion",
          message: "",
        });
        setCustomSubject("");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch {
      setError("Failed to send message. Please check your connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleWhatsApp = () => {
    const message = encodeURIComponent(
      `Hi Krishna, I'd like to discuss a project with you.`,
    );
    window.open(
      `https://wa.me/${contactInfo.whatsapp}?text=${message}`,
      "_blank",
    );
  };

  const handleCall = () => {
    window.location.href = `tel:${contactInfo.phone}`;
  };

  return (
    <section
      id="contact"
      className="flex items-center bg-gradient-to-b from-background to-accent/20 py-12 sm:py-14 lg:min-h-screen lg:py-20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Quick Action Section */}
          <div className="mb-10 border-t border-border/50 pt-10 sm:mb-12 sm:pt-12 lg:mb-20 lg:pt-20">
            <div className="relative group">
              {/* Background Glow */}
              <div className="absolute -inset-1 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl blur opacity-10 group-hover:opacity-20 transition duration-1000 group-hover:duration-200"></div>

              <div className="relative overflow-hidden rounded-xl border border-border bg-card/60 p-5 backdrop-blur-md sm:p-8 md:p-10 lg:rounded-2xl lg:p-12">
                {/* Decorative Orbs */}
                <div className="relative grid items-center gap-6 md:grid-cols-[1fr_auto] lg:gap-8">
                  <div>
                    <h2 className="mb-3 text-2xl font-bold sm:text-3xl md:mb-4 md:text-4xl">
                      Have a bold idea?{" "}
                      <span className="text-primary">Let&apos;s build it.</span>
                    </h2>
                    <p className="max-w-xl text-base text-muted-foreground sm:text-lg">
                      Whether you want to collaborate on a game changing project
                      or just have an impressive project idea drop it below. I
                      will make it a reality for you.
                    </p>
                  </div>

                  <form
                    onSubmit={handleQuickMail}
                    className="w-full max-w-md space-y-4"
                  >
                    <div className="relative">
                      <textarea
                        value={quickMessage}
                        onChange={(e) => setQuickMessage(e.target.value)}
                        aria-label="Quick project message"
                        placeholder="What should we create together?..."
                        required
                        rows={3}
                        className="w-full resize-none rounded-xl border border-border bg-background/80 px-4 py-3 pr-14 text-base text-foreground transition-all focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/50 sm:px-5 sm:py-4 sm:text-lg"
                      />
                      <button
                        type="submit"
                        className="absolute bottom-4 right-4 p-2.5 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 hover:scale-105 active:scale-95 transition-all shadow-lg shadow-primary/20"
                        title="Send via Email"
                        aria-label="Send quick message by email"
                      >
                        <Send className="h-5 w-5" />
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>

          {/* Section Header */}
          <div className="mb-8 text-center sm:mb-10 lg:mb-16">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              Get In Touch
            </p>
            <h2 className="mb-4 text-3xl font-bold sm:text-4xl md:text-5xl lg:mb-6 lg:text-6xl">
              Let&apos;s Work <span className="text-primary">Together</span>
            </h2>
            <p className="mx-auto max-w-2xl text-base text-muted-foreground sm:text-lg">
              Have a project in mind? Looking for a senior frontend partner?
              Drop me a line.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="rounded-xl border border-border bg-card/50 p-5 backdrop-blur-sm sm:p-8 md:p-10 lg:rounded-2xl">
              {showSuccess && (
                <div
                  className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-800 dark:text-green-200 animate-fade-in"
                  role="status"
                  aria-live="polite"
                >
                  Message sent successfully! I&apos;ll get back to you soon.
                </div>
              )}

              {error && (
                <div
                  className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-700 dark:text-red-200 animate-fade-in"
                  role="alert"
                >
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                {/* Name and Email Row */}
                <div className="grid gap-4 md:grid-cols-2 md:gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-3"
                    >
                      Your Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50"
                      placeholder="John Doe"
                    />
                  </div>

                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-3"
                    >
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50"
                      placeholder="you@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label
                    htmlFor="subject"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-3"
                  >
                    Subject
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground"
                  >
                    <option>General Inquiry</option>
                    <option>Project Discussion</option>
                    <option>Job Opportunity</option>
                    <option>Collaboration</option>
                    <option>Other</option>
                  </select>
                </div>

                {/* Custom Subject Input - Shows when "Other" is selected */}
                {formData.subject === "Other" && (
                  <div className="animate-fade-in-up">
                    <label
                      htmlFor="customSubject"
                      className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-3"
                    >
                      Please specify your subject
                    </label>
                    <input
                      type="text"
                      id="customSubject"
                      name="customSubject"
                      value={customSubject}
                      onChange={(e) => setCustomSubject(e.target.value)}
                      required
                      className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-foreground placeholder:text-muted-foreground/50"
                      placeholder="Enter your subject..."
                    />
                  </div>
                )}

                {/* Message */}
                <div>
                  <label
                    htmlFor="message"
                    className="mb-2 block text-xs font-semibold uppercase tracking-wider text-muted-foreground sm:mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={5}
                    className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-foreground placeholder:text-muted-foreground/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-700 to-pink-700 hover:from-red-800 hover:to-pink-800 text-white rounded-lg transition-all font-semibold text-base shadow-lg shadow-red-700/25 disabled:opacity-70 disabled:cursor-not-allowed group"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="h-5 w-5 animate-spin" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-4 sm:space-y-6">
              {/* Contact Info Cards */}
              <div className="space-y-3 sm:space-y-4">
                {/* Email */}
                <div className="group rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                      <Mail className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Email
                      </p>
                      <a
                        href={`mailto:${contactInfo.email}`}
                        className="text-foreground font-medium hover:text-primary transition-colors break-all"
                      >
                        {contactInfo.email}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Phone */}
                <div className="group rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                      <Phone className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Phone
                      </p>
                      <a
                        href={`tel:${contactInfo.phone}`}
                        className="text-foreground font-medium hover:text-primary transition-colors"
                      >
                        {contactInfo.phone}
                      </a>
                    </div>
                  </div>
                </div>

                {/* Location */}
                <div className="group rounded-xl border border-border bg-card/50 p-4 backdrop-blur-sm transition-all hover:border-primary/50 hover:bg-card/80 sm:p-6">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-red-500/10 rounded-lg group-hover:bg-red-500/20 transition-colors">
                      <MapPin className="h-6 w-6 text-red-500" />
                    </div>
                    <div className="flex-1">
                      <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-2">
                        Location
                      </p>
                      <p className="text-foreground font-medium">
                        {contactInfo.location}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct Contact Buttons */}
              <div className="rounded-xl border border-border bg-accent/30 p-4 backdrop-blur-sm sm:p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  Or Connect Instantly
                </p>
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-[#0B6B2B] hover:bg-[#095923] text-white rounded-lg transition-all font-semibold shadow-lg shadow-green-500/20"
                    aria-label="Contact me on WhatsApp"
                  >
                    <MessageSquare className="h-5 w-5" />
                    WhatsApp
                  </button>

                  {/* Call */}
                  <button
                    onClick={handleCall}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-red-700/10 to-pink-700/10 border-2 border-red-700 text-red-700 hover:bg-gradient-to-r hover:from-red-800 hover:to-pink-800 hover:text-white rounded-lg transition-all font-semibold dark:border-red-400 dark:text-red-200"
                    aria-label="Call me"
                  >
                    <Phone className="h-5 w-5" />
                    Call Me
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
