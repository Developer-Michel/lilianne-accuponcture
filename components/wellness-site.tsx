"use client";

import Image from "next/image";
import { ArrowDown, ArrowUpRight, Sprout, Heart, Sun } from "lucide-react";
import {
  motion,
  MotionConfig,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, type ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { LocationsSection } from "@/components/locations-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { translations, type Locale } from "@/lib/translations";
import { BOOKING_URL } from "@/lib/links";

function Reveal({
  children,
  className,
  delay = 0,
  fromLeft = false,
  duration,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  fromLeft?: boolean;
  duration?: number;
}) {
  const reduced = useReducedMotion();
  return (
    <motion.div
      className={className}
      initial={
        reduced
          ? false
          : { opacity: 0, x: fromLeft ? -28 : 0, y: fromLeft ? 0 : 22 }
      }
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{
        duration: duration ?? (fromLeft ? 2 : 0.85),
        delay,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export function WellnessSite({ locale }: { locale: Locale }) {
  const copy = translations[locale];
  const heroRevealDuration = 1.35;
  const reduced = useReducedMotion();
  const { scrollY } = useScroll();
  const maxHeroBlurPx = 7;
  const heroImageBlurPx = useTransform(scrollY, [0, 1400], [0, maxHeroBlurPx], {
    clamp: true,
  });
  const heroImageBlur = useMotionTemplate`blur(${heroImageBlurPx}px)`;
  const valueIcons = [Sprout, Heart, Sun];
  // useEffect(() => {
  //   if (!window.location.hash) return;
  //   const { pathname, search } = window.location;
  //   history.replaceState(null, "", `${pathname}${search}`);
  //   requestAnimationFrame(() =>
  //     window.scrollTo({ top: 0, left: 0, behavior: "auto" }),
  //   );
  // }, []);
  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader copy={copy} locale={locale} />
      <main id="main">
        <div className="hero-visual">
          <motion.div
            className="hero-image-layer"
            style={{
              filter: reduced ? "blur(0px)" : heroImageBlur,
            }}
          >
            <Image
              src="/images/hero-background.png"
              alt={copy.heroImageAlt}
              fill
              priority
              sizes="100vw"
              className="hero-image"
            />
          </motion.div>
          {/* <div className="hero-image-note">
            <span />
            {copy.imageNote}
          </div> */}
        </div>
        <section className="hero">
          <div className="hero-content container">
            {/* <Reveal duration={heroRevealDuration}>
              <p className="eyebrow hero-eyebrow">
                <span />
                {copy.heroEyebrow}
              </p>
            </Reveal> */}
            <Reveal
              delay={0.08}
              className="hero-title"
              duration={heroRevealDuration}
            >
              <h1 style={{ width: "100%" }}>
                <span>{copy.heroTitle}</span>
                <br></br>
                <span className="hero-title-shift">
                  <em>{copy.heroTitle2}</em>
                </span>
              </h1>
            </Reveal>
            <Reveal delay={0.16} duration={heroRevealDuration}>
              <p className="hero-description">{copy.heroDescription}</p>
            </Reveal>
            <Reveal
              delay={0.24}
              className="hero-actions"
              duration={heroRevealDuration}
            >
              <a
                href={BOOKING_URL}
                className={cn(buttonVariants({ size: "lg" }), "hero-book")}
                target="_blank"
                rel="noreferrer"
              >
                {copy.book}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Reveal>

            <a href="#approach" className="hero-scroll">
              <span className="scroll-circle">
                <ArrowDown size={15} strokeWidth={1.3} />
              </span>
              {copy.scroll}
            </a>
          </div>
        </section>
        <div className="values-strip">
          <div className="container values-inner">
            {copy.values.map((text, index) => {
              const Icon = valueIcons[index];
              return (
                <span key={text}>
                  <Icon size={22} strokeWidth={1.1} aria-hidden="true" />
                  {text}
                </span>
              );
            })}
          </div>
        </div>

        <section
          id="approach"
          className="section-pad approach-section background-cover-full"
        >
          <div className="container approach-grid">
            <Reveal className="approach-image image-wrap">
              <Image
                src="/images/lilianne-treatment2.jpg"
                alt={copy.treatmentAlt}
                fill
                sizes="(max-width: 767px) calc(100vw - 44px), 45vw"
              />
            </Reveal>
            <Reveal className="approach-copy" delay={0.1}>
              <h2>
                {copy.introTitle}
                {copy.introItalic && (
                  <>
                    <br />
                    <em>{copy.introItalic}</em>
                  </>
                )}
              </h2>
              <p className="body-copy">{copy.introBody}</p>
              {copy.introBody2 && (
                <p className="body-copy">{copy.introBody2}</p>
              )}
              <a href={`/${locale}/acupuncture`} className="text-link">
                {copy.introLink}
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        <section
          id="practitioner"
          className="section-pad practitioner-section background-cover"
        >
          <div className="container practitioner-grid">
            <Reveal>
              <p className="eyebrow">{copy.practitionerEyebrow}</p>
              <h2>
                {copy.practitionerTitle}
                <br />
                <em>{copy.practitionerItalic}</em>
              </h2>
              <p className="body-copy">{copy.practitionerBody}</p>
              {copy.practitionerBody2 && (
                <p className="body-copy">{copy.practitionerBody2}</p>
              )}
            </Reveal>
            <Reveal className="practitioner-profile">
              <div className="practitioner-portrait image-wrap">
                <Image
                  src="/images/lilianne-portrait.jpg"
                  alt={copy.portraitAlt}
                  fill
                  sizes="(max-width: 767px) 320px, 40vw"
                  style={{ objectFit: "cover", objectPosition: "center 15%" }}
                />
              </div>
            </Reveal>
          </div>
        </section>

        <section id="benefits" className="benefits-section section-pad">
          <div className="container">
            <Reveal className="section-heading centered">
              <h2>{copy.benefitsTitle}</h2>
              <p className="body-copy">
                {copy.benefitsDescriptionBeforeContact}
                <a className="benefits-contact-link" href="#contact">
                  {copy.benefitsContact}
                </a>
                {copy.benefitsDescriptionAfterContact}
              </p>
            </Reveal>
            <div className="benefits-grid">
              {copy.benefits.map((benefit, index) => {
                return (
                  <Reveal
                    className="benefit"
                    key={benefit}
                    delay={(index % 3) * 0.06}
                  >
                    <h3>{benefit}</h3>
                  </Reveal>
                );
              })}
            </div>
            <Reveal>
              <p className="benefits-more">{copy.benefitsMore}</p>
            </Reveal>
            {copy.medicalNote && (
              <p className="medical-note">{copy.medicalNote}</p>
            )}
          </div>
        </section>

        <section
          id="treatments"
          className="section-pad services-section background-cover-full"
        >
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="eyebrow">{copy.servicesEyebrow}</p>
              <h2>{copy.servicesTitle}</h2>
            </Reveal>
            <div className="service-cards">
              {copy.serviceOfferings.map((service, index) => (
                <Reveal className="service-card" key={service.title}>
                  <a
                    href={`/${locale}/services/${service.id}`}
                    className="service-card-link"
                  >
                    <div className="service-card-image image-wrap">
                      <Image
                        src={service.image}
                        alt={service.imageAlt}
                        fill
                        sizes="(max-width: 767px) calc(100vw - 44px), 45vw"
                      />
                    </div>
                    <div className="service-card-content">
                      <p className="eyebrow">0{index + 1}</p>
                      <h3>{service.title}</h3>
                      <p className="service-description">
                        {service.description}
                      </p>
                      <div
                        className="service-price-groups"
                        id={index === 0 ? "pricing" : undefined}
                      >
                        {service.priceGroups.map((group) => (
                          <div
                            className="service-price-group"
                            key={group.title}
                          >
                            <h4>{group.title}</h4>
                            <dl>
                              {group.prices.map(([label, price]) => (
                                <div key={label}>
                                  <dt>{label}</dt>
                                  <dd>{price}</dd>
                                </div>
                              ))}
                            </dl>
                          </div>
                        ))}
                      </div>
                    </div>
                    <div className="service-card-hover">
                      <span className="learn-more-text">{copy.learnMore}</span>
                    </div>
                  </a>
                  <div className="service-actions">
                    <a
                      href={BOOKING_URL}
                      className="service-card-booking text-link"
                      target="_blank"
                      rel="noreferrer"
                    >
                      {copy.book}
                      <ArrowUpRight size={16} />
                    </a>
                    <a
                      href={`/${locale}/services/${service.id}`}
                      className="service-card-learn-more text-link"
                    >
                      {copy.learnMore}
                      <ArrowUpRight size={16} />
                    </a>
                  </div>
                </Reveal>
              ))}
            </div>
            <p className="service-note">{copy.serviceDiscountNote}</p>
            <p className="service-note">{copy.serviceReceiptNote}</p>
          </div>
        </section>

        <section id="faq" className="section-pad faq-section background-cover">
          <div className="container faq-grid">
            <Reveal fromLeft>
              <h2>{copy.faqTitle}</h2>
              <p className="faq-contact-prompt">{copy.faqContactPrompt}</p>
              {/* <p className="faq-decoration" aria-hidden="true">
                ?
              </p> */}
            </Reveal>

            <Accordion>
              {copy.faqs.map(([question, answer], index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <AccordionItem value={`faq-${index}`}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>
                      {typeof answer === "string" ? (
                        <p>{answer}</p>
                      ) : (
                        <p>
                          {answer.text}
                          <a
                            href={answer.href}
                            target="_blank"
                            rel="noreferrer"
                          >
                            {answer.linkText}
                          </a>
                          . {answer.phoneText}
                          <a href={answer.phoneHref}>{answer.phoneDisplay}</a>.
                        </p>
                      )}
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </section>
        <LocationsSection copy={copy} />
        <ContactSection copy={copy} locale={locale} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </MotionConfig>
  );
}
