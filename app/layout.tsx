import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "HRPRO360 - AI-Powered Employee Management",
  description: "Next-generation employee management system powered by AI, real-time collaboration, and intelligent insights",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
