"use client";

import Image from "next/image";
import { ArrowUpRight, ArrowLeft } from "lucide-react";
import { motion, MotionConfig, useReducedMotion } from "motion/react";
import { ReactNode } from "react";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { ContactSection } from "@/components/contact-section";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { type Locale } from "@/lib/translations";
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

interface ServiceDetailPageProps {
  locale: Locale;
  serviceId: string;
  copy: any;
}

export function ServiceDetailPage({
  locale,
  serviceId,
  copy,
}: ServiceDetailPageProps) {
  const service = copy.serviceOfferings.find((s: any) => s.id === serviceId);

  if (!service) {
    return <div>Service not found</div>;
  }

  const getServiceDetails = () => {
    if (locale === "en") {
      if (serviceId === "private-acupuncture") {
        return {
          title: "Private Acupuncture",
          shortTitle: "Private",
          description:
            "Individual care in a calm setting, tailored to your unique needs and health goals.",
          details: [
            {
              heading: "What is Private Acupuncture?",
              content:
                "Private acupuncture is a one-on-one treatment in a dedicated, peaceful space designed for your comfort and healing. It's an individualized approach where your practitioner focuses entirely on your unique health concerns, goals, and preferences.",
            },
            {
              heading: "Who is it for?",
              content:
                "Private acupuncture is ideal for anyone seeking personalized care. Whether you're managing pain, stress, sleep issues, hormonal imbalances, or simply looking for preventive wellness, this service offers the focused attention needed to address your specific situation.",
            },
            {
              heading: "What to expect",
              content:
                "Your session begins with a consultation about your health history, current concerns, and what brings you here. Your practitioner will explain the proposed treatment plan and answer any questions before beginning. Treatment is delivered with fine, sterile needles at specific points on your body, followed by a restful period. Each session concludes with guidance on aftercare and next steps.",
            },
            {
              heading: "Duration and frequency",
              content:
                "Initial appointments typically allow 60–90 minutes, while follow-up sessions usually take 45–60 minutes. The frequency of visits depends on your condition, goals, and how you respond to treatment. Your practitioner will discuss this with you as part of your personalized plan.",
            },
            {
              heading: "Who benefits most?",
              content:
                "Private acupuncture is beneficial for those with complex health situations, those seeking preventive wellness, those who prefer a more private setting, or anyone needing flexibility in their treatment approach.",
            },
          ],
        };
      } else if (serviceId === "social-acupuncture") {
        return {
          title: "Social Acupuncture",
          shortTitle: "Social",
          description:
            "Acupuncture in a welcoming, shared space where you receive treatment alongside others in a community setting.",
          details: [
            {
              heading: "What is Social Acupuncture?",
              content:
                "Social acupuncture brings together people in a calm, shared treatment space. You receive the same acupuncture care as in a private setting, but in an open room alongside others. This creates a unique sense of community and connection while maintaining the therapeutic benefits of acupuncture.",
            },
            {
              heading: "Why choose social acupuncture?",
              content:
                "Social acupuncture offers several advantages: it's often more affordable, it creates a sense of community and shared healing, the group energy can enhance relaxation, and it's a wonderful way to connect with others on similar wellness journeys. Many people find the collective calm and presence deeply grounding.",
            },
            {
              heading: "How does it work?",
              content:
                "You'll be greeted and led to a comfortable treatment area in the shared space. After a brief check-in about your health and needs, fine needles are placed at key acupuncture points. You then rest peacefully in the shared environment, with your practitioner nearby for support. After your rest, you'll have time to integrate before leaving.",
            },
            {
              heading: "Duration",
              content:
                "Social acupuncture sessions typically last around 45–60 minutes total, including the check-in and treatment time. The actual needle retention period is usually 20–30 minutes, allowing for deep relaxation.",
            },
            {
              heading: "Who is it for?",
              content:
                "Social acupuncture is perfect for those seeking a more affordable option, those who enjoy community connection, people new to acupuncture who want a supportive environment, and anyone looking to deepen their wellness practice through collective healing.",
            },
          ],
        };
      }
    } else if (locale === "fr") {
      if (serviceId === "acupuncture-privee") {
        return {
          title: "Acupuncture Privée",
          shortTitle: "Privée",
          description:
            "Un accompagnement individuel dans un espace calme, adapté à vos besoins et vos objectifs de santé uniques.",
          details: [
            {
              heading: "Qu'est-ce que l'acupuncture privée ?",
              content:
                "L'acupuncture privée est un traitement en tête-à-tête dans un espace dédié et paisible conçu pour votre confort et votre guérison. C'est une approche individualisée où votre praticienne se concentre entièrement sur vos préoccupations de santé, vos objectifs et vos préférences.",
            },
            {
              heading: "À qui est-elle destinée ?",
              content:
                "L'acupuncture privée convient à tous ceux qui cherchent des soins personnalisés. Que vous gériez une douleur, le stress, des problèmes de sommeil, un déséquilibre hormonal ou que vous cherchiez simplement la prévention, ce service offre l'attention concentrée nécessaire pour aborder votre situation.",
            },
            {
              heading: "À quoi s'attendre",
              content:
                "Votre séance commence par une consultation sur votre historique de santé, vos préoccupations actuelles et ce qui vous amène. Votre praticienne expliquera le plan de traitement proposé et répondra à vos questions avant de commencer. Le traitement est effectué avec de fines aiguilles stériles à des points spécifiques de votre corps, suivi d'une période de repos. Chaque séance se termine par des conseils sur les soins après traitement et les prochaines étapes.",
            },
            {
              heading: "Durée et fréquence",
              content:
                "Les premiers rendez-vous permettent généralement 60–90 minutes, tandis que les séances de suivi durent habituellement 45–60 minutes. La fréquence des visites dépend de votre condition, de vos objectifs et de votre réaction au traitement. Votre praticienne en discutera avec vous dans le cadre de votre plan personnalisé.",
            },
            {
              heading: "Qui en bénéficie le plus ?",
              content:
                "L'acupuncture privée est bénéfique pour ceux dont la situation de santé est complexe, ceux qui cherchent le bien-être préventif, ceux qui préfèrent un cadre plus privé, ou toute personne ayant besoin de flexibilité dans son approche thérapeutique.",
            },
          ],
        };
      } else if (serviceId === "acupuncture-sociale") {
        return {
          title: "Acupuncture Sociale",
          shortTitle: "Sociale",
          description:
            "Des séances d'acupuncture dans un espace partagé et accueillant où vous recevez des soins aux côtés d'autres personnes.",
          details: [
            {
              heading: "Qu'est-ce que l'acupuncture sociale ?",
              content:
                "L'acupuncture sociale réunit des personnes dans un espace de traitement calme et partagé. Vous recevez les mêmes soins d'acupuncture qu'en privé, mais dans une pièce ouverte aux côtés d'autres. Cela crée un sentiment unique de communauté et de connexion tout en maintenant les bienfaits thérapeutiques de l'acupuncture.",
            },
            {
              heading: "Pourquoi choisir l'acupuncture sociale ?",
              content:
                "L'acupuncture sociale offre plusieurs avantages : elle est souvent plus abordable, elle crée un sentiment de communauté et de guérison partagée, l'énergie du groupe peut renforcer la détente, et c'est une merveilleuse façon de se connecter avec d'autres en cheminement de bien-être. Beaucoup de gens trouvent le calme collectif et la présence profondément apaisants.",
            },
            {
              heading: "Comment ça fonctionne ?",
              content:
                "Vous serez accueillie et guidée vers un espace de traitement confortable dans l'espace partagé. Après une brève vérification de votre santé et de vos besoins, de fines aiguilles sont placées aux points clés d'acupuncture. Vous vous reposez alors paisiblement dans l'environnement partagé, avec votre praticienne à proximité pour vous soutenir. Après votre repos, vous aurez le temps de vous réhabituer avant de partir.",
            },
            {
              heading: "Durée",
              content:
                "Les séances d'acupuncture sociale durent généralement environ 45–60 minutes au total, y compris le temps d'accueil et de traitement. Le temps réel de rétention des aiguilles est généralement 20–30 minutes, permettant une détente profonde.",
            },
            {
              heading: "À qui est-elle destinée ?",
              content:
                "L'acupuncture sociale est parfaite pour ceux qui cherchent une option plus abordable, ceux qui apprécient la connexion communautaire, les personnes nouvelles à l'acupuncture qui cherchent un environnement de soutien, et toute personne cherchant à approfondir sa pratique du bien-être par la guérison collective.",
            },
          ],
        };
      }
    }

    return null;
  };

  const details = getServiceDetails();

  if (!details) {
    return <div>Service details not found</div>;
  }

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" className="service-detail-main">
        <section className="service-detail-hero">
          <div className="container service-detail-hero-content">
            <Reveal className="back-link">
              <a href={`/${locale}/#treatments`} className="text-link">
                <ArrowLeft size={16} />
                {locale === "en" ? "Back to services" : "Retour aux services"}
              </a>
            </Reveal>
            <Reveal delay={0.08} duration={1.35}>
              <h1>{details.title}</h1>
            </Reveal>
            <Reveal delay={0.16} duration={1.35}>
              <p className="service-detail-intro">{details.description}</p>
            </Reveal>
            <Reveal delay={0.24} duration={1.35}>
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
          </div>
        </section>

        <section className="service-detail-content">
          <div className="container">
            {details.details.map((detail, index) => (
              <Reveal
                key={index}
                className="service-detail-block"
                delay={index * 0.05}
              >
                <h2>{detail.heading}</h2>
                <p>{detail.content}</p>
              </Reveal>
            ))}
          </div>
        </section>

        <section className="service-detail-pricing">
          <div className="container">
            <Reveal className="section-heading centered">
              <h2>{locale === "en" ? "Pricing" : "Tarification"}</h2>
            </Reveal>
            <div className="pricing-grid">
              {service.priceGroups.map((group: any, index: number) => (
                <Reveal key={group.title} delay={index * 0.1}>
                  <div className="pricing-card">
                    <h3>{group.title}</h3>
                    <dl>
                      {group.prices.map(([label, price]: any) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{price}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection copy={copy} locale={locale} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </MotionConfig>
  );
}
