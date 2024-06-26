import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import AppThemeProvider from "./components/AppThemeProvider";
import ReduxProvider from "./components/reduxProvider/ReduxProvider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Shopee admin",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
        <body className={inter.className}>
          <ReduxProvider>
            <AppThemeProvider>
              {children}
            </AppThemeProvider>
          </ReduxProvider>
        </body>
    </html>
  );
}
