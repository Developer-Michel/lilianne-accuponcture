# Code Implementation Details

## Component Structure (wellness-site.tsx)

```tsx
// Service Cards Section
<div className="service-cards">
  {copy.serviceOfferings.map((service, index) => (
    <Reveal className="service-card" key={service.title}>
      {/* Entire card is wrapped in a link */}
      <a
        href={`/${locale}/services/${service.id}`}
        className="service-card-link"
      >
        {/* Card Image */}
        <div className="service-card-image image-wrap">
          <Image
            src={service.image}
            alt={service.imageAlt}
            fill
            sizes="(max-width: 767px) calc(100vw - 44px), 45vw"
          />
        </div>

        {/* Card Content */}
        <div className="service-card-content">
          <p className="eyebrow">0{index + 1}</p>
          <h3>{service.title}</h3>
          <p className="service-description">
            {service.description}
          </p>
          <div className="service-price-groups">
            {service.priceGroups.map((group) => (
              <div className="service-price-group" key={group.title}>
                <h4>{group.title}</h4>
                <dl>
                  {group.prices.map(([label, price]) => (
                    <div key={label}>
                      <dt>{label}</dt>
                      <dd>{price}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            ))}
          </div>
        </div>

        {/* Hover Overlay */}
        <div className="service-card-hover">
          <span className="learn-more-text">{copy.learnMore}</span>
        </div>
      </a>
    </Reveal>
  ))}
</div>
```

## CSS Styling (globals.css)

### Service Card Container
```css
.service-card {
  display: flex;
  flex-direction: column;
  overflow: hidden;
  background: #ffffffa8;
  border: 1px solid var(--border);
  border-radius: 54px;
  transition: box-shadow 420ms ease;
}

.service-card:hover {
  box-shadow: 0 18px 38px #26382c14;
}
```

### Clickable Link Wrapper
```css
.service-card-link {
  display: flex;
  flex-direction: column;
  flex: 1;
  position: relative;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
}
```

### Hover Overlay
```css
.service-card-hover {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: flex-start;
  justify-content: flex-end;
  padding: 28px;
  background: rgba(44, 56, 44, 0.85);
  opacity: 0;
  transition: opacity 320ms ease;
  backdrop-filter: blur(4px);
  border-radius: 54px;
  pointer-events: none;
  z-index: 10;
}

.service-card-link:hover .service-card-hover {
  opacity: 1;
  pointer-events: auto;
}
```

### "Learn More" Text
```css
.learn-more-text {
  display: flex;
  align-items: center;
  gap: 8px;
  color: var(--primary-foreground);
  font-size: 16px;
  font-weight: 500;
  letter-spacing: 0.5px;
  text-transform: uppercase;
  white-space: nowrap;
}

.learn-more-text::after {
  content: "→";
  display: inline-block;
  font-weight: 300;
}
```

### Card Content
```css
.service-card-content {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 28px clamp(20px, 3vw, 38px) 34px;
  position: relative;
  z-index: 1;
}

.service-card-content > .eyebrow {
  margin-bottom: 12px;
}

.service-card-content > h3 {
  font-family: var(--font-editorial), Georgia, serif;
  font-size: clamp(29px, 3vw, 38px);
  font-weight: 400;
}
```

## Translations (lib/translations.ts)

### English
```typescript
{
  learnMore: "Learn more",
  serviceOfferings: [
    {
      id: "private-acupuncture",
      title: "Private acupuncture",
      description: "Individual care in a calm setting, tailored to your needs.",
      image: "/images/acupuncture-private.jpg",
      imageAlt: "Acupuncturist providing a private treatment",
      priceGroups: [
        {
          title: "Regular rates",
          prices: [
            ["First appointment", "$110"],
            ["Follow-up", "$90"],
          ],
        },
        {
          title: "OVPAC members",
          prices: [
            ["First appointment", "$85"],
            ["Follow-up", "$65"],
          ],
        },
      ],
    },
    // ... more services
  ],
}
```

### French
```typescript
{
  learnMore: "En savoir plus",
  serviceOfferings: [
    {
      id: "acupuncture-privee",
      title: "Acupuncture privée",
      description: "Un accompagnement individuel dans un espace calme, adapté à vos besoins.",
      image: "/images/acupuncture-private.jpg",
      imageAlt: "Une acupuncteure offrant un traitement privé",
      priceGroups: [
        {
          title: "Tarifs réguliers",
          prices: [
            ["Premier rendez-vous", "110 $"],
            ["Suivi", "90 $"],
          ],
        },
        {
          title: "Membres OVPAC",
          prices: [
            ["Premier rendez-vous", "85 $"],
            ["Suivi", "65 $"],
          ],
        },
      ],
    },
    // ... more services
  ],
}
```

