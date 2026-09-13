import type { Metadata } from "next";
import Hero from "../components/sections/home/Hero";
import Features from "../components/sections/home/Features";
import Categories from "../components/sections/home/Categories";
import About from "../components/sections/home/About";
import Mission from "../components/sections/home/Mission";
import Stats from "../components/sections/home/Stats";
import Services from "../components/sections/home/Services";
import Portfolio from "../components/sections/shared/Portfolio";
import WhyUs from "../components/sections/home/WhyUs";
import Process from "../components/sections/home/Process";
import Testimonials from "../components/sections/home/Testimonials";
import Blogs from "../components/sections/home/Blogs";
import LogoMarquee from "../components/sections/home/LogoMarquee";
import Consultation from "../components/sections/home/Consultation";
import JsonLd from "../components/seo/JsonLd";
import { getLatestPublishedBlogs } from "../lib/blogs";
import { getDictionary } from "../lib/i18n/get-dictionary";
import { getLocale } from "../lib/i18n/get-locale";
import { homeJsonLd } from "../lib/seo/json-ld";
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

export default async function Home() {
  const locale = await getLocale();
  const dictionary = await getDictionary(locale);
  const blogPosts = await getLatestPublishedBlogs(5);

  return (
    <>
      <JsonLd
        data={homeJsonLd(dictionary.meta.title, dictionary.meta.description)}
      />
      <Hero />
      <Features />
      <Categories />
      <About />
      <Mission />
      <Stats />
      <Services />
      <Portfolio />
      <WhyUs />
      <Process />
      <Testimonials />
      <Blogs posts={blogPosts} />
      <LogoMarquee />
      <Consultation />
    </>
  );
}
