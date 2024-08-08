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
import { Inter } from "next/font/google";
import "./globals.css";
import "bootstrap-icons/font/bootstrap-icons.css";

import styles from "./layout.module.css";
import Logo from "@/components/Logo";

const inter = Inter({ subsets: ["latin"] });

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
      <body className={inter.className}>
        <nav className={styles.navbar}>
          <div className={styles.navitem}></div>
          <Logo size={150} className={styles.navitem} />
          <i className={`${styles.navitem} ${styles.burger} bi bi-list`}></i>
        </nav>
        {children}
      </body>
    </html>
  );
}
