import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceDetailPage } from "@/components/service-detail-page";
import { translations, type Locale } from "@/lib/translations";

type PageProps = { params: Promise<{ lang: string; serviceId: string }> };

function getLocale(lang: string): Locale | null {
  if (lang === "en" || lang === "fr") return lang;
  return null;
}

function isValidServiceId(serviceId: string): serviceId is "private-acupuncture" | "social-acupuncture" | "acupuncture-privee" | "acupuncture-sociale" {
  return ["private-acupuncture", "social-acupuncture", "acupuncture-privee", "acupuncture-sociale"].includes(
    serviceId
  );
}

export function generateStaticParams() {
  return [
    { lang: "en", serviceId: "private-acupuncture" },
    { lang: "en", serviceId: "social-acupuncture" },
    { lang: "fr", serviceId: "acupuncture-privee" },
    { lang: "fr", serviceId: "acupuncture-sociale" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const locale = getLocale(lang);
  if (!locale || !isValidServiceId(serviceId)) return {};

  const copy = translations[locale];
  const service = copy.serviceOfferings.find((s: any) => s.id === serviceId);
  
  if (!service) return {};

  const pagePath = `/${locale}/services/${serviceId}`;
  const title = `${service.title} — Lilianne Acupuncture`;
  const description = service.description;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
      languages: {
        en: `/en/services/${serviceId === "acupuncture-privee" ? "private-acupuncture" : "social-acupuncture"}`,
        fr: `/fr/services/${serviceId === "private-acupuncture" ? "acupuncture-privee" : "acupuncture-sociale"}`,
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const { lang, serviceId } = await params;
  const locale = getLocale(lang);
  if (!locale || !isValidServiceId(serviceId)) notFound();

  return (
    <ServiceDetailPage
      locale={locale}
      serviceId={serviceId}
      copy={translations[locale]}
    />
  );
}
