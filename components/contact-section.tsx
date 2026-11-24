"use client";

import { useState, type FormEvent } from "react";
import {
  ArrowUpRight,
  CalendarIcon,
  Mail,
  Phone,
} from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { BOOKING_URL } from "@/lib/links";
import type { Copy, Locale } from "@/lib/translations";

type SubmissionStatus = "idle" | "sending" | "success" | "error";

export function ContactSection({
  copy,
  locale,
}: {
  copy: Copy;
  locale: Locale;
}) {
  const [submissionStatus, setSubmissionStatus] =
    useState<SubmissionStatus>("idle");

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const name = data.get("name");
    const email = data.get("email");
    const message = data.get("message");

    if (
      typeof name !== "string" ||
      typeof email !== "string" ||
      typeof message !== "string"
    ) {
      setSubmissionStatus("error");
      return;
    }

    setSubmissionStatus("sending");
    try {
      const response = await fetch(
        "/.netlify/functions/send-contact-email",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, message }),
        },
      );
      if (!response.ok) {
        throw new Error(`Contact function returned ${response.status}`);
      }
      form.reset();
      setSubmissionStatus("success");
    } catch (error) {
      console.error("Contact form submission failed:", error);
      setSubmissionStatus("error");
    }
  }

  return (
    <section id="contact" className="contact-section section-pad">
      <div className="container contact-grid">
        <div>
          <h2>Contact</h2>
          <div className="contact-details">
            <div className="contact-detail">
              <Phone size={19} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span className="eyebrow">
                  {locale === "fr" ? "TÉLÉPHONE" : "PHONE"}
                </span>
                <p>
                  <a href="tel:+18663868722">+1 866-386-8722</a>
                </p>
              </div>
            </div>
            <div className="contact-detail">
              <Mail size={19} strokeWidth={1.3} aria-hidden="true" />
              <div>
                <span className="eyebrow">
                  {locale === "fr" ? "COURRIEL" : "EMAIL"}
                </span>
                <p>
                  <a href="mailto:lilianne.dorais.ac@hotmail.com">
                    lilianne.dorais.ac@hotmail.com
                  </a>
                </p>
              </div>
            </div>
          </div>
          <a
            href={BOOKING_URL}
            className={`${buttonVariants({ size: "lg" })} contact-book`}
            target="_blank"
            rel="noreferrer"
          >
            <CalendarIcon />
            {copy.book}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </div>
        <form onSubmit={submit} className="contact-form">
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="name">{copy.name}</FieldLabel>
              <Input
                id="name"
                name="name"
                required
                maxLength={100}
                pattern=".*\S.*"
                autoComplete="name"
                placeholder={copy.namePlaceholder}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="email">{copy.email}</FieldLabel>
              <Input
                id="email"
                name="email"
                required
                maxLength={254}
                type="email"
                autoComplete="email"
                placeholder={copy.emailPlaceholder}
              />
            </Field>
            <Field>
              <FieldLabel htmlFor="message">{copy.message}</FieldLabel>
              <Textarea
                id="message"
                name="message"
                required
                maxLength={3000}
                rows={4}
              />
            </Field>
            <Button
              type="submit"
              size="lg"
              disabled={submissionStatus === "sending"}
            >
              {submissionStatus === "sending"
                ? copy.formSending
                : copy.formAction}
              <ArrowUpRight data-icon="inline-end" />
            </Button>
            {submissionStatus === "success" && (
              <p className="form-status" role="status">
                {copy.formSuccess}
              </p>
            )}
            {submissionStatus === "error" && (
              <p className="form-status form-status-error" role="alert">
                {copy.formError}
              </p>
            )}
          </FieldGroup>
        </form>
      </div>
    </section>
  );
}
