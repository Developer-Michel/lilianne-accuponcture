import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { WellnessSite } from '@/components/wellness-site'
import { translations, type Locale } from '@/lib/translations'

type PageProps = { params: Promise<{ lang: string }> }
const metadataImage = '/images/sage-sanctuary.png'

function getLocale(lang: string): Locale | null {
  if (lang === 'en' || lang === 'fr') return lang
  return null
}

export function generateStaticParams() {
  return [{ lang: 'en' }, { lang: 'fr' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const locale = getLocale((await params).lang)
  if (!locale) return {}

  const copy = translations[locale]
  const isFrench = locale === 'fr'

  return {
    title: copy.metaTitle,
    description: copy.metaDescription,
    keywords: isFrench
      ? ['acupuncture valleyfield', 'acupuncture à valleyfield', 'salaberry-de-valleyfield', 'acupuncture douce', 'bien-être', 'soins personnalisés', 'médecine traditionnelle chinoise', 'Lilianne Acupuncture']
      : ['acupuncture valleyfield', 'acupuncture in valleyfield', 'salaberry-de-valleyfield', 'wellness', 'personalized care', 'traditional chinese medicine', 'holistic care', 'Lilianne Acupuncture'],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: '/en',
        fr: '/fr',
        'x-default': '/en',
      },
    },
    openGraph: {
      type: 'website',
      locale: isFrench ? 'fr_CA' : 'en_CA',
      alternateLocale: [isFrench ? 'en_CA' : 'fr_CA'],
      url: `/${locale}`,
      siteName: 'Lilianne Acupuncture',
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [
        {
          url: metadataImage,
          width: 1200,
          height: 630,
          alt: isFrench
            ? 'Lilianne Acupuncture — soins attentionnés et personnalisés'
            : 'Lilianne Acupuncture — thoughtful and personalized care',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: copy.metaTitle,
      description: copy.metaDescription,
      images: [metadataImage],
    },
    facebook: {
      appId: process.env.NEXT_PUBLIC_FACEBOOK_APP_ID,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-image-preview': 'large',
        'max-snippet': -1,
        'max-video-preview': -1,
      },
    },
    category: isFrench ? 'Santé et bien-être' : 'Health and wellness',
  }
}

export default async function Page({ params }: PageProps) {
  const locale = getLocale((await params).lang)
  if (!locale) notFound()
  return <WellnessSite locale={locale} />
}
