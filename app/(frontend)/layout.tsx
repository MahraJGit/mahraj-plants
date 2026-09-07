import type { Metadata } from "next";
import { Great_Vibes, Noto_Sans_Arabic, Poppins } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingActions from "../components/layout/FloatingActions";
import {
  localeDirection,
  LocaleProvider,
} from "../lib/i18n";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { getLocale } from "../lib/i18n/get-locale";
import "../globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

const greatVibes = Great_Vibes({
  variable: "--font-great-vibes",
  subsets: ["latin"],
  weight: "400",
});

const notoSansArabic = Noto_Sans_Arabic({
  variable: "--font-noto-sans-arabic",
  subsets: ["arabic", "latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return {
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    icons: {
      icon: [{ url: "/favicon.png", type: "image/png" }],
      apple: [{ url: "/apple-icon.png", type: "image/png" }],
    },
  };
}

export default async function RootLayout({ children }: LayoutProps<"/">) {
  const locale = await getLocale();
  const messages = await getDictionary(locale);
  const dir = localeDirection(locale);

  return (
    <html
      lang={locale}
      dir={dir}
      className={`${poppins.variable} ${greatVibes.variable} ${notoSansArabic.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body
        className={`min-h-full flex flex-col ${locale === "ar" ? "font-arabic" : ""}`}
        suppressHydrationWarning
      >
        <LocaleProvider locale={locale} messages={messages}>
          <Header />
          {children}
          <Footer />
          <FloatingActions />
        </LocaleProvider>
      </body>
    </html>
  );
}
