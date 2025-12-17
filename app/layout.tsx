import type { Metadata } from "next";
import "./globals.css";
import Providers from "./providers";
import { ToasterProvider } from "./toaster-provider";
import Navbar from "./components/ui/Navbar";

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
        <Providers>

          <Navbar />
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  );
}
