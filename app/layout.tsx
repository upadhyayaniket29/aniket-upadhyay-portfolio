import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import "./adjustments.css";
import { ThemeProvider } from "../components/ThemeProvider";
import { Dock } from "../components/navigation/Dock";
import { CommandPalette } from "../components/navigation/CommandPalette";
import { LenisProvider } from "../components/animations/LenisProvider";
import { CustomCursor } from "../components/animations/CustomCursor";

import { ModalProvider } from "../components/ModalProvider";
import CinematicPreloader from "../components/ui/CinematicPreloader";
import { BookPreloader } from "../components/ui/BookPreloader";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aniket Upadhyay | Senior Full Stack Engineer",
  description: "Personal Developer Platform of Aniket Upadhyay, Senior Full Stack Engineer at Vercel. Crafting clean architectures, 3D WebGL environments, and production-grade products.",
  icons: {
    icon: [
      { url: "/favicon.ico" },
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" }
    ],
    apple: [
      { url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" }
    ]
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakarta.variable} ${jetbrainsMono.variable} dark`}
      style={{ colorScheme: "dark" }}
      suppressHydrationWarning
    >
      <body className="antialiased min-h-screen bg-[#050505] text-[#ffffff] font-sans selection:bg-[#eb6e00]/30 selection:text-white">
        <ThemeProvider>
          <ModalProvider>
            {/* Monolith NYC Cinematic Preloader */}
            <CinematicPreloader />
            {/* Dedicated Library Book Opening Preloader */}
            <BookPreloader />

            {/* Global Noise Overlay Matte Texture */}
            <div className="noise-overlay" />

            {/* Custom spring cursor */}
            <CustomCursor />

            <LenisProvider>
              <div className="relative z-10 min-h-screen pb-16">
                <main className="w-full relative">{children}</main>
              </div>
            </LenisProvider>

            {/* Navigation dock & Cmd+K spotlight search HUD */}
            <Dock />
            <CommandPalette />
          </ModalProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
