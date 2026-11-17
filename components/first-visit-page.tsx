import { ContactSection } from "@/components/contact-section";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import type { Copy, Locale } from "@/lib/translations";

export function FirstVisitPage({
  copy,
  locale,
}: {
  copy: Copy;
  locale: Locale;
}) {
  return (
    <>
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" className="first-visit-page">
        <section className="first-visit-hero section-pad">
          <div className="container">
            <p className="eyebrow">{copy.experienceEyebrow}</p>
            <h1>
              {copy.experienceTitle}
              <br />
              <em>{copy.experienceItalic}</em>
            </h1>
            <p className="first-visit-summary">{copy.firstVisitDescription}</p>
          </div>
        </section>
        <section className="experience-section section-pad">
          <div className="container">
            <div className="steps-grid">
              {copy.steps.map(([title, description], index) => (
                <article className="step" key={title}>
                  <span className="step-number">0{index + 1}</span>
                  <h2>{title}</h2>
                  <p>{description}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
        <ContactSection copy={copy} locale={locale} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </>
  );
}
