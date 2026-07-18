import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher";
import {
  defaultLocale,
  dictionaries,
  isLocale,
  locales,
  type Locale,
} from "@/lib/i18n";

type LocalePageProps = {
  params: Promise<{
    locale: string;
  }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: LocalePageProps): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale = isLocale(rawLocale) ? rawLocale : defaultLocale;
  const dictionary = dictionaries[locale];

  return {
    title: dictionary.metadata.title,
    description: dictionary.metadata.description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        ru: "/ru",
        sr: "/sr",
      },
    },
  };
}

function diagnosticMailto(locale: Locale) {
  const subjectByLocale: Record<Locale, string> = {
    en: "Quality System Diagnostic",
    ru: "Quality System Diagnostic",
    sr: "Quality System Diagnostic",
  };

  return `mailto:viacheslav.v.melnikov@gmail.com?subject=${encodeURIComponent(
    subjectByLocale[locale],
  )}`;
}

export default async function LocaleHome({ params }: LocalePageProps) {
  const { locale: rawLocale } = await params;

  if (!isLocale(rawLocale)) {
    redirect(`/${defaultLocale}`);
  }

  const locale = rawLocale;
  const dictionary = dictionaries[locale];
  const mailto = diagnosticMailto(locale);

  return (
    <main lang={locale}>
      <section className="hero-section">
        <nav className="top-nav" aria-label={dictionary.nav.aria}>
          <a className="brand" href="#top" aria-label={dictionary.nav.home}>
            <span className="brand-mark" aria-hidden="true">
              <span className="mark-line mark-line-top" />
              <span className="mark-line mark-line-mid" />
              <span className="mark-line mark-line-bottom" />
              <svg className="mark-pulse" viewBox="0 0 64 64" focusable="false">
                <path d="M12 32H23L27 25L33 39L38 32H51" />
              </svg>
              <span className="mark-dot" />
            </span>
            <span>
              QualityOps <em>Studio</em>
            </span>
          </a>
          <div className="nav-cluster">
            <div className="nav-links">
              <a href="#offers">{dictionary.nav.offers}</a>
              <a href="#method">{dictionary.nav.method}</a>
              <a href="#plan">{dictionary.nav.plan}</a>
            </div>
            <LanguageSwitcher
              currentLocale={locale}
              label={dictionary.nav.language}
            />
          </div>
        </nav>

        <div className="hero-grid" id="top">
          <div className="hero-copy">
            <p className="kicker">{dictionary.hero.kicker}</p>
            <h1>{dictionary.hero.title}</h1>
            <p className="hero-text">{dictionary.hero.text}</p>
            <div className="hero-actions">
              <a className="primary-button" href={mailto}>
                {dictionary.hero.primary}
              </a>
              <a className="secondary-button" href="#offers">
                {dictionary.hero.secondary}
              </a>
            </div>
          </div>

          <aside className="diagnostic-panel" aria-label={dictionary.hero.panelLabel}>
            <p className="panel-label">{dictionary.hero.panelLabel}</p>
            <div className="signal-stack">
              {dictionary.hero.panelItems.map((item) => (
                <span key={item}>{item}</span>
              ))}
            </div>
            <p>{dictionary.hero.panelText}</p>
          </aside>
        </div>
      </section>

      <section className="proof-band" aria-label={dictionary.labels.results}>
        {dictionary.proof.map((item) => (
          <div className="proof-item" key={item.metric}>
            <strong>{item.metric}</strong>
            <span>{item.label}</span>
          </div>
        ))}
      </section>

      <section className="section two-column">
        <div>
          <p className="section-kicker">{dictionary.positioning.kicker}</p>
          <h2>{dictionary.positioning.title}</h2>
        </div>
        <div className="body-copy">
          {dictionary.positioning.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section signal-section">
        <div className="section-heading">
          <p className="section-kicker">{dictionary.signals.kicker}</p>
          <h2>{dictionary.signals.title}</h2>
        </div>
        <div className="signal-grid">
          {dictionary.signals.items.map((signal) => (
            <div className="signal-card" key={signal}>
              {signal}
            </div>
          ))}
        </div>
      </section>

      <section className="section" id="offers">
        <div className="section-heading">
          <p className="section-kicker">{dictionary.offers.kicker}</p>
          <h2>{dictionary.offers.title}</h2>
        </div>
        <div className="offer-grid">
          {dictionary.offers.items.map((offer) => (
            <article className="offer-card" key={offer.title}>
              <p className="offer-eyebrow">{offer.eyebrow}</p>
              <h3>{offer.title}</h3>
              <p>{offer.description}</p>
              <ul>
                {offer.outcomes.map((outcome) => (
                  <li key={outcome}>{outcome}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section method-section" id="method">
        <div className="section-heading">
          <p className="section-kicker">{dictionary.method.kicker}</p>
          <h2>{dictionary.method.title}</h2>
        </div>
        <div className="method-list">
          {dictionary.method.items.map((item) => (
            <article className="method-row" key={item.step}>
              <span>{item.step}</span>
              <div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section founder-section">
        <div>
          <p className="section-kicker">{dictionary.founder.kicker}</p>
          <h2>{dictionary.founder.title}</h2>
        </div>
        <div className="founder-copy">
          {dictionary.founder.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
      </section>

      <section className="section plan-section" id="plan">
        <div className="plan-card">
          <p className="section-kicker">{dictionary.plan.kicker}</p>
          <h2>{dictionary.plan.title}</h2>
          <p>{dictionary.plan.text}</p>
          <a className="primary-button" href={mailto}>
            {dictionary.plan.action}
          </a>
        </div>
      </section>
    </main>
  );
}
