import type { Metadata } from "next";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingActions from "../components/layout/FloatingActions";
import { LocaleProvider } from "../lib/i18n";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { getLocale } from "../lib/i18n/get-locale";
import { buildPageMetadata } from "../lib/seo/metadata";

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);

  return buildPageMetadata({
    title: dictionary.meta.title,
    description: dictionary.meta.description,
    path: "/",
    locale,
    image: dictionary.meta.ogImage,
    imageAlt: dictionary.meta.ogImageAlt,
    keywords: dictionary.meta.keywords,
  });
}

export default async function FrontendLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const locale = await getLocale();
  const messages = await getDictionary(locale);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <Header />
      {children}
      <Footer />
      <FloatingActions />
    </LocaleProvider>
  );
}
