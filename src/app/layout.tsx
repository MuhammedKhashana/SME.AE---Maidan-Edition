import type { Metadata, Viewport } from 'next';
import { Anton, Archivo, Sora, Reem_Kufi, Tajawal } from 'next/font/google';
import '@/styles/globals.css';

const anton = Anton({ weight: '400', subsets: ['latin'], variable: '--font-anton' });
const archivo = Archivo({ weight: ['600', '700', '800', '900'], subsets: ['latin'], variable: '--font-archivo' });
const sora = Sora({ weight: ['300', '400', '500', '600'], subsets: ['latin'], variable: '--font-sora' });
const reemKufi = Reem_Kufi({ weight: ['500', '600', '700'], subsets: ['arabic'], variable: '--font-reem' });
const tajawal = Tajawal({ weight: ['400', '500', '700'], subsets: ['arabic', 'latin'], variable: '--font-tajawal' });

export const metadata: Metadata = {
  title: 'Sport Middle East — Creative Sports House',
  description: 'Sport Middle East (SME) is a creative sports house across the UAE and Egypt — live broadcast, marketing, and sports films.',
  icons: {
    icon: [
      { url: '/public/assets/sme-logo-full.png', sizes: '32x32', type: 'image/png' },
      { url: '/public/assets/sme-logo-full.png', sizes: '192x192', type: 'image/png' }
    ],
    apple: [
      { url: '/public/assets/sme-logo-full.png', sizes: '180x180', type: 'image/png' }
    ]
  },
  keywords: ['Sport Middle East', 'SME', 'sports broadcasting', 'UAE', 'Egypt', 'PFL MENA', 'Abu Dhabi Grand Slam', 'sports marketing'],
  authors: [{ name: 'Sport Middle East', url: 'https://smenews.ae' }],
  robots: { index: true, follow: true },
  openGraph: {
    type: 'website',
    siteName: 'Sport Middle East',
    title: 'Sport Middle East — Creative Sports House',
    description: 'We film it, broadcast it, and make the region feel it.',
    url: 'https://smenews.ae',
    locale: 'en_US',
    alternateLocale: ['ar_AE'],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Sport Middle East',
    description: 'We film it, broadcast it, and make the region feel it.',
  },
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  viewportFit: 'cover',
  themeColor: '#0a0807',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${anton.variable} ${archivo.variable} ${sora.variable} ${reemKufi.variable} ${tajawal.variable}`}
    >
      <body className="bg-ink text-steel font-body antialiased selection:bg-red">
        {children}
      </body>
    </html>
  );
}
