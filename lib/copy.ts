import type { Locale } from "@/lib/i18n";

type LinkItem = { label: string; href: string };
type Cta = { label: string; href: string };

export type SiteCopy = {
  brand: {
    name: string;
    domain: string;
    emails: { trade: string; execution: string };
    tagline: Record<Locale, string>;
    subtagline: Record<Locale, string>;
  };
  seo: Record<Locale, { title: string; description: string; ogTitle: string; ogDescription: string }>;
  nav: Record<Locale, LinkItem[]>;
  hero: Record<Locale, { h1Lines: string[]; leadLines: string[]; ctaPrimary: Cta; ctaSecondary: Cta }>;
  solutions: Record<Locale, { title: string; subtitle: string; items: Array<{ title: string; text: string }> }>;
  process: Record<Locale, { title: string; steps: Array<{ title: string; text: string; meta: string[] }> }>;
  factsStrip: Record<Locale, { items: string[] }>;
  markets: Record<Locale, { title: string; subtitle: string; items: string[]; markers: Array<{ key: string; label: string }> }>;
  network: Record<Locale, { title: string; items: string[] }>;
  scope: Record<
    Locale,
    {
      title: string;
      subtitle: string;
      matrix: { leftTitle: string; leftItems: string[]; rightTitle: string; rightItems: string[] };
      note: string;
    }
  >;
  about: Record<Locale, { title: string; text: string }>;
  faq: Record<Locale, { title: string; items: Array<{ q: string; a: string }> }>;
  live: {
    fx: {
      enabled: boolean;
      title: Record<Locale, string>;
      pairs: string[];
      sourceLabel: Record<Locale, string>;
      staticNote: Record<Locale, string>;
    };
    clocks: {
      enabled: boolean;
      title: Record<Locale, string>;
      zones: Array<{ label: string; tz: string }>;
      businessWindow: {
        tz: string;
        weekdays: number[];
        open: string;
        close: string;
        labels: Record<Locale, { open: string; closed: string; next: string }>;
      };
    };
  };
  contact: Record<Locale, { title: string; lead: string; cards: Array<{ title: string; email: string }> }>;
  privacy: Record<Locale, { title: string; sections: Array<{ heading: string; text: string }> }>;
  footer: Record<Locale, { privacyLabel: string; note: string; businessWindowLabel: string }>;
  ui: Record<Locale, { switchLanguage: string; switchTheme: string; ratesUnavailable: string; themeLight: string; themeDark: string }>;
};

