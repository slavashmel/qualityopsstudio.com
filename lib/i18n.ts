export const locales = ["en", "ru", "sr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export const localeLabels: Record<Locale, string> = {
  en: "EN",
  ru: "RU",
  sr: "SR",
};

export const localeNames: Record<Locale, string> = {
  en: "English",
  ru: "Русский",
  sr: "Srpski",
};

export function isLocale(value: string | undefined): value is Locale {
  return locales.includes(value as Locale);
}

export function normalizeLocale(value: string | undefined): Locale {
  if (!value) {
    return defaultLocale;
  }

  const normalized = value.toLowerCase().split("-")[0];
  return isLocale(normalized) ? normalized : defaultLocale;
}

export function detectLocale(acceptLanguage: string | null, cookieLocale?: string): Locale {
  if (isLocale(cookieLocale)) {
    return cookieLocale;
  }

  if (!acceptLanguage) {
    return defaultLocale;
  }

  const preferred = acceptLanguage
    .split(",")
    .map((part) => part.trim().split(";")[0])
    .map(normalizeLocale)
    .find((locale) => locale !== defaultLocale);

  return preferred ?? defaultLocale;
}

export const dictionaries = {
  en: {
    metadata: {
      title: "QualityOps Studio | Quality Systems for Predictable Delivery",
      description:
        "Quality operations consulting for scaling engineering teams: faster regression, clearer ownership, smarter automation, and release confidence.",
    },
    nav: {
      aria: "Primary navigation",
      home: "QualityOps Studio home",
      offers: "Offers",
      method: "Method",
      plan: "Plan",
      language: "Language",
    },
    labels: {
      results: "Selected results",
    },
    hero: {
      kicker: "Quality systems for predictable delivery",
      title: "Turn QA bottlenecks into operating systems for release confidence.",
      text:
        "QualityOps Studio helps CTOs, VP Engineering, and product leaders redesign how quality works across teams: faster regression, clearer ownership, smarter automation signal, and safer releases.",
      primary: "Book diagnostic call",
      secondary: "View consulting offers",
      panelLabel: "Release confidence advisory",
      panelItems: ["People", "Process", "Automation", "CI/CD", "Release Risk"],
      panelText:
        "Built from 20+ years in IT and hands-on QA leadership across telecom, fintech, enterprise software, infrastructure, and high-load product teams.",
    },
    proof: [
      {
        metric: "10h -> 30m",
        label:
          "Cross-team regression time reduced through automation, parallelization, test data work, and CI/CD improvements.",
      },
      {
        metric: "-50%",
        label:
          "QA automation costs reduced while improving coverage and execution performance.",
      },
      {
        metric: "30+",
        label: "Distributed QA engineers led across multiple product teams.",
      },
      {
        metric: "1-2 weeks",
        label:
          "Onboarding ramp-up improvement through a cross-functional onboarding system.",
      },
    ],
    positioning: {
      kicker: "Positioning",
      title: "Not outsourced testing. Not a generic automation vendor.",
      paragraphs: [
        "The work is for teams where quality has become an organizational constraint. The product is moving, the team is growing, but release confidence depends on slow regression, fragile automation, unclear ownership, and too much manual coordination.",
        "The consulting model combines senior QA leadership, engineering context, process design, automation strategy, and team enablement. The outcome is a quality system the team can operate without constant external help.",
      ],
    },
    signals: {
      kicker: "When to call",
      title: "Useful when quality problems are already visible in delivery.",
      items: [
        "Regression is too slow to support frequent releases",
        "QA depends on manual coordination, hidden knowledge, or heroic individuals",
        "Automation exists, but nobody trusts its signal",
        "Jira, Confluence, and TMS are present but do not create real visibility",
        "QA engineers execute tasks but do not own product quality",
        "AI tools are being used ad hoc without a quality workflow",
      ],
    },
    offers: {
      kicker: "Consulting products",
      title: "Three clear ways to buy the work.",
      items: [
        {
          eyebrow: "2-3 weeks",
          title: "Quality System Diagnostic",
          description:
            "A focused review of how quality actually moves through your team: requirements, Jira, regression, automation, environments, test data, release gates, and ownership.",
          outcomes: [
            "Current-state map of your QA and release flow",
            "Risk and bottleneck report with evidence",
            "30/60/90-day improvement roadmap",
            "Executive workshop with practical next steps",
          ],
        },
        {
          eyebrow: "4-8 weeks",
          title: "Regression Rescue Sprint",
          description:
            "A hands-on engagement for teams whose regression cycle has become slow, expensive, flaky, or hard to trust.",
          outcomes: [
            "Regression suite triage and prioritization",
            "CI/CD, parallelization, test data, and flaky-test plan",
            "Release confidence dashboard and quality gates",
            "Ownership model so the improvement survives",
          ],
        },
        {
          eyebrow: "Part-time leadership",
          title: "Fractional Head of QA",
          description:
            "Senior QA leadership for scaling teams that need direction, standards, mentoring, and operating rhythm without a full-time hire.",
          outcomes: [
            "QA operating model and responsibilities",
            "Metrics, OKRs, review cadence, and stakeholder reporting",
            "Hiring, onboarding, mentoring, and lead development",
            "Automation governance and cross-team dependency process",
          ],
        },
      ],
    },
    method: {
      kicker: "Method",
      title: "A practical operating-system approach to QA.",
      items: [
        {
          step: "01",
          title: "Observe the real system",
          text:
            "Interviews, workflow review, Jira/Confluence sampling, regression and CI/CD analysis, release incident patterns, and team ownership mapping.",
        },
        {
          step: "02",
          title: "Separate symptoms from causes",
          text:
            "The goal is not more process. It is finding the few constraints that make releases slow, risky, expensive, or emotionally exhausting.",
        },
        {
          step: "03",
          title: "Design practical interventions",
          text:
            "Prioritized improvements across people, test strategy, automation, data, environments, reporting, onboarding, and release governance.",
        },
        {
          step: "04",
          title: "Transfer ownership",
          text:
            "The work ends with an operating model, documentation, review cadence, and team habits that continue after the engagement.",
        },
      ],
    },
    founder: {
      kicker: "Led by Viacheslav Melnikov",
      title:
        "Head of QA with the technical depth to inspect the system and the leadership range to change it.",
      paragraphs: [
        "Experience includes scaling distributed QA teams, reducing regression runtime, designing onboarding systems, enabling QA ownership of CI/CD, building performance testing practices, and introducing AI-assisted workflows for Jira, Confluence, and test management.",
        "Domain background spans telecom, fintech, trading systems, enterprise software, SDN/NFV, infrastructure, document security, and SaaS-style product delivery.",
      ],
    },
    plan: {
      kicker: "Next step",
      title:
        "Start with a focused diagnostic, then decide whether implementation support is worth it.",
      text:
        "The first commercial experiment should be a fixed-scope Quality System Diagnostic. It is easier to buy, easier to deliver, and creates a natural path into a Regression Rescue Sprint or Fractional Head of QA engagement.",
      action: "Discuss diagnostic",
    },
  },
  ru: {
    metadata: {
      title: "QualityOps Studio | Системы качества для предсказуемых релизов",
      description:
        "Консалтинг по quality operations для растущих engineering-команд: быстрее регрессия, яснее ownership, сильнее сигнал автоматизации и больше уверенности в релизах.",
    },
    nav: {
      aria: "Основная навигация",
      home: "QualityOps Studio на главную",
      offers: "Услуги",
      method: "Метод",
      plan: "План",
      language: "Язык",
    },
    labels: {
      results: "Избранные результаты",
    },
    hero: {
      kicker: "Системы качества для предсказуемых релизов",
      title: "Превращаем QA-бутылочные горлышки в систему уверенных релизов.",
      text:
        "QualityOps Studio помогает CTO, VP Engineering и продуктовым лидерам перестроить то, как качество работает между командами: быстрее регрессия, понятнее ответственность, точнее сигнал автоматизации и безопаснее релизы.",
      primary: "Запланировать диагностику",
      secondary: "Посмотреть услуги",
      panelLabel: "Консалтинг по release confidence",
      panelItems: ["Люди", "Процесс", "Автоматизация", "CI/CD", "Риски релиза"],
      panelText:
        "Основано на 20+ годах в IT и hands-on QA leadership в telecom, fintech, enterprise software, infrastructure и high-load продуктовых командах.",
    },
    proof: [
      {
        metric: "10ч -> 30м",
        label:
          "Сокращение межкомандной регрессии через автоматизацию, параллелизацию, тестовые данные и улучшения CI/CD.",
      },
      {
        metric: "-50%",
        label:
          "Снижение стоимости QA automation при одновременном росте покрытия и скорости выполнения.",
      },
      {
        metric: "30+",
        label: "Руководство распределёнными QA-инженерами в нескольких продуктовых командах.",
      },
      {
        metric: "1-2 недели",
        label:
          "Ускорение onboarding через кросс-функциональную систему адаптации.",
      },
    ],
    positioning: {
      kicker: "Позиционирование",
      title: "Не outsourced testing. Не очередной automation vendor.",
      paragraphs: [
        "Это работа для команд, где качество стало организационным ограничением. Продукт движется, команда растёт, но уверенность в релизах держится на медленной регрессии, хрупкой автоматизации, неясной ответственности и ручной координации.",
        "Модель консалтинга соединяет senior QA leadership, инженерный контекст, дизайн процессов, стратегию автоматизации и развитие команды. Итог — quality system, которую команда может поддерживать без постоянной внешней помощи.",
      ],
    },
    signals: {
      kicker: "Когда обращаться",
      title: "Полезно, когда проблемы качества уже видны в delivery.",
      items: [
        "Регрессия слишком медленная для частых релизов",
        "QA зависит от ручной координации, скрытых знаний или героизма отдельных людей",
        "Автоматизация есть, но её сигналу не доверяют",
        "Jira, Confluence и TMS есть, но реальной прозрачности не создают",
        "QA-инженеры выполняют задачи, но не владеют качеством продукта",
        "AI-инструменты используются точечно, без quality workflow",
      ],
    },
    offers: {
      kicker: "Консалтинговые продукты",
      title: "Три понятных способа купить работу.",
      items: [
        {
          eyebrow: "2-3 недели",
          title: "Quality System Diagnostic",
          description:
            "Фокусный аудит того, как качество реально проходит через команду: требования, Jira, регрессия, автоматизация, окружения, тестовые данные, release gates и ownership.",
          outcomes: [
            "Карта текущего QA и release flow",
            "Отчёт по рискам и bottlenecks с доказательствами",
            "30/60/90-дневный roadmap улучшений",
            "Executive workshop с практическими следующими шагами",
          ],
        },
        {
          eyebrow: "4-8 недель",
          title: "Regression Rescue Sprint",
          description:
            "Hands-on engagement для команд, где регрессия стала медленной, дорогой, flaky или недоверенной.",
          outcomes: [
            "Triage и приоритизация regression suite",
            "План по CI/CD, параллелизации, test data и flaky tests",
            "Dashboard release confidence и quality gates",
            "Модель ownership, чтобы улучшение пережило проект",
          ],
        },
        {
          eyebrow: "Part-time leadership",
          title: "Fractional Head of QA",
          description:
            "Senior QA leadership для растущих команд, которым нужны направление, стандарты, менторинг и операционный ритм без full-time найма.",
          outcomes: [
            "QA operating model и распределение ответственности",
            "Метрики, OKR, review cadence и отчётность для stakeholders",
            "Hiring, onboarding, mentoring и развитие лидов",
            "Automation governance и процесс межкомандных зависимостей",
          ],
        },
      ],
    },
    method: {
      kicker: "Метод",
      title: "Практичный operating-system подход к QA.",
      items: [
        {
          step: "01",
          title: "Увидеть реальную систему",
          text:
            "Интервью, обзор workflow, выборка Jira/Confluence, анализ регрессии и CI/CD, паттерны release incidents и карта ownership.",
        },
        {
          step: "02",
          title: "Отделить симптомы от причин",
          text:
            "Цель не в том, чтобы добавить процесс. Цель — найти несколько ограничений, из-за которых релизы становятся медленными, рискованными, дорогими или эмоционально тяжёлыми.",
        },
        {
          step: "03",
          title: "Спроектировать практичные изменения",
          text:
            "Приоритетные улучшения в людях, test strategy, automation, data, environments, reporting, onboarding и release governance.",
        },
        {
          step: "04",
          title: "Передать ownership",
          text:
            "Работа заканчивается operating model, документацией, review cadence и командными привычками, которые продолжают жить после engagement.",
        },
      ],
    },
    founder: {
      kicker: "Ведёт Viacheslav Melnikov",
      title:
        "Head of QA с технической глубиной, чтобы разобрать систему, и лидерским диапазоном, чтобы её изменить.",
      paragraphs: [
        "Опыт включает масштабирование распределённых QA-команд, сокращение времени регрессии, построение onboarding systems, ownership QA в CI/CD, практики performance testing и AI-assisted workflows для Jira, Confluence и test management.",
        "Доменные области: telecom, fintech, trading systems, enterprise software, SDN/NFV, infrastructure, document security и SaaS-style product delivery.",
      ],
    },
    plan: {
      kicker: "Следующий шаг",
      title:
        "Начать с фокусной диагностики, а потом решить, стоит ли подключать implementation support.",
      text:
        "Первый коммерческий эксперимент лучше делать как fixed-scope Quality System Diagnostic. Его проще купить, проще доставить, и он естественно ведёт к Regression Rescue Sprint или Fractional Head of QA engagement.",
      action: "Обсудить диагностику",
    },
  },
  sr: {
    metadata: {
      title: "QualityOps Studio | Sistemi kvaliteta za predvidive isporuke",
      description:
        "Quality operations konsalting za rastuće engineering timove: brža regresija, jasnije vlasništvo, bolji signal automatizacije i sigurniji release.",
    },
    nav: {
      aria: "Glavna navigacija",
      home: "QualityOps Studio početna",
      offers: "Usluge",
      method: "Metod",
      plan: "Plan",
      language: "Jezik",
    },
    labels: {
      results: "Izabrani rezultati",
    },
    hero: {
      kicker: "Sistemi kvaliteta za predvidive isporuke",
      title: "Pretvorite QA uska grla u sistem za pouzdane release-e.",
      text:
        "QualityOps Studio pomaže CTO-ima, VP Engineering liderima i product liderima da redizajniraju kako kvalitet funkcioniše između timova: brža regresija, jasnije vlasništvo, pametniji signal automatizacije i sigurnije isporuke.",
      primary: "Zakažite dijagnostiku",
      secondary: "Pogledajte usluge",
      panelLabel: "Release confidence advisory",
      panelItems: ["Ljudi", "Proces", "Automatizacija", "CI/CD", "Rizik release-a"],
      panelText:
        "Zasnovano na 20+ godina u IT-u i hands-on QA leadership iskustvu u telecom, fintech, enterprise software, infrastructure i high-load product timovima.",
    },
    proof: [
      {
        metric: "10h -> 30m",
        label:
          "Vreme regresije između timova smanjeno kroz automatizaciju, paralelizaciju, test data rad i CI/CD poboljšanja.",
      },
      {
        metric: "-50%",
        label:
          "Troškovi QA automatizacije smanjeni uz bolje pokrivanje i brže izvršavanje.",
      },
      {
        metric: "30+",
        label: "Vođenje distribuiranih QA inženjera kroz više product timova.",
      },
      {
        metric: "1-2 nedelje",
        label:
          "Brži onboarding kroz cross-functional sistem uvođenja novih ljudi.",
      },
    ],
    positioning: {
      kicker: "Pozicioniranje",
      title: "Nije outsourced testing. Nije generički automation vendor.",
      paragraphs: [
        "Ovo je rad za timove u kojima je kvalitet postao organizaciono ograničenje. Proizvod se kreće, tim raste, ali release confidence zavisi od spore regresije, krhke automatizacije, nejasnog vlasništva i previše ručne koordinacije.",
        "Konsalting model spaja senior QA leadership, engineering kontekst, dizajn procesa, strategiju automatizacije i osnaživanje tima. Ishod je quality system koji tim može da vodi bez stalne spoljne pomoći.",
      ],
    },
    signals: {
      kicker: "Kada se javiti",
      title: "Korisno kada su problemi kvaliteta već vidljivi u delivery-ju.",
      items: [
        "Regresija je prespora za česte release-e",
        "QA zavisi od ručne koordinacije, skrivenog znanja ili heroizma pojedinaca",
        "Automatizacija postoji, ali tim ne veruje njenom signalu",
        "Jira, Confluence i TMS postoje, ali ne daju stvarnu vidljivost",
        "QA inženjeri izvršavaju zadatke, ali ne poseduju kvalitet proizvoda",
        "AI alati se koriste ad hoc, bez quality workflow-a",
      ],
    },
    offers: {
      kicker: "Konsalting proizvodi",
      title: "Tri jasna načina da kupite rad.",
      items: [
        {
          eyebrow: "2-3 nedelje",
          title: "Quality System Diagnostic",
          description:
            "Fokusiran pregled kako kvalitet zaista prolazi kroz tim: zahtevi, Jira, regresija, automatizacija, okruženja, test podaci, release gates i ownership.",
          outcomes: [
            "Mapa trenutnog QA i release toka",
            "Izveštaj o rizicima i bottleneck-ovima sa dokazima",
            "30/60/90-dnevni roadmap poboljšanja",
            "Executive workshop sa praktičnim sledećim koracima",
          ],
        },
        {
          eyebrow: "4-8 nedelja",
          title: "Regression Rescue Sprint",
          description:
            "Hands-on engagement za timove čiji je regression cycle postao spor, skup, flaky ili nepouzdan.",
          outcomes: [
            "Triage i prioritizacija regression suite-a",
            "Plan za CI/CD, paralelizaciju, test data i flaky testove",
            "Release confidence dashboard i quality gates",
            "Ownership model da poboljšanje preživi projekat",
          ],
        },
        {
          eyebrow: "Part-time leadership",
          title: "Fractional Head of QA",
          description:
            "Senior QA leadership za rastuće timove kojima trebaju smer, standardi, mentoring i operativni ritam bez full-time zapošljavanja.",
          outcomes: [
            "QA operating model i odgovornosti",
            "Metrike, OKR, review cadence i stakeholder reporting",
            "Hiring, onboarding, mentoring i razvoj leadova",
            "Automation governance i proces za međutimsku zavisnost",
          ],
        },
      ],
    },
    method: {
      kicker: "Metod",
      title: "Praktičan operating-system pristup QA-u.",
      items: [
        {
          step: "01",
          title: "Posmatrati stvarni sistem",
          text:
            "Intervjui, pregled workflow-a, uzorci iz Jira/Confluence, analiza regresije i CI/CD-a, obrasci release incidenta i mapa timskog vlasništva.",
        },
        {
          step: "02",
          title: "Odvojiti simptome od uzroka",
          text:
            "Cilj nije više procesa. Cilj je pronaći nekoliko ograničenja koja release čine sporim, rizičnim, skupim ili emocionalno iscrpljujućim.",
        },
        {
          step: "03",
          title: "Dizajnirati praktične intervencije",
          text:
            "Prioritetna poboljšanja kroz ljude, test strategiju, automatizaciju, podatke, okruženja, reporting, onboarding i release governance.",
        },
        {
          step: "04",
          title: "Preneti ownership",
          text:
            "Rad se završava operating modelom, dokumentacijom, review cadence-om i timskim navikama koje nastavljaju posle engagement-a.",
        },
      ],
    },
    founder: {
      kicker: "Vodi Viacheslav Melnikov",
      title:
        "Head of QA sa tehničkom dubinom da pregleda sistem i leadership opsegom da ga promeni.",
      paragraphs: [
        "Iskustvo uključuje skaliranje distribuiranih QA timova, smanjenje vremena regresije, dizajn onboarding sistema, QA ownership u CI/CD-u, performance testing prakse i AI-assisted workflows za Jira, Confluence i test management.",
        "Domeni uključuju telecom, fintech, trading systems, enterprise software, SDN/NFV, infrastructure, document security i SaaS-style product delivery.",
      ],
    },
    plan: {
      kicker: "Sledeći korak",
      title:
        "Počnite fokusiranom dijagnostikom, zatim odlučite da li implementation support ima smisla.",
      text:
        "Prvi komercijalni eksperiment treba da bude fixed-scope Quality System Diagnostic. Lakše ga je kupiti, lakše isporučiti, i prirodno vodi ka Regression Rescue Sprint ili Fractional Head of QA engagement-u.",
      action: "Razgovarajmo o dijagnostici",
    },
  },
} as const;

export type Dictionary = (typeof dictionaries)[Locale];
