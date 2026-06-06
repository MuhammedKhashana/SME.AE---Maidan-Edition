/* ============================================================
   Single source of truth — Sport Middle East · Company Profile 2024
   ============================================================ */

export interface Bilingual { en: string; ar: string; }
export interface BilingualHtml extends Bilingual { isHtml: true; }
export interface StatItem {
  countTo: number; suffix: string; label: Bilingual;
  isStatic?: boolean; staticDisplay?: string;
}
export interface ServiceItem {
  number: string; title: Bilingual; description: Bilingual;
  tags: string[]; placeholder: string;
  imageUrl?: string; videoUrl?: string;
  accentClass: 'text-red' | 'text-green';
  revealDir: 'slide-left' | 'slide-right';
}
export interface RegionCard {
  placeholder: string; badge: Bilingual; title: Bilingual;
  subtitle: string; badgeColor: string;
  revealDir: 'slide-left' | 'slide-right'; delay?: number;
  imageUrl?: string; videoUrl?: string;
}
export interface WorkCardMetric { value: string; label: string; }
export interface WorkCard {
  title: string; regionTag: string; metrics: WorkCardMetric[];
  placeholder: string; imageUrl?: string; videoUrl?: string;
  colSpan: 1 | 2; aspectClass: string;
}

const CDN = 'https://res.cloudinary.com/dcr7coe1m/video/upload';

// ─── Navigation ──────────────────────────────────────────────
export const NAV_LINKS: { href: string; label: Bilingual }[] = [
  { href: '#work', label: { en: 'Work', ar: 'الأعمال' } },
  { href: '#studio', label: { en: 'Services', ar: 'خدماتنا' } },
  { href: '#region', label: { en: 'Region', ar: 'المنطقة' } },
  { href: '#voice', label: { en: 'About', ar: 'من نحن' } },
];
export const NAV_CTA: Bilingual = { en: "Let's create", ar: 'تواصل معنا' };

// ─── Hero ─────────────────────────────────────────────────────
export const HERO_MEDIA = {
  backgroundVideo: `${CDN}/v1780760748/VID-20260606-WA0007_vytmab.mp4`,
  backgroundImage: '',
};

export const HERO_EYEBROW: Bilingual = {
  en: 'Sports Event Services · Est. 2019 · Dubai, UAE',
  ar: 'خدمات الفعاليات الرياضية · تأسست 2019 · دبي، الإمارات',
};

export const HERO_HEADLINE: string[] = ['SPORT', 'MIDDLE', 'EAST'];

export const HERO_BODY: BilingualHtml = {
  en: "We organise it, coordinate it, and make the region <b class='text-white font-semibold'>experience it.</b> From high-performance training camps to landmark friendly matches — delivering world-class sports events across the Middle East.",
  ar: "ننظّمها، ننسّقها، ونجعل المنطقة <b class='text-white font-semibold'>تعيشها.</b> من معسكرات التدريب عالية الأداء إلى المباريات الودية البارزة — نقدّم فعاليات رياضية عالمية المستوى عبر الشرق الأوسط.",
  isHtml: true,
};

export const HERO_STATS: StatItem[] = [
  { countTo: 7, suffix: '+', label: { en: 'Years active', ar: 'سنوات خبرة' } },
  { countTo: 20, suffix: '+', label: { en: 'Partner clubs', ar: 'نادٍ شريك' } },
  { countTo: 10, suffix: '+', label: { en: 'Countries', ar: 'دولة' } },
];

export const HERO_CTA_PRIMARY: Bilingual = { en: "Let's work together", ar: 'تواصل معنا' };
export const HERO_CTA_SECONDARY: Bilingual = { en: 'See the work', ar: 'شاهد الأعمال' };

export const HERO_BILLING: Array<Bilingual | string> = [
  { en: 'Sport Middle East', ar: 'سبورت ميدل إيست' },
  '—',
  { en: 'Sports Event Services', ar: 'خدمات الفعاليات الرياضية' },
  '—',
  { en: 'Dubai, United Arab Emirates', ar: 'دبي، الإمارات العربية المتحدة' },
  '—',
  { en: 'Training · Matches · Events · Logistics', ar: 'تدريب · مباريات · فعاليات · لوجستيات' },
];

