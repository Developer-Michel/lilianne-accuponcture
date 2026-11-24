import { ArrowLeft } from "lucide-react";
import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Copy, Locale } from "@/lib/translations";

export function AcupunctureInfoPage({
  copy,
  locale,
}: {
  copy: Copy;
  locale: Locale;
}) {
  const info = copy.acupunctureInfo;

  return (
    <>
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" className="service-detail-main">
        <section className="service-detail-hero">
          <div className="container service-detail-hero-content">
            <a href={`/${locale}#approach`} className="text-link back-link">
              <ArrowLeft size={16} aria-hidden="true" />
              {info.backLink}
            </a>
            <p className="eyebrow">{info.eyebrow}</p>
            <h1>{info.title}</h1>
            <p className="service-detail-intro">{info.description}</p>
          </div>
        </section>
        <section className="service-detail-content acupuncture-info-content">
          <div className="container">
            {info.sections.map((section) => (
              <article className="service-detail-block" key={section.heading}>
                <h2>{section.heading}</h2>
                {section.paragraphs.map((paragraph) => (
                  <p key={paragraph}>{paragraph}</p>
                ))}
              </article>
            ))}
          </div>
        </section>
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  );
}
