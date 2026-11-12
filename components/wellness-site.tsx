"use client";

import Image from "next/image";
import {
  ArrowDown,
  ArrowUpRight,
  Sprout,
  Leaf,
  Heart,
  Moon,
  Wind,
  Flower2,
  Waves,
  Sun,
  Globe,
  Link,
} from "lucide-react";
import {
  motion,
  MotionConfig,
  useMotionTemplate,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useEffect, type ReactNode } from "react";
import { SiteHeader, Brand, navIds } from "@/components/site-header";
import { ContactSection } from "@/components/contact-section";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
  const benefitIcons = [Wind, Waves, Moon, Sun, Flower2, Sprout];
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
            <Reveal duration={heroRevealDuration}>
              <p className="eyebrow hero-eyebrow">
                <span />
                {copy.heroEyebrow}
              </p>
            </Reveal>
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
              <a href="#approach" className="text-link mobile-hidden">
                {copy.discover}
                <ArrowUpRight size={15} />
              </a>
            </Reveal>
            <Reveal delay={0.32} duration={heroRevealDuration}>
              <p className="hero-footnote mobile-hidden">
                <Sprout size={17} strokeWidth={1.2} aria-hidden="true" />
                {copy.heroFootnote}
              </p>
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
                src="/images/lilianne-treatment.png"
                alt={copy.treatmentAlt}
                fill
                sizes="(max-width: 767px) calc(100vw - 44px), 45vw"
              />
            </Reveal>
            <Reveal className="approach-copy" delay={0.1}>
              <p className="eyebrow">{copy.introEyebrow}</p>
              <h2>
                {copy.introTitle}
                <br />
                <em>{copy.introItalic}</em>
              </h2>
              <p className="body-copy">{copy.introBody}</p>
              <p className="body-copy">{copy.introBody2}</p>
              <a href="#benefits" className="text-link">
                {copy.introLink}
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
          </div>
        </section>

        <section id="benefits" className="benefits-section section-pad">
          <div className="container">
            <Reveal className="section-heading centered">
              <p className="eyebrow">{copy.benefitsEyebrow}</p>
              <h2>{copy.benefitsTitle}</h2>
              <p className="body-copy">{copy.benefitsDescription}</p>
            </Reveal>
            <div className="benefits-grid">
              {copy.benefits.map(([title, description], index) => {
                const Icon = benefitIcons[index];
                return (
                  <Reveal
                    className="benefit"
                    key={title}
                    delay={(index % 3) * 0.06}
                  >
                    <Icon size={30} strokeWidth={1} aria-hidden="true" />
                    <h3>{title}</h3>
                    <p>{description}</p>
                  </Reveal>
                );
              })}
            </div>
            <p className="medical-note">{copy.medicalNote}</p>
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
              <p className="body-copy">{copy.practitionerBody2}</p>
              <a href="#contact" className="text-link">
                {copy.practitionerLink}
                <ArrowUpRight size={16} />
              </a>
            </Reveal>
            <Reveal className="practitioner-profile">
              <div className="practitioner-portrait image-wrap">
                <Image
                  src="/images/lilianne-portrait.png"
                  alt={copy.portraitAlt}
                  fill
                  sizes="(max-width: 767px) 320px, 40vw"
                />
              </div>
              <h3>{copy.practitionerName}</h3>
              <p>{copy.practitionerCaption}</p>
            </Reveal>
          </div>
        </section>

        <section id="experience" className="experience-section section-pad">
          <div className="container">
            <Reveal className="section-heading">
              <p className="eyebrow">{copy.experienceEyebrow}</p>
              <h2>
                {copy.experienceTitle}
                <br />
                <em>{copy.experienceItalic}</em>
              </h2>
            </Reveal>
            <div className="steps-grid">
              {copy.steps.map(([title, description], index) => (
                <Reveal
                  className="step"
                  key={title}
                  delay={index * 0.6}
                  fromLeft
                >
                  <span className="step-number">0{index + 1}</span>
                  <h3>{title}</h3>
                  <p>{description}</p>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <section
          id="treatments"
          className="section-pad treatments-section background-cover-full"
        >
          <div className="container treatments-grid">
            <Reveal>
              <p className="eyebrow">{copy.servicesEyebrow}</p>
              <h2>{copy.servicesTitle}</h2>
              <Leaf
                className="treatments-leaf"
                size={100}
                strokeWidth={0.5}
                aria-hidden="true"
              />
            </Reveal>
            <div>
              {copy.services.map(([title, description, duration], index) => (
                <Reveal className="service-row" key={title}>
                  <div className="service-title">
                    <span>0{index + 1}</span>
                    <h3>{title}</h3>
                  </div>
                  <p>{description}</p>
                  <div className="service-meta">
                    <span>{duration}</span>
                    <span>{copy.pricing}</span>
                  </div>
                  <a
                    href={BOOKING_URL}
                    className="text-link"
                    target="_blank"
                    rel="noreferrer"
                  >
                    {copy.book}
                    <Link size={16} />
                  </a>
                </Reveal>
              ))}
              <p className="form-note">{copy.durationNote}</p>
            </div>
          </div>
        </section>

        <section className="visual-pause">
          <Image src="/images/treatment-room.png" alt="" fill sizes="100vw" />
          <div className="pause-overlay" />
          <Reveal className="pause-copy">
            <p className="eyebrow">{copy.pauseTop}</p>
            <h2>
              {copy.pauseTitle}
              <br />
              <em>{copy.pauseItalic}</em>
            </h2>
            <Sprout size={30} strokeWidth={1} aria-hidden="true" />
          </Reveal>
        </section>

        <section id="faq" className="section-pad faq-section background-cover">
          <div className="container faq-grid">
            <Reveal fromLeft>
              <p className="eyebrow">{copy.faqEyebrow}</p>
              <h2>{copy.faqTitle}</h2>
              <p className="faq-decoration" aria-hidden="true">
                ?
              </p>
            </Reveal>

            <Accordion>
              {copy.faqs.map(([question, answer], index) => (
                <Reveal key={index} delay={index * 0.1}>
                  <AccordionItem value={`faq-${index}`}>
                    <AccordionTrigger>{question}</AccordionTrigger>
                    <AccordionContent>
                      <p>{answer}</p>
                    </AccordionContent>
                  </AccordionItem>
                </Reveal>
              ))}
            </Accordion>
          </div>
        </section>
        <ContactSection copy={copy} locale={locale} />
      </main>
      <footer className="site-footer">
        <div className="container">
          <div className="footer-main">
            <div>
              <a
                href="#"
                aria-label={
                  locale === "fr"
                    ? "Lilianne Acupuncture — accueil"
                    : "Lilianne Acupuncture — home"
                }
              >
                <Brand subtitle={copy.brandSubtitle} />
              </a>
              <p>{copy.footerLine}</p>
            </div>
            <nav
              aria-label={
                locale === "fr"
                  ? "Navigation de pied de page"
                  : "Footer navigation"
              }
            >
              {copy.nav.slice(0, 3).map((label, index) => (
                <a className="nav-link" key={label} href={`#${navIds[index]}`}>
                  {label}
                </a>
              ))}
              <a className="nav-link" href="#contact">
                Contact
              </a>
            </nav>
          </div>
          <div className="footer-bottom">
            <span>
              © {new Date().getFullYear()} Lilianne Acupuncture.{" "}
              {copy.copyright}
            </span>
            <span>{copy.footerNote}</span>
            <Dialog>
              <DialogTrigger className="nav-link">{copy.privacy}</DialogTrigger>
              <DialogContent showCloseButton={false}>
                <DialogHeader>
                  <DialogTitle>{copy.privacyTitle}</DialogTitle>
                  <DialogDescription>{copy.privacyBody}</DialogDescription>
                </DialogHeader>
                <DialogClose render={<Button variant="outline" />}>
                  {copy.close}
                </DialogClose>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </footer>
    </MotionConfig>
  );
}
