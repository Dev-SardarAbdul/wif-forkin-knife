import type { Metadata } from "next";
import { Josefin_Sans } from "next/font/google";
import "./globals.css";

const openSans = Josefin_Sans({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PFP Maker | WifForkinKnife",
  description: "PFP Maker | WifForkinKnife App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={openSans.className}>{children}</body>
    </html>
  );
}
