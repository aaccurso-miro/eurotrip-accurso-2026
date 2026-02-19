import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eurotrip Accurso 2026 🚗",
  description:
    "Road trip de 11 días por Europa con la familia Accurso (25 mayo - 4 junio 2026). Ámsterdam → Rothenburg → Salzburgo → Viena → Praga → Kassel. Itinerario completo, mapa interactivo, tips de manejo y más.",
  metadataBase: new URL("https://eurotrip-accurso-2026.vercel.app"),
  openGraph: {
    title: "Eurotrip Accurso 2026 🚗",
    description:
      "Road trip de 11 días por Europa: Ámsterdam → Rothenburg → Salzburgo → Viena → Praga → Kassel. 2540 km de recorrido familiar.",
    type: "website",
    url: "https://eurotrip-accurso-2026.vercel.app",
    images: [
      {
        url: "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=630&fit=crop&q=80",
        width: 1200,
        height: 630,
        alt: "Alpes Austríacos - Eurotrip Accurso 2026",
      },
    ],
    locale: "es_ES",
    siteName: "Eurotrip Accurso 2026",
  },
  twitter: {
    card: "summary_large_image",
    title: "Eurotrip Accurso 2026 🚗",
    description:
      "Road trip de 11 días por Europa: Ámsterdam → Viena → Praga → Kassel. 2540 km de recorrido familiar.",
    images: [
      "https://images.unsplash.com/photo-1503614472-8c93d56e92ce?w=1200&h=630&fit=crop&q=80",
    ],
  },
  icons: {
    icon: "data:image/svg+xml,<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'><text y='.9em' font-size='90'>🚗</text></svg>",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: `try{var t=localStorage.getItem('theme');if(t==='dark'||(!t&&window.matchMedia('(prefers-color-scheme: dark)').matches)){document.documentElement.setAttribute('data-theme','dark');}}catch(e){}` }} />
      </head>
      <body
        className={`${playfair.variable} ${inter.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
