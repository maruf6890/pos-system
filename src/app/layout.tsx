import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { getLocale } from "next-intl/server";
import { NextIntlClientProvider } from "next-intl";
import { Toaster } from "sonner";
const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "gadgets",
  description: "A reliable platform for tech gadgets",
  
};

export default async function RootLayout({
  children,
}: {
    children: React.ReactNode; 
  
  }) {
  const locale = await getLocale(); 
  return (
    <html lang={locale}>
      <head />
      <body
        className={`${inter.variable} antialiased`}
        suppressHydrationWarning
      >
        
        <NextIntlClientProvider>{children}</NextIntlClientProvider>
        <Toaster/>
      </body>
    </html>
  );
}
