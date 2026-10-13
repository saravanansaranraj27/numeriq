import type { Metadata } from "next";
import Script from "next/script";
import { ThemeProvider } from "next-themes";
import "./globals.css";

export const metadata: Metadata = {
  title: "Numeriq",
  description: "All-in-one mathematics calculator, graphing and problem solving workspace",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <Script id="numeriq-appearance-settings" strategy="beforeInteractive">
          {`(function(){try{var d=document.documentElement;var a=localStorage.getItem("numeriq-accent");if(a&&/^(blue|cyan|teal|green|lime|yellow|purple|pink|red|orange)$/.test(a))d.dataset.accent=a;var m=localStorage.getItem("numeriq-reduce-motion");if(m)d.dataset.reduceMotion=m}catch(e){}})()`}
        </Script>
      </head>
      <body>
        <div
          id="numeriq-initial-loading"
          className="numeriq-loading-screen"
          role="status"
          aria-live="polite"
        >
          <div className="numeriq-loading-brand">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              aria-label="Numeriq logo"
              role="img"
              xmlns="http://www.w3.org/2000/svg"
            >
              <rect x="2" y="2" width="20" height="20" rx="5" fill="currentColor" />
              <path d="M7 7h3l4.8 6V7H18v10h-3l-5-6v6H7Z" fill="#fff" />
            </svg>
          </div>
          <span>Loading....</span>
        </div>

        <Script id="numeriq-loading-dismiss" strategy="afterInteractive">
          {`(function(){window.setTimeout(function(){document.documentElement.classList.add('numeriq-loading-dismissed')},800)})()`}
        </Script>

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
