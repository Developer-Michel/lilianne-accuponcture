import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { FirstVisitPage } from "@/components/first-visit-page";
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

  const copy = translations[locale];
  const pagePath = `/${locale}/first-visit`;

  return {
    title: copy.firstVisitPageTitle,
    description: copy.firstVisitDescription,
    alternates: {
      canonical: pagePath,
      languages: {
        en: "/en/first-visit",
        fr: "/fr/first-visit",
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const locale = getLocale((await params).lang);
  if (!locale) notFound();

  return <FirstVisitPage copy={translations[locale]} locale={locale} />;
}
