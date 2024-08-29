/**
 * @file layout.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief The global layout file
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import type { Metadata } from "next";
import { Roboto_Slab } from "next/font/google";

import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import Providers from "./providers";

const font = Roboto_Slab({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CrewTies",
  description: "The official webpage of CrewTies, high quality rowing boat straps.",
};

/**
 * Generates the root layout for the website, the header nav bar and footer. Content is placed inside of it.
 * @returns 
 */
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className}`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
