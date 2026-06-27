import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "SESO Autos — Driving More Than Cars",
    template: "%s | SESO Autos",
  },
  description:
    "SESO Autos: car sales & importation, rentals, insurance, licensing & registration, and GPS fleet tracking in Ghana. Driving more than cars.",
  keywords: [
    "car sales Ghana",
    "car importation",
    "car rentals Accra",
    "vehicle insurance Ghana",
    "DVLA registration",
    "GPS tracking fleet",
  ],
  openGraph: {
    title: "SESO Autos — Driving More Than Cars",
    description:
      "Quality imported vehicles, rentals, insurance, licensing and GPS fleet tracking.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jakarta.variable}>
      <body className="font-sans">
        <Navbar />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
