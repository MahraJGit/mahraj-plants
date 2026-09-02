import Hero from "../components/sections/home/Hero";
import Features from "../components/sections/home/Features";
import Categories from "../components/sections/home/Categories";
import About from "../components/sections/home/About";
import Mission from "../components/sections/home/Mission";
import Stats from "../components/sections/home/Stats";
import Services from "../components/sections/home/Services";
import Portfolio from "../components/sections/home/Portfolio";
import WhyUs from "../components/sections/home/WhyUs";
import Process from "../components/sections/home/Process";
import Testimonials from "../components/sections/home/Testimonials";
import Blogs from "../components/sections/home/Blogs";
import LogoMarquee from "../components/sections/home/LogoMarquee";
import Consultation from "../components/sections/home/Consultation";

export default function Home() {
  return (
    <>
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
      <Blogs />
      <LogoMarquee />
      <Consultation />
    </>
  );
}