// ─── Studio / Services ────────────────────────────────────────
export const STUDIO_META = {
  number: '01',
  eyebrow: { en: 'What we do', ar: 'ما نقدّمه' } as Bilingual,
  heading: { en: 'FOUR WAYS WE', ar: 'أربع طرق' } as Bilingual,
  headingAccent: { en: 'POWER YOUR EVENT', ar: 'ندعم بها فعاليتك' } as Bilingual,
  description: { en: 'One sports event house across the Middle East — we organise it, coordinate it, and deliver it from A to Z.', ar: 'بيت واحد للفعاليات الرياضية عبر الشرق الأوسط — ننظّمها، ننسّقها، ونُسلّمها من الألف إلى الياء.' } as Bilingual,
};

export const SERVICES: ServiceItem[] = [
  {
    number: '01',
    title: { en: 'Training Camps', ar: 'معسكرات التدريب' },
    description: {
      en: 'High-performance training camps with access to world-class facilities, certified coaches, tailored programs, sports science, nutrition support, and full accommodation arrangements.',
      ar: 'معسكرات تدريب عالية الأداء مع أفضل المرافق، مدربين معتمدين، برامج مخصصة، علوم رياضية، دعم غذائي، وترتيبات إقامة كاملة.',
    },
    tags: ['Modern Facilities', 'Custom Programs', 'Sports Science', 'Accommodation'],
    placeholder: 'Training camp — 16:10',
    videoUrl: `${CDN}/v1780760989/VID-20260606-WA0009_1_c4gdab.mp4`,
    accentClass: 'text-red',
    revealDir: 'slide-left',
  },
  {
    number: '02',
    title: { en: 'Friendly Match Coordination', ar: 'تنظيم المباريات الودية' },
    description: {
      en: 'End-to-end coordination of local and international friendly matches — scheduling, opponent selection, venue booking, certified referees and officials, and post-match analysis.',
      ar: 'تنسيق شامل للمباريات الودية المحلية والدولية — الجدولة، اختيار الخصم، حجز الملاعب، حكام ومسؤولون معتمدون، وتحليل ما بعد المباراة.',
    },
    tags: ['Match Scheduling', 'Venue Booking', 'Certified Referees', 'Analysis'],
    placeholder: 'Friendly match — 16:10',
    videoUrl: `${CDN}/v1780760694/VID-20260605-WA0035_gqns1f.mp4`,
    accentClass: 'text-green',
    revealDir: 'slide-right',
  },
  {
    number: '03',
    title: { en: 'Event Management', ar: 'إدارة الفعاليات' },
    description: {
      en: 'Complete management of sports events from planning to execution — event design, logistics, permits, staff and volunteer management, sponsor coordination, marketing, and on-site operations.',
      ar: 'إدارة شاملة للفعاليات الرياضية من التخطيط حتى التنفيذ — التصميم، اللوجستيات، التصاريح، الكوادر البشرية، تنسيق الرعاة، التسويق، وإدارة الموقع.',
    },
    tags: ['Event Design', 'Logistics & Permits', 'Sponsorships', 'On-site Ops'],
    placeholder: 'Event management — 16:10',
    videoUrl: `${CDN}/v1780760975/VID-20260606-WA0019_qjuyif.mp4`,
    accentClass: 'text-red',
    revealDir: 'slide-left',
  },
  {
    number: '04',
    title: { en: 'Logistical Support', ar: 'الدعم اللوجستي' },
    description: {
      en: 'Full logistical support for teams traveling to and within the UAE — VIP travel and transportation, hotel bookings, itinerary planning, equipment management, and on-site medical staff.',
      ar: 'دعم لوجستي كامل للفرق المتوجهة إلى الإمارات — سفر ونقل VIP، حجز فنادق، تخطيط برامج الإقامة، إدارة المعدات، وكوادر طبية في الموقع.',
    },
    tags: ['VIP Transport', 'Hotel Booking', 'Itinerary', 'Medical Staff'],
    placeholder: 'Logistics — 16:10',
    videoUrl: `${CDN}/v1780760963/VID-20260606-WA0008_i3llhr.mp4`,
    accentClass: 'text-green',
    revealDir: 'slide-right',
  },
];