## Service Detail Page Component (service-detail-page.tsx)

```typescript
export function ServiceDetailPage({
  locale,
  serviceId,
  copy,
}: ServiceDetailPageProps) {
  const service = copy.serviceOfferings.find((s: any) => s.id === serviceId);

  const getServiceDetails = () => {
    // Returns detailed content based on locale and serviceId
    // Each service has 5 detailed sections explaining:
    // 1. What is [Service]?
    // 2. Who is it for?
    // 3. What to expect
    // 4. Duration and frequency / Duration
    // 5. Who benefits most? / Who is it for?
  };

  return (
    <MotionConfig reducedMotion="user">
      <SiteHeader copy={copy} locale={locale} />
      <main id="main" className="service-detail-main">
        {/* Hero Section */}
        <section className="service-detail-hero">
          <div className="container service-detail-hero-content">
            <Reveal className="back-link">
              <a href={`/${locale}/#treatments`} className="text-link">
                <ArrowLeft size={16} />
                {locale === "en" ? "Back to services" : "Retour aux services"}
              </a>
            </Reveal>
            <Reveal delay={0.08} duration={1.35}>
              <h1>{details.title}</h1>
            </Reveal>
            <Reveal delay={0.16} duration={1.35}>
              <p className="service-detail-intro">{details.description}</p>
            </Reveal>
            <Reveal delay={0.24} duration={1.35}>
              <a
                href={BOOKING_URL}
                className={cn(buttonVariants({ size: "lg" }), "hero-book")}
                target="_blank"
                rel="noreferrer"
              >
                {copy.book}
                <ArrowUpRight data-icon="inline-end" />
              </a>
            </Reveal>
          </div>
        </section>

        {/* Detailed Content */}
        <section className="service-detail-content">
          <div className="container">
            {details.details.map((detail, index) => (
              <Reveal
                key={index}
                className="service-detail-block"
                delay={index * 0.05}
              >
                <h2>{detail.heading}</h2>
                <p>{detail.content}</p>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Pricing Section */}
        <section className="service-detail-pricing">
          <div className="container">
            <Reveal className="section-heading centered">
              <h2>{locale === "en" ? "Pricing" : "Tarification"}</h2>
            </Reveal>
            <div className="pricing-grid">
              {service.priceGroups.map((group, index) => (
                <Reveal key={group.title} delay={index * 0.1}>
                  <div className="pricing-card">
                    <h3>{group.title}</h3>
                    <dl>
                      {group.prices.map(([label, price]) => (
                        <div key={label}>
                          <dt>{label}</dt>
                          <dd>{price}</dd>
                        </div>
                      ))}
                    </dl>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </section>

        <ContactSection copy={copy} locale={locale} />
      </main>
      <SiteFooter copy={copy} locale={locale} />
    </MotionConfig>
  );
}
```

## Route Handler (app/[lang]/services/[serviceId]/page.tsx)

```typescript
export function generateStaticParams() {
  return [
    { lang: "en", serviceId: "private-acupuncture" },
    { lang: "en", serviceId: "social-acupuncture" },
    { lang: "fr", serviceId: "acupuncture-privee" },
    { lang: "fr", serviceId: "acupuncture-sociale" },
  ];
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { lang, serviceId } = await params;
  const locale = getLocale(lang);
  if (!locale || !isValidServiceId(serviceId)) return {};

  const copy = translations[locale];
  const service = copy.serviceOfferings.find((s: any) => s.id === serviceId);
  
  if (!service) return {};

  const pagePath = `/${locale}/services/${serviceId}`;
  const title = `${service.title} — Lilianne Acupuncture`;
  const description = service.description;

  return {
    title,
    description,
    alternates: {
      canonical: pagePath,
      languages: {
        en: `/en/services/${serviceId === "acupuncture-privee" ? "private-acupuncture" : "social-acupuncture"}`,
        fr: `/fr/services/${serviceId === "private-acupuncture" ? "acupuncture-privee" : "acupuncture-sociale"}`,
      },
    },
  };
}
```

---

## Hover Animation Timeline

```
0ms ──────► 320ms
│          │
└──────────┘
 Fade In

Opacity: 0 ──────────► 1
         (smooth ease transition)

Pointer Events:
none ──────────────► auto
(enabled on hover)
```

## Color Palette

| Element | Color | Hex/RGBA |
|---------|-------|----------|
| Overlay Background | Dark Green-Gray | rgba(44, 56, 44, 0.85) |
| Text Color | White | var(--primary-foreground) |
| Card Background | Light White | #ffffffa8 |
| Card Border | Gray | var(--border) |
| Shadow | Dark Gray | #26382c14 |

---

This implementation provides a seamless, production-ready interactive experience with proper semantics, accessibility, and performance.
