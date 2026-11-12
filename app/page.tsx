import type { Metadata } from 'next'
import { WellnessSite } from '@/components/wellness-site'
import { translations, type Locale } from '@/lib/translations'

type PageProps = { searchParams: Promise<{ lang?: string }> }

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const locale: Locale = (await searchParams).lang === 'fr' ? 'fr' : 'en'
  return { title: translations[locale].metaTitle, description: translations[locale].metaDescription }
}

export default async function Page({ searchParams }: PageProps) {
  const locale: Locale = (await searchParams).lang === 'fr' ? 'fr' : 'en'
  return <WellnessSite locale={locale} />
}
