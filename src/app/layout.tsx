import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Poppins } from "next/font/google";
import Script from "next/script";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Retro Apparel",
  description:
    "Retro Apparel brings you a unique blend of vintage charm and modern style. From classic tees and denim to trendy streetwear, our collection is designed for those who love timeless fashion with a fresh twist. Step into Retro Apparel and make every outfit a statement.",
};

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--tp-ff-body",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        {/* Google Tag Manager Script */}
        <Script id="gtm-script" strategy="afterInteractive">
          {`
            (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
            new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
            j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
            'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
            })(window,document,'script','dataLayer','GTM-52BMCK84');
          `}
        </Script>
      </head>
      <body className={`${poppins.variable}`}>
        {/* Google Tag Manager noscript */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-52BMCK84"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>

        <Providers>
          <CookiesProvider>{children}</CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}
