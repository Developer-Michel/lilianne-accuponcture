import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { translations, type Locale } from "@/lib/translations";

type PageProps = { params: Promise<{ lang: string }> };

function getLocale(lang: string): Locale {
  if (lang === "en" || lang === "fr") return lang;
  notFound();
}

export function generateStaticParams() {
  return [{ lang: "en" }, { lang: "fr" }];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const locale = getLocale((await params).lang);
  const copy = translations[locale];

  return {
    title: copy.privacy,
    description: copy.privacyBody,
    alternates: {
      canonical: `/${locale}/privacy`,
      languages: {
        en: "/en/privacy",
        fr: "/fr/privacy",
      },
    },
  };
}

export default async function Page({ params }: PageProps) {
  const locale = getLocale((await params).lang);
  const copy = translations[locale];

  return (
    <>
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" className="service-detail-main">
        <section className="service-detail-hero">
          <div className="container service-detail-hero-content">
            <a href={`/${locale}`} className="text-link back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              {copy.homeLabel}
            </a>
            <h1>{copy.privacy}</h1>
          </div>
        </section>
        <section className="service-detail-content">
          <div className="container">
            <article className="service-detail-block">
              <h2>{copy.privacyTitle}</h2>
              <p>{copy.privacyBody}</p>
            </article>
          </div>
        </section>
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  );
}