const siteCopy: SiteCopy = {
  brand: {
    name: "Trade Solutions",
    domain: "https://trade-solution.eu/",
    emails: {
      trade: "trade@trade-solution.eu",
      execution: "execution@trade-solution.eu"
    },
    tagline: {
      en: "Structured trade. Managed risk.",
      bg: "Structured trade. Managed risk."
    },
    subtagline: {
      en: "Operational Control. Risk Awareness.",
      bg: "Оперативен контрол. Осъзнат риск."
    }
  },
  seo: {
    en: {
      title: "Trade Solutions — Structured trade. Managed risk.",
      description:
        "Structured trade and logistics solutions for agricultural products entering European markets—clear execution, defined risk parameters.",
      ogTitle: "Trade Solutions",
      ogDescription: "Structured trade. Managed risk."
    },
    bg: {
      title: "Trade Solutions — Structured trade. Managed risk.",
      description:
        "Структурирани търговски и логистични решения за агропродукция към европейските пазари—ясно изпълнение, дефиниран риск.",
      ogTitle: "Trade Solutions",
      ogDescription: "Structured trade. Managed risk."
    }
  },
  nav: {
    en: [
      { label: "Solutions", href: "#solutions" },
      { label: "Process", href: "#process" },
      { label: "Scope", href: "#scope" },
      { label: "About", href: "#about" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" }
    ],
    bg: [
      { label: "Решения", href: "#solutions" },
      { label: "Процес", href: "#process" },
      { label: "Обхват", href: "#scope" },
      { label: "За нас", href: "#about" },
      { label: "Въпроси", href: "#faq" },
      { label: "Контакти", href: "#contact" }
    ]
  },
  hero: {
    en: {
      h1Lines: ["Structured trade.", "Managed risk."],
      leadLines: [
        "We design and support trade decisions",
        "where contracts, logistics and execution constraints",
        "meet defined risk parameters."
      ],
      ctaPrimary: { label: "Request a consultation", href: "mailto:trade@trade-solution.eu" },
      ctaSecondary: { label: "Execution support", href: "mailto:execution@trade-solution.eu" }
    },
    bg: {
      h1Lines: ["Structured trade.", "Managed risk."],
      leadLines: [
        "Проектираме и подкрепяме търговски решения",
        "където логистика, договори и изпълнение",
        "се срещат с дефинирани параметри на риска."
      ],
      ctaPrimary: { label: "Запитване", href: "mailto:trade@trade-solution.eu" },
      ctaSecondary: { label: "Изпълнение", href: "mailto:execution@trade-solution.eu" }
    }
  },
  solutions: {
    en: {
      title: "Solutions",
      subtitle: "Structured delivery across trade and logistics.",
      items: [
        { title: "Market context", text: "Define context and constraints for robust decisions." },
        { title: "Trade structuring", text: "Build contract-ready structures aligned to objectives." },
        { title: "Risk scenarios", text: "Model scenarios and set risk parameters before execution." },
        { title: "Execution support", text: "Coordinate documentation and execution when required." }
      ]
    },
    bg: {
      title: "Решения",
      subtitle: "Структурирана реализация в търговия и логистика.",
      items: [
        { title: "Пазарен контекст", text: "Дефинираме контекст и ограничения за устойчиви решения." },
        { title: "Търговска структура", text: "Изграждаме договорно-готови структури според целите." },
        { title: "Риск сценарии", text: "Моделираме сценарии и задаваме риск параметри преди изпълнение." },
        { title: "Подкрепа при изпълнение", text: "Координираме документация и изпълнение при необходимост." }
      ]
    }
  },
  process: {
    en: {
      title: "How we work",
      steps: [
        { title: "Context alignment", text: "Goals, constraints, priorities.", meta: ["constraints", "timing", "responsibilities"] },
        { title: "Strategy design", text: "Instruments, scenarios, decision logic.", meta: ["scenario set", "risk params", "assumptions"] },
        { title: "Structure & execution", text: "Contract logic and execution control.", meta: ["docs", "routing", "execution plan"] },
        { title: "Review & adjustment", text: "Feedback loop and refinement.", meta: ["review", "adjust", "report"] }
      ]
    },
    bg: {
      title: "Как работим",
      steps: [
        { title: "Изясняване на контекста", text: "Цели, ограничения, приоритети.", meta: ["ограничения", "тайминг", "отговорности"] },
        { title: "Дизайн на стратегия", text: "Инструменти, сценарии, логика.", meta: ["сценарии", "риск параметри", "допускания"] },
        { title: "Структура и изпълнение", text: "Договорна логика и контрол.", meta: ["документи", "маршрути", "план"] },
        { title: "Преглед и адаптация", text: "Обратна връзка и корекции.", meta: ["преглед", "корекции", "отчет"] }
      ]
    }
  },
  factsStrip: {
    en: {
      items: [
        "European markets focus",
        "Structured risk parameters",
        "Contract-ready documentation",
        "Execution coordination"
      ]
    },
    bg: {
      items: [
        "Фокус върху европейските пазари",
        "Структурирани риск параметри",
        "Документация, готова за договор",
        "Координация на изпълнението"
      ]
    }
  },
  markets: {
    en: {
      title: "Markets / Geography",
      subtitle: "Structured coordination across practical European routes and handover points.",
      items: [
        "Market entry planning",
        "Routing & timing constraints",
        "Documentation & handover",
        "Risk limits and scenario gates"
      ],
      markers: [
        { key: "bg", label: "bg (Bulgaria)" },
        { key: "central-europe", label: "central-europe" },
        { key: "balkans", label: "balkans" },
        { key: "western-europe", label: "western-europe" },
        { key: "black-sea-routes", label: "black-sea-routes" }
      ]
    },
    bg: {
      title: "Пазари / География",
      subtitle: "Структурирана координация по практични европейски маршрути и точки за предаване.",
      items: [
        "Планиране на пазарен достъп",
        "Ограничения: маршрути и срокове",
        "Документация и предаване",
        "Риск лимити и сценарии"
      ],
      markers: [
        { key: "bg", label: "bg (България)" },
        { key: "central-europe", label: "централна-европа" },
        { key: "balkans", label: "балкани" },
        { key: "western-europe", label: "западна-европа" },
        { key: "black-sea-routes", label: "черноморски-маршрути" }
      ]
    }
  },
  network: {
    en: {
      title: "Operational network",
      items: ["processors", "trading companies", "logistics operators", "institutional counterparties"]
    },
    bg: {
      title: "Оперативна мрежа",
      items: ["преработватели", "търговски компании", "логистични оператори", "институционални контрагенти"]
    }
  },
  scope: {
    en: {
      title: "Scope",
      subtitle: "Broad specialization, structured delivery.",
      matrix: {
        leftTitle: "Trade layer",
        leftItems: ["market context", "structure", "contracts"],
        rightTitle: "Logistics layer",
        rightItems: ["routing", "timing", "coordination", "documentation"]
      },
      note: "Designed for European markets."
    },
    bg: {
      title: "Обхват",
      subtitle: "Широка специализация, структурирана реализация.",
      matrix: {
        leftTitle: "Търговски слой",
        leftItems: ["пазарен контекст", "структура", "договори"],
        rightTitle: "Логистичен слой",
        rightItems: ["маршрути", "тайминг", "координация", "документация"]
      },
      note: "Проектирано за европейските пазари."
    }
  },
  about: {
    en: {
      title: "About",
      text: "Trade Solutions supports commercial teams that need structure before they need volume. We map market context, contract logic, and logistics constraints into a practical execution framework. Our focus is operational clarity: who does what, when, and under which risk limits. We are not a commodity broker, not a prop trader, and not a price board. The work is designed to keep decisions measurable, documented, and executable in real conditions."
    },
    bg: {
      title: "За нас",
      text: "Trade Solutions подпомага търговски екипи, когато е нужна структура преди обем. Подреждаме пазарен контекст, договорна логика и логистични ограничения в практична рамка за изпълнение. Фокусът ни е оперативна яснота: кой, какво и кога изпълнява при предварително зададени риск параметри. Не сме commodity брокер, не сме prop trader и не сме „витрина с цени“. Подходът е насочен към измерими, документирани и приложими в реални условия решения."
    }
  },
  faq: {
    en: {
      title: "FAQ",
      items: [
        {
          q: "What does Trade Solutions do?",
          a: "We structure trade and logistics solutions and support decision-making where contracts, execution constraints and risk parameters intersect."
        },
        {
          q: "Are you a commodity broker?",
          a: "No. We are not a classical commodity broker, not a prop trader and not a price board. We focus on structuring and operational support."
        },
        {
          q: "Do you support execution and documentation?",
          a: "Yes, when required. We coordinate execution and documentation through established operational channels."
        },
        {
          q: "What markets do you focus on?",
          a: "European markets, with a practical focus on agricultural products and trade-logistics chains."
        },
        {
          q: "How do we start?",
          a: "Email product details, destination market, timing and constraints. We respond with a structured next-step plan."
        },
        {
          q: "Do you collect personal data on the website?",
          a: "No. The website has no analytics or marketing cookies. If you email us, we use your message only to respond and can delete it on request."
        }
      ]
    },
    bg: {
      title: "Често задавани въпроси",
      items: [
        {
          q: "Какво прави Trade Solutions?",
          a: "Структурираме търговски и логистични решения и подпомагаме вземането на решения там, където се срещат договори, ограничения и риск параметри."
        },
        {
          q: "Вие брокер ли сте?",
          a: "Не. Не сме класически commodity брокер, не сме prop trader и не сме „витрина с цени“. Фокусът ни е структуриране и оперативна подкрепа."
        },
        {
          q: "Подпомагате ли изпълнение и документация?",
          a: "Да, при необходимост. Координираме изпълнение и документация чрез утвърдени оперативни канали."
        },
        {
          q: "Кои пазари са приоритет?",
          a: "Европейските пазари, с практичен фокус върху агропродукция и търговско-логистични вериги."
        },
        {
          q: "Как започваме?",
          a: "Пишете ни с продукт, целеви пазар, тайминг и ограничения. Връщаме структуриран план за следващите стъпки."
        },
        {
          q: "Събирате ли лични данни през сайта?",
          a: "Не. Сайтът няма аналитика и маркетингови „бисквитки“. Ако ни пишете по имейл, използваме съобщението само за отговор и изтриваме при поискване."
        }
      ]
    }
  },
  live: {
    fx: {
      enabled: true,
      title: { en: "FX reference rates", bg: "Референтни FX курсове" },
      pairs: ["EURUSD", "EURGBP", "EURPLN"],
      sourceLabel: { en: "Updated daily (ECB)", bg: "Обновява се ежедневно (ECB)" },
      staticNote: { en: "Fixed conversion: 1 EUR = 1.95583 BGN", bg: "Фиксирана конверсия: 1 EUR = 1.95583 BGN" }
    },
    clocks: {
      enabled: true,
      title: { en: "World time", bg: "Световно време" },
      zones: [
        { label: "Sofia", tz: "Europe/Sofia" },
        { label: "Kyiv", tz: "Europe/Kyiv" },
        { label: "New York", tz: "America/New_York" },
        { label: "London", tz: "Europe/London" },
        { label: "Tokyo", tz: "Asia/Tokyo" },
        { label: "Hong Kong", tz: "Asia/Hong_Kong" }
      ],
      businessWindow: {
        tz: "Europe/Sofia",
        weekdays: [1, 2, 3, 4, 5],
        open: "09:00",
        close: "18:00",
        labels: {
          en: { open: "OPEN", closed: "CLOSED", next: "Next window" },
          bg: { open: "ОТВОРЕНО", closed: "ЗАТВОРЕНО", next: "Следващ прозорец" }
        }
      }
    }
  },
  contact: {
    en: {
      title: "Contact",
      lead: "Write to us. We respond clearly and in a structured format.",
      cards: [
        { title: "Trade & partnerships", email: "trade@trade-solution.eu" },
        { title: "Execution & operations", email: "execution@trade-solution.eu" }
      ]
    },
    bg: {
      title: "Контакти",
      lead: "Пишете ни. Отговаряме ясно и структурирано.",
      cards: [
        { title: "Търговия и партньорства", email: "trade@trade-solution.eu" },
        { title: "Изпълнение и операции", email: "execution@trade-solution.eu" }
      ]
    }
  },
  privacy: {
    en: {
      title: "Privacy",
      sections: [
        {
          heading: "Purpose and scope",
          text: "This Privacy Notice explains how information is handled when you visit this website and when you contact us by email."
        },
        {
          heading: "Cookies and analytics",
          text: "This website does not use analytics or marketing cookies. We do not run tracking scripts for profiling or advertising purposes."
        },
        {
          heading: "Information you provide by email",
          text: "If you contact us at trade@trade-solution.eu or execution@trade-solution.eu, we will process the information you include in your message (such as your name, email address and any business details you share) solely for the purpose of responding to your enquiry and continuing the correspondence you initiated."
        },
        {
          heading: "Data minimisation and retention",
          text: "We aim to collect only the information necessary to handle your request. We keep correspondence for as long as reasonably required to respond and to maintain a record of business communication."
        },
        {
          heading: "Your request",
          text: "You may request deletion of email correspondence by contacting trade@trade-solution.eu. We will handle such requests within a reasonable time frame."
        }
      ]
    },
    bg: {
      title: "Поверителност",
      sections: [
        {
          heading: "Цел и обхват",
          text: "Настоящото Уведомление за поверителност обяснява как се обработва информацията при посещение на този уебсайт и при контакт с нас по имейл."
        },
        {
          heading: "„Бисквитки“ и аналитика",
          text: "Този сайт не използва аналитични или маркетингови „бисквитки“. Не използваме тракинг скриптове за профилиране или рекламни цели."
        },
        {
          heading: "Информация, предоставена по имейл",
          text: "Ако се свържете с нас на trade@trade-solution.eu или execution@trade-solution.eu, ще обработим информацията, която включвате в съобщението (например име, имейл адрес и бизнес детайли), единствено с цел да отговорим на запитването и да продължим кореспонденцията, която сте започнали."
        },
        {
          heading: "Минимизиране и съхранение",
          text: "Стремим се да обработваме само необходимата информация за изпълнение на целта. Съхраняваме кореспонденцията за срок, който е разумно необходим за отговор и за водене на запис на бизнес комуникация."
        },
        {
          heading: "Ваше искане",
          text: "Можете да поискате изтриване на имейл кореспонденция, като пишете на trade@trade-solution.eu. Ще обработим искането в разумен срок."
        }
      ]
    }
  },
  footer: {
    en: {
      privacyLabel: "Privacy",
      note: "No analytics. No marketing cookies.",
      businessWindowLabel: "Business window"
    },
    bg: {
      privacyLabel: "Поверителност",
      note: "Без аналитика. Без маркетингови „бисквитки“.",
      businessWindowLabel: "Работен прозорец"
    }
  },
  ui: {
    en: {
      switchLanguage: "Switch language",
      switchTheme: "Switch theme",
      ratesUnavailable: "Rates unavailable",
      themeLight: "Light",
      themeDark: "Dark"
    },
    bg: {
      switchLanguage: "Смяна на език",
      switchTheme: "Смяна на тема",
      ratesUnavailable: "Курсовете са недостъпни",
      themeLight: "Светла",
      themeDark: "Тъмна"
    }
  }
};

export function getCopy() {
  return siteCopy;
}
