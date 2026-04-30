import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CFO Financial Dashboard — Acme Technologies",
  description: "Executive financial dashboard for CFO review — demo data.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
