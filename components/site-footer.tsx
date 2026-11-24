import { Brand, navIds } from "@/components/site-header";
import type { Copy, Locale } from "@/lib/translations";
import { BOOKING_URL } from "@/lib/links";

export function SiteFooter({
  copy,
  locale,
}: {
  copy: Copy;
  locale: Locale;
}) {
  const homeHref = `/${locale}`;

  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-main">
          <div>
            <a href={homeHref} aria-label={copy.homeLabel}>
              <Brand subtitle={copy.brandSubtitle} />
            </a>
            <p>{copy.footerLine}</p>
          </div>
          <nav aria-label={copy.footerNavLabel}>
            {copy.nav.slice(0, 4).map((label, index) => (
              <a
                className="nav-link"
                key={label}
                href={`${homeHref}#${navIds[index]}`}
              >
                {label}
              </a>
            ))}
            {copy.serviceOfferings.map((service) => (
              <a
                className="nav-link"
                key={service.id}
                href={`/${locale}/services/${service.id}`}
              >
                {service.title}
              </a>
            ))}
            <a className="nav-link" href={`${homeHref}#hours-locations`}>
              {copy.hoursLocationsTitle}
            </a>
            <a className="nav-link" href={`${homeHref}#contact`}>
              Contact
            </a>
            <a className="nav-link" href={`${homeHref}#faq`}>
              FAQ
            </a>
            <a
              className="nav-link"
              href={BOOKING_URL}
              target="_blank"
              rel="noreferrer"
            >
              {copy.book}
            </a>
          </nav>
        </div>
        <div className="footer-bottom">
          <span>
            © {new Date().getFullYear()} Lilianne Acupuncture.{" "}
            {copy.copyright}
          </span>
          <span>{copy.footerNote}</span>
          <a className="nav-link" href={`/${locale}/privacy`}>
            {copy.privacy}
          </a>
        </div>
      </div>
    </footer>
  );
}
