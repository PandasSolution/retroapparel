import { Providers } from "@/redux/provider";
import type { Metadata } from "next";
import { CookiesProvider } from "next-client-cookies/server";
import { Poppins } from "next/font/google";
import "./globals.scss";

export const metadata: Metadata = {
  title: "Retro Apparel",
  description: "Retro Apparel brings you a unique blend of vintage charm and modern style. From classic tees and denim to trendy streetwear, our collection is designed for those who love timeless fashion with a fresh twist. Step into Retro Apparel and make every outfit a statement.",
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
      <body className={`${poppins.variable}`}>
        <Providers>
          <CookiesProvider>{children}</CookiesProvider>
        </Providers>
      </body>
    </html>
  );
}