// ─── Region ───────────────────────────────────────────────────
export const REGION_META = {
  number: '02',
  eyebrow: { en: 'Across the region', ar: 'عبر المنطقة' } as Bilingual,
  heading: { en: 'FROM THE GULF', ar: 'من الخليج' } as Bilingual,
  headingAccent: { en: 'TO THE NILE', ar: 'إلى النيل' } as Bilingual,
};

export const REGION_CARDS: RegionCard[] = [
  {
    placeholder: 'UAE — Abu Dhabi · Dubai',
    badge: { en: 'Home base', ar: 'المقر الرئيسي' },
    title: { en: 'UNITED ARAB EMIRATES', ar: 'الإمارات العربية المتحدة' },
    subtitle: 'Abu Dhabi · Dubai · Sharjah',
    badgeColor: 'text-red',
    revealDir: 'slide-left',
    videoUrl: `${CDN}/v1780760672/VID-20260605-WA0030_kjcr4p.mp4`,
  },
  {
    placeholder: 'Egypt — Cairo · Alexandria',
    badge: { en: 'Gateway to the Nile', ar: 'بوابة النيل' },
    title: { en: 'ARAB REP. OF EGYPT', ar: 'جمهورية مصر العربية' },
    subtitle: 'Cairo · Alexandria · Across the MENA',
    badgeColor: 'text-green',
    revealDir: 'slide-right',
    delay: 120,
    videoUrl: `${CDN}/v1780761020/VID-20260606-WA0011_xc3zbv.mp4`,
  },
];

// ─── Work ─────────────────────────────────────────────────────
export const WORK_META = {
  number: '03',
  eyebrow: { en: 'The work', ar: 'الأعمال' } as Bilingual,
  heading: { en: 'THE MOMENTS', ar: 'اللحظات التي' } as Bilingual,
  headingAccent: { en: "WE'VE MADE", ar: 'صنعناها' } as Bilingual,
};

export const WORK_CARDS: WorkCard[] = [
  {
    title: 'Al Wahda Cup 2024',
    regionTag: 'UAE · Abu Dhabi',
    metrics: [
      { value: '6+', label: 'clubs' },
      { value: 'Al Nahyan', label: 'stadium' },
      { value: 'A–Z', label: 'managed' },
    ],
    placeholder: 'Al Wahda Cup 2024',
    videoUrl: `${CDN}/v1780760672/VID-20260605-WA0030_kjcr4p.mp4`,
    colSpan: 2,
    aspectClass: 'aspect-[16/9]',
  },
  {
    title: 'Legends Night',
    regionTag: 'UAE · Sky News Arabia',
    metrics: [
      { value: '10+', label: 'legends' },
      { value: 'Roberto Carlos', label: '· Cafu · Figo' },
    ],
    placeholder: 'Legends Night',
    videoUrl: `${CDN}/v1780760578/VID-20260606-WA0006_eqnigl.mp4`,
    colSpan: 1,
    aspectClass: 'aspect-[16/9] lg:aspect-[4/5]',
  },
  {
    title: 'Chinese Teams Training Camp',
    regionTag: 'UAE · Football',
    metrics: [
      { value: '3+', label: 'Chinese clubs' },
      { value: 'Full', label: 'A–Z logistics' },
    ],
    placeholder: 'Chinese Training Camp',
    videoUrl: `${CDN}/v1780760694/VID-20260605-WA0035_gqns1f.mp4`,
    colSpan: 1,
    aspectClass: 'aspect-[16/9]',
  },
  {
    title: '5th Emirates Cup · Rhythmic Gymnastics',
    regionTag: 'UAE · Abu Dhabi 2022',
    metrics: [
      { value: '10+', label: 'nations' },
      { value: 'International', label: 'level' },
    ],
    placeholder: '5th Emirates Cup · Rhythmic Gymnastics',
    videoUrl: `${CDN}/v1780760585/VID-20260605-WA0032_pcb4dl.mp4`,
    colSpan: 1,
    aspectClass: 'aspect-[16/9]',
  },
  {
    title: 'Zamalek × Al Wahda · MENA Friendly',
    regionTag: 'MENA · Tournament',
    metrics: [
      { value: 'Al Nahyan', label: 'stadium' },
      { value: 'MENA', label: 'region teams' },
      { value: 'A–Z', label: 'organised' },
    ],
    placeholder: 'Zamalek × Al Wahda Friendly',
    videoUrl: `${CDN}/v1780761020/VID-20260606-WA0011_xc3zbv.mp4`,
    colSpan: 2,
    aspectClass: 'aspect-[16/9]',
  },
];

