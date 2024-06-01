import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/units/Navbar";
import NextTopLoader from "nextjs-toploader";
import { NextUIProvider } from "@nextui-org/react";
import { AuthProvider } from "@/components/contexts/AuthContext";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Blog by Emmanuel",
  description: " My blog, where I express my mind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <AuthProvider>
        <NextUIProvider>
          <NextTopLoader color="#000" />

          <body className={inter.className}>
            <header>
              <NavBar />
            </header>
            {children}
          </body>
        </NextUIProvider>
      </AuthProvider>
    </html>
  );
}
