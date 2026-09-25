import type { Metadata, Viewport } from "next";
import { Great_Vibes, Noto_Sans_Arabic, Poppins } from "next/font/google";
import { localeDirection } from "./lib/i18n";
import { getLocale } from "./lib/i18n/get-locale";
import { getDictionary } from "./lib/i18n/get-dictionary";
import { getSiteUrl, SITE_NAME } from "./lib/seo/config";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  display: "swap",
  weight: "400",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic", "latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const viewport: Viewport = {
  themeColor: "#0A250E",
  width: "device-width",
  initialScale: 1,
};

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return {
    metadataBase: new URL(getSiteUrl()),
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    keywords: dictionary.meta.keywords,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: getSiteUrl() }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    category: "Landscaping",
    formatDetection: {
      email: true,
      telephone: true,
      address: true,
    },
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
    verification: {
      google: "Z2bJ-jX7ruH4z5N9Q6rfTcHU0_fWRs_CONmeYBF3RXw",
      other: {
        "msvalidate.01": "D0D393E062982322E75CBCAEC4ED9214",
      },
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const dir = localeDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${greatVibes.variable} ${notoSansArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`flex min-h-full flex-col${locale === "ar" ? " font-arabic" : ""}`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
