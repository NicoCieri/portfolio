import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import type { ReactNode } from "react";
import { LocaleProvider } from "@/components/locale-provider";
import type { Locale } from "@/i18n/config";
import { footerNavigationStart, footerNavigationRestore } from "@/lib/footer-navigation";
import "@/app/globals.css";

const geist = Geist({ subsets: ["latin"], variable: "--font-geist-sans", display: "swap" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export function RootDocument({ locale, children }: { locale: Locale; children: ReactNode }) {
  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${geist.variable} ${geistMono.variable}`}>
        <script dangerouslySetInnerHTML={{ __html: footerNavigationStart + `try{document.documentElement.dataset.theme=localStorage.getItem("portfolio-theme")==="dark"?"dark":"light"}catch{}` }} />
        <LocaleProvider locale={locale}>{children}</LocaleProvider>
        <script dangerouslySetInnerHTML={{ __html: footerNavigationRestore }} />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-M85DWEC1HY"
          strategy="lazyOnload"
        />
        <Script id="google-analytics" strategy="lazyOnload">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-M85DWEC1HY');
          `}
        </Script>
      </body>
    </html>
  );
}