// ─── Voice ────────────────────────────────────────────────────
export const VOICE_META = {
  eyebrow: { en: 'Our vision', ar: 'رؤيتنا' } as Bilingual,
  quoteLine1: { en: "Our goal is not just to organise events —", ar: 'هدفنا ليس مجرد تنظيم الفعاليات —' } as Bilingual,
  quoteLine2: { en: 'but to create experiences that inspire.', ar: 'بل خلق تجارب تُلهم وتُحرّك.' } as Bilingual,
  attribution: { en: 'Ibrahim Selim · Founder & CEO', ar: 'إبراهيم سليم · المؤسس والرئيس التنفيذي' } as Bilingual,
  backgroundVideo: `${CDN}/v1780760610/VID-20260605-WA0033_kbfgir.mp4`,
};

// ─── Clients ──────────────────────────────────────────────────
export const CLIENTS_EYEBROW: Bilingual = {
  en: "Trusted by the region's clubs, federations & broadcasters",
  ar: 'بثقة من أندية واتحادات وجهات بث المنطقة',
};

export const CLIENTS_MARQUEE_ITEMS: string[] = [
  'Sky News Arabia', 'Abu Dhabi TV', 'UAE Football Association', 'FC Basel 1893', 'Al Ain FC',
  'Al-Masry SC', 'FC Pyunik Yerevan', 'Fujairah FC', 'Liwa FC', 'Legia Warsaw',
  'Umm Salal SC', 'Saudi Sports for All', 'Ghana Football Association', 'Zamalek SC', 'FC Spartak Moscow',
  'Al-Ettifaq FC', 'Khor Fakkan FC', 'Ittihad Kalba FC', 'Al Wahda FC', 'Shabab Al Ahli Dubai',
];

// ─── CTA / Contact ────────────────────────────────────────────
export const CTA_META = {
  eyebrow: { en: 'Got an event to organise?', ar: 'لديك فعالية ترغب في تنظيمها؟' } as Bilingual,
  heading: { en: "LET'S CREATE", ar: 'لنصنع' } as Bilingual,
  headingStroke: { en: 'TOGETHER', ar: 'معاً' } as Bilingual,
  description: { en: 'Bring us a training camp, a friendly match, a tournament or a logistics challenge — we will handle it from A to Z.', ar: 'أحضر لنا معسكراً تدريبياً، مباراة ودية، بطولة أو تحدياً لوجستياً — سنتولى كل شيء من الألف إلى الياء.' } as Bilingual,
  submitLabel: { en: "Let's work together", ar: 'تواصل معنا' } as Bilingual,
  successMsg: { en: "Message sent ✓ — we'll be in touch.", ar: 'تم الإرسال ✓ — سنتواصل معك.' } as Bilingual,
};

export const FORM_PLACEHOLDERS = {
  name: { en: 'Your name', ar: 'اسمك' } as Bilingual,
  company: { en: 'Club / federation / brand', ar: 'النادي / الاتحاد / العلامة' } as Bilingual,
  email: { en: 'name@club.com', ar: 'name@club.com' } as Bilingual,
  message: { en: 'Tell us about the event…', ar: 'أخبرنا عن الفعالية…' } as Bilingual,
};

export const CONTACT_INFO = {
  email: 'info@sportme.ae',
  phone: '+971 58 581 3320',
};

// ─── Footer ───────────────────────────────────────────────────
export const FOOTER_META = {
  tagline: { en: 'Sports Event Services · Dubai, UAE', ar: 'خدمات الفعاليات الرياضية · دبي، الإمارات' } as Bilingual,
  instagram: '@sportmiddleeast',
  website: 'sportme.ae',
  instagramUrl: 'https://instagram.com/sportmiddleeast',
  websiteUrl: 'https://sportme.ae',
  phone: '+971 58 581 3320',
  email: 'info@sportme.ae',
};
