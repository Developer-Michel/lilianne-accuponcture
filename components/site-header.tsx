'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { ArrowUpRight, Menu, X } from 'lucide-react'
import { Button, buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { Copy, Locale } from '@/lib/translations'

export const navIds = ['approach', 'practitioner', 'treatments', 'experience']

export function Brand({ subtitle }: { subtitle: string }) {
  return <span className="brand"><span className="brand-logo"><Image src="/images/lilianne-logo.png" alt="" width={1080} height={1080} sizes="100px" /></span><span><span className="brand-name">Lilianne</span><span className="brand-subtitle">{subtitle}</span></span></span>
}

export function SiteHeader({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    document.documentElement.lang = locale
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [locale])
  useEffect(() => {
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setOpen(false)
        document.getElementById('menu-toggle')?.focus()
      }
    }
    if (open) document.addEventListener('keydown', closeOnEscape)
    return () => document.removeEventListener('keydown', closeOnEscape)
  }, [open])

  return <>
    <a className="skip-link" href="#main">{copy.skip}</a>
    <header className={cn('site-header', scrolled && 'is-scrolled')}>
      <div className="header-inner">
        <a href="#" className="brand-link" aria-label={locale === 'fr' ? 'Lilianne Acupuncture — accueil' : 'Lilianne Acupuncture — home'}><Brand subtitle={copy.brandSubtitle} /></a>
        <nav className="desktop-nav" aria-label={locale === 'fr' ? 'Navigation principale' : 'Main navigation'}>
          {copy.nav.map((text, index) => <a key={navIds[index]} className="nav-link" href={`#${navIds[index]}`}>{text}</a>)}
        </nav>
        <div className="header-actions">
          <div className="language-switch" aria-label={locale === 'fr' ? 'Langue' : 'Language'}>
            <a href="?lang=en" lang="en" hrefLang="en" aria-label="Read in English" aria-current={locale === 'en' ? 'page' : undefined} className={cn('language-link', locale === 'en' && 'active')}>EN</a>
            <span aria-hidden="true">/</span>
            <a href="?lang=fr" lang="fr" hrefLang="fr" aria-label="Lire en français" aria-current={locale === 'fr' ? 'page' : undefined} className={cn('language-link', locale === 'fr' && 'active')}>FR</a>
          </div>
          <a className={cn(buttonVariants(), 'header-book')} href="#contact">{copy.book}<ArrowUpRight data-icon="inline-end" /></a>
          <Button id="menu-toggle" variant="ghost" size="icon" className="menu-toggle" onClick={() => setOpen(!open)} aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? copy.close : copy.menu}>{open ? <X /> : <Menu />}</Button>
        </div>
      </div>
      <nav id="mobile-nav" className="mobile-nav" hidden={!open} aria-label={locale === 'fr' ? 'Navigation mobile' : 'Mobile navigation'}>
        {copy.nav.map((text, index) => <a key={navIds[index]} className="nav-link" href={`#${navIds[index]}`} onClick={() => setOpen(false)}>{text}</a>)}
        <a href="#contact" className={buttonVariants()} onClick={() => setOpen(false)}>{copy.book}<ArrowUpRight data-icon="inline-end" /></a>
      </nav>
    </header>
  </>
}
