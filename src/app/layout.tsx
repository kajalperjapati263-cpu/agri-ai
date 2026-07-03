import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/ThemeProvider";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { FloatingChatWidget } from "@/components/FloatingChatWidget";
import { SplashProvider } from "@/components/SplashScreen";

export const metadata: Metadata = {
  title: "AgriAI | AI-Powered Smart Farming Platform",
  description:
    "Empower your farm with cutting-edge AI. Detect crop diseases, get hyperlocal weather forecasts, optimize yields, and connect with the smart marketplace.",
  keywords: ["AgriAI", "smart farming", "AI agriculture", "crop disease detection"],
  openGraph: {
    title: "AgriAI | AI-Powered Smart Farming Platform",
    description: "The world's most advanced AI platform for modern agriculture.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@100..900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans min-h-screen flex flex-col bg-background text-foreground antialiased selection:bg-primary/20">
        <ThemeProvider
          attribute="data-theme"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <SplashProvider>
            <Navbar />
            <main className="flex-grow">{children}</main>
            <Footer />
            <FloatingChatWidget />
          </SplashProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
