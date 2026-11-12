import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { WellnessSite } from "@/components/wellness-site";
import { translations, type Locale } from "@/lib/translations";

type PageProps = { params: Promise<{ lang: string }> };
const metadataImage = "/images/sage-sanctuary.png";

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
  const { lang } = await params;
  const locale = getLocale(lang);

  if (!locale) return {};

  const { metaTitle, metaDescription } = translations[locale];
  const isFrench = locale === "fr";
  const pagePath = `/${locale}`;
  const facebookAppId = process.env.NEXT_PUBLIC_FACEBOOK_APP_ID;

  const imageAlt = isFrench
    ? "Lilianne Acupuncture — soins attentionnés et personnalisés"
    : "Lilianne Acupuncture — thoughtful and personalized care";

  return {
    title: metaTitle,
    description: metaDescription,

    alternates: {
      canonical: pagePath,
      languages: {
        en: "/en",
        fr: "/fr",
        "x-default": "/en",
      },
    },

    openGraph: {
      type: "website",
      locale: isFrench ? "fr_CA" : "en_CA",
      alternateLocale: [isFrench ? "en_CA" : "fr_CA"],
      url: pagePath,
      siteName: "Lilianne Acupuncture",
      title: metaTitle,
      description: metaDescription,
      images: [
        {
          url: metadataImage,
          width: 1200,
          height: 630,
          alt: imageAlt,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: metaTitle,
      description: metaDescription,
      images: [{ url: metadataImage, alt: imageAlt }],
    },

    ...(facebookAppId && {
      facebook: { appId: facebookAppId },
    }),

    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },

    category: isFrench ? "Santé et bien-être" : "Health and wellness",
  };
}
export default async function Page({ params }: PageProps) {
  const locale = getLocale((await params).lang);
  if (!locale) notFound();
  return <WellnessSite locale={locale} />;
}
