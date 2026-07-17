"use client";

import { usePathname, useRouter } from "next/navigation";
import { localeLabels, localeNames, locales, type Locale } from "@/lib/i18n";

type LanguageSwitcherProps = {
  currentLocale: Locale;
  label: string;
};

export function LanguageSwitcher({ currentLocale, label }: LanguageSwitcherProps) {
  const pathname = usePathname();
  const router = useRouter();

  function switchLocale(nextLocale: Locale) {
    document.cookie = `NEXT_LOCALE=${nextLocale}; path=/; max-age=31536000; SameSite=Lax`;

    const segments = pathname.split("/");
    if (locales.includes(segments[1] as Locale)) {
      segments[1] = nextLocale;
      router.push(segments.join("/") || `/${nextLocale}`);
      return;
    }

    router.push(`/${nextLocale}`);
  }

  return (
    <div className="language-switcher" aria-label={label}>
      {locales.map((locale) => (
        <button
          aria-pressed={locale === currentLocale}
          className={locale === currentLocale ? "active" : undefined}
          key={locale}
          onClick={() => switchLocale(locale)}
          title={localeNames[locale]}
          type="button"
        >
          {localeLabels[locale]}
        </button>
      ))}
    </div>
  );
}
