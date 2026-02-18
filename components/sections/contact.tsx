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
    subject: "General Inquiry",
    message: "",
  });
  const [customSubject, setCustomSubject] = useState("");
  const [showSuccess, setShowSuccess] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

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
          subject: "General Inquiry",
          message: "",
        });
        setCustomSubject("");
      } else {
        setError("Something went wrong. Please try again later.");
      }
    } catch (err) {
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
      className="min-h-screen flex items-center py-20 bg-gradient-to-b from-background to-accent/20"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <p className="text-sm text-primary font-semibold uppercase tracking-[0.2em] mb-3">
              Get In Touch
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
              Let's Work <span className="text-primary">Together</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Have a project in mind? Looking for a senior frontend partner?
              Drop me a line.
            </p>
          </div>

          <div className="grid lg:grid-cols-[1.2fr_1fr] gap-8 lg:gap-12">
            {/* Contact Form */}
            <div className="bg-card/50 backdrop-blur-sm border border-border rounded-2xl p-8 md:p-10">
              {showSuccess && (
                <div className="mb-6 p-4 bg-green-500/10 border border-green-500/20 rounded-lg text-green-600 dark:text-green-400 animate-fade-in">
                  Message sent successfully! I'll get back to you soon.
                </div>
              )}

              {error && (
                <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg text-red-600 dark:text-red-400 animate-fade-in">
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name and Email Row */}
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Name */}
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
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
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
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
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
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
                      className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
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
                    className="block text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-3"
                  >
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="w-full px-4 py-3.5 bg-background/80 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none text-foreground placeholder:text-muted-foreground/50"
                    placeholder="Tell me about your project..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex items-center justify-center gap-2 px-6 py-4 bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white rounded-lg transition-all font-semibold text-base shadow-lg shadow-red-500/25 disabled:opacity-70 disabled:cursor-not-allowed group"
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
            <div className="space-y-6">
              {/* Contact Info Cards */}
              <div className="space-y-4">
                {/* Email */}
                <div className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all">
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
                <div className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all">
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
                <div className="group bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/50 hover:bg-card/80 transition-all">
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
              <div className="bg-accent/30 backdrop-blur-sm border border-border rounded-xl p-6">
                <p className="text-xs font-semibold uppercase tracking-wider text-muted-foreground mb-5">
                  Or Connect Instantly
                </p>
                <div className="space-y-3">
                  {/* WhatsApp */}
                  <button
                    onClick={handleWhatsApp}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-[#25D366] hover:bg-[#20BA5A] text-white rounded-lg transition-all font-semibold shadow-lg shadow-green-500/20"
                  >
                    <MessageSquare className="h-5 w-5" />
                    WhatsApp
                  </button>

                  {/* Call */}
                  <button
                    onClick={handleCall}
                    className="w-full flex items-center justify-center gap-3 px-5 py-3.5 bg-gradient-to-r from-red-500/10 to-pink-500/10 border-2 border-red-500 text-red-500 hover:bg-gradient-to-r hover:from-red-500 hover:to-pink-500 hover:text-white rounded-lg transition-all font-semibold"
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
