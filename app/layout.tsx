import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "ProxiFind - Local Services Marketplace",
    template: "%s - ProxiFind",
  },
  description: "Find trusted local service providers for tutoring, home repair, photography, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col">
        <Navbar />
        <main className="flex-1">{children}</main>
      </body>
    </html>
  );
}
