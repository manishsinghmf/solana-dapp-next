import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ToasterProvider } from "./toaster-provider";

export const metadata: Metadata = {
  title: "Solana Dashboard dApp",
  description: "A Next.js Solana wallet dashboard with Tailwind UI",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ToasterProvider />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
