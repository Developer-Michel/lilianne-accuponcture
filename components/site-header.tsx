"use client";

import { useEffect, useRef, useState, type MouseEvent } from "react";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { ArrowUpRight, CalendarIcon, ChevronDown, Menu, X } from "lucide-react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { BOOKING_URL } from "@/lib/links";
import type { Copy, Locale } from "@/lib/translations";

export const navIds = [
  "approach",
  "practitioner",
  "benefits",
  "treatments",
  "infos",
];

export function Brand({ subtitle }: { subtitle: string }) {
  return (
    <span className="brand">
      <span className="brand-logo">
        <Image
          src="/images/logo.png"
          alt="Lilianne Acupuncture logo"
          width={1080}
          height={1080}
          sizes="130px"
        />
      </span>
      <span>
        <span className="brand-name">Lilianne Dorais</span>
        <span className="brand-subtitle">{subtitle}</span>
      </span>
    </span>
  );
}

export function SiteHeader({ copy, locale }: { copy: Copy; locale: Locale }) {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const menuToggleRef = useRef<HTMLButtonElement>(null);
  const mobileNavRef = useRef<HTMLElement>(null);
  const pathname = usePathname();
  const homeHref = `/${locale}`;
  const languagePath = pathname.endsWith("/acupuncture") ? "/acupuncture" : "";

  function handleNavLinkClick(event: MouseEvent<HTMLAnchorElement>) {
    event.currentTarget.closest("details")?.removeAttribute("open");
    setOpen(false);
  }

  function canHover() {
    return window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  }

  function handleDropdownMouseEnter(event: MouseEvent<HTMLDetailsElement>) {
    if (canHover()) event.currentTarget.open = true;
  }

  function handleDropdownMouseLeave(event: MouseEvent<HTMLDetailsElement>) {
    if (canHover()) event.currentTarget.open = false;
  }

  useEffect(() => {
    document.documentElement.lang = locale;
    const onScroll = () => setScrolled(window.scrollY > 0);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [locale]);

  useEffect(() => {
    function handleOutsideClick(event: globalThis.MouseEvent) {
      const target = event.target;
      if (!(target instanceof Node)) return;

      headerRef.current
        ?.querySelectorAll<HTMLDetailsElement>(".nav-more[open]")
        .forEach((dropdown) => {
          if (!dropdown.contains(target)) dropdown.open = false;
        });

      if (
        open &&
        !mobileNavRef.current?.contains(target) &&
        !menuToggleRef.current?.contains(target)
      ) {
        setOpen(false);
      }
    }

    function handleEscape(event: KeyboardEvent) {
      if (event.key !== "Escape") return;

      const dropdown =
        headerRef.current?.querySelector<HTMLDetailsElement>(".nav-more[open]");
      if (dropdown) {
        dropdown.open = false;
        dropdown.querySelector("summary")?.focus();
      } else if (open) {
        setOpen(false);
        menuToggleRef.current?.focus();
      }
    }

    document.addEventListener("click", handleOutsideClick, true);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleOutsideClick, true);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open]);

  function renderNavLinks(withHover = false) {
    const hoverProps = withHover
      ? {
          onMouseEnter: handleDropdownMouseEnter,
          onMouseLeave: handleDropdownMouseLeave,
        }
      : {};
    return copy.nav.map((text, index) => {
      const id = navIds[index];
      if (id === "treatments") {
        return (
          <details key={id} className="nav-more" {...hoverProps}>
            <summary className="nav-link">
              <a href={`${homeHref}#treatments`} onClick={handleNavLinkClick}>
                {text}
              </a>
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div className="nav-more-menu">
              {copy.serviceOfferings.map((service) => (
                <a
                  key={service.id}
                  className="nav-link"
                  href={`/${locale}/services/${service.id}`}
                  onClick={handleNavLinkClick}
                >
                  {service.title}
                </a>
              ))}
            </div>
          </details>
        );
      }
      if (id === "infos") {
        return (
          <details key={id} className="nav-more" {...hoverProps}>
            <summary className="nav-link">
              {text}
              <ChevronDown size={14} aria-hidden="true" />
            </summary>
            <div className="nav-more-menu">
              <a
                className="nav-link"
                href={`${homeHref}#hours-locations`}
                onClick={handleNavLinkClick}
              >
                {locale === "fr"
                  ? "Horaire & lieux de pratique"
                  : "Hours & locations"}
              </a>
              <a
                className="nav-link"
                href={`${homeHref}#contact`}
                onClick={handleNavLinkClick}
              >
                Contact
              </a>
              <a
                className="nav-link"
                href={`${homeHref}#faq`}
                onClick={handleNavLinkClick}
              >
                FAQ
              </a>
            </div>
          </details>
        );
      }
      return (
        <a
          key={id}
          className="nav-link"
          href={`${homeHref}#${id}`}
          onClick={handleNavLinkClick}
        >
          {text}
        </a>
      );
    });
  }

  return (
    <>
      <a className="skip-link" href="#main">
        {copy.skip}
      </a>
      <header
        ref={headerRef}
        className={cn("site-header", scrolled && "is-scrolled")}
      >
        <div className="header-inner container">
          <a
            href={homeHref}
            className="brand-link"
            aria-label={
              locale === "fr"
                ? "Lilianne Acupuncture — accueil"
                : "Lilianne Acupuncture — home"
            }
          >
            <Brand subtitle={copy.brandSubtitle} />
          </a>
          <nav
            className="desktop-nav"
            aria-label={
              locale === "fr" ? "Navigation principale" : "Main navigation"
            }
          >
            {renderNavLinks(true)}
          </nav>
          <div className="header-actions">
            <div
              className="language-switch"
              aria-label={locale === "fr" ? "Langue" : "Language"}
            >
              <a
                href={`/en${languagePath}`}
                lang="en"
                hrefLang="en"
                aria-label="Read in English"
                aria-current={locale === "en" ? "page" : undefined}
                className={cn("language-link", locale === "en" && "active")}
              >
                EN
              </a>
              <span aria-hidden="true">/</span>
              <a
                href={`/fr${languagePath}`}
                lang="fr"
                hrefLang="fr"
                aria-label="Lire en français"
                aria-current={locale === "fr" ? "page" : undefined}
                className={cn("language-link", locale === "fr" && "active")}
              >
                FR
              </a>
            </div>
            <a
              className={cn(buttonVariants(), "header-book")}
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              <CalendarIcon />
              {copy.book}
              <ArrowUpRight data-icon="inline-end" />
            </a>
            <Button
              ref={menuToggleRef}
              id="menu-toggle"
              type="button"
              variant="ghost"
              size="icon"
              className="menu-toggle"
              onClick={() => setOpen((current) => !current)}
              aria-expanded={open}
              aria-controls="mobile-nav"
              aria-label={open ? copy.close : copy.menu}
            >
              {open ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
            </Button>
          </div>
        </div>
        <nav
          ref={mobileNavRef}
          id="mobile-nav"
          className={cn("mobile-nav", open && "is-open")}
          inert={!open}
          aria-label={
            locale === "fr" ? "Navigation mobile" : "Mobile navigation"
          }
        >
          {renderNavLinks()}
          <a
            href={BOOKING_URL}
            className={buttonVariants()}
            onClick={handleNavLinkClick}
            target="_blank"
            rel="noreferrer"
          >
            {copy.book}
            <ArrowUpRight data-icon="inline-end" />
          </a>
        </nav>
      </header>
    </>
  );
}
