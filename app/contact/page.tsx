"use client";
import Footer from "@/components/Footer";
/**
 * @file /contact/page.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Contact page
 * @version 0.1
 * @date 2024-08-28
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import Header from "@/components/Header";
import { Divider } from "@nextui-org/react";

export default function Contact() {
  return (
    <main className="light text-foreground bg-background min-h-screen justify-between flex flex-col">
      <Header />
      <div className="max-w-[700px] mx-auto mt-5 px-3">
        <h1 className="italic font-bold text-4xl">Promote your club&apos;s image and improve the quality of your equipment</h1>
        <div>
          {/* &apos; */}
          <Divider className="my-3" />
          <h3 className="text-xl">Contact us now for more information regarding pricing, customization options or to organise a free design consultation, then send our enquiries team an email, and we will get back to you as soon as possible!</h3>
          <div className="text-left my-5 flex flex-row items-center"><i className="mr-[10px] text-xl bi bi-envelope-fill"></i>enquiries@crewties.co.uk</div>
        </div>
      </div>
      <Footer />
    </main>
  );
}