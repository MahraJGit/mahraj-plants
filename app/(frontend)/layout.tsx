import type { Metadata } from "next";
import { Great_Vibes, Poppins } from "next/font/google";
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import FloatingActions from "../components/layout/FloatingActions";
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

export const metadata: Metadata = {
  title: "Mahraj Plants",
  description: "Mahraj Plants is a plant store that sells plants and plant related products.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${greatVibes.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="min-h-full flex flex-col" suppressHydrationWarning>
        <Header />
        {children}
        <Footer />
        <FloatingActions />
      </body>
    </html>
  );
}
