import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AcupunctureInfoPage } from "@/components/acupuncture-info-page";
import { translations, type Locale } from "@/lib/translations";

type PageProps = { params: Promise<{ lang: string }> };

function getLocale(lang: string): Locale | null {
  if (lang === "en" || lang === "fr") return lang;
  return null;
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = getLocale((await params).lang);
  if (!locale) return {};

  const info = translations[locale].acupunctureInfo;
  const pagePath = `/${locale}/acupuncture`;

  return {
    title: info.title,
    description: info.description,
    alternates: {
      canonical: pagePath,
      languages: {
        en: "/en/acupuncture",
        fr: "/fr/acupuncture",
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const locale = getLocale((await params).lang);
  if (!locale) notFound();

  return (
    <AcupunctureInfoPage copy={translations[locale]} locale={locale} />
  );
}
