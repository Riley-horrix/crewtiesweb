"use client";
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
    <main className="light text-foreground bg-background">
      <Header />
      <div className="max-w-[700px] mx-auto mt-5 px-3">
        <h1 className="italic font-bold text-4xl">Thinking about bringing your club&apos;s style to the next level?</h1>
        <div>
          <Divider className="my-3"/>
          <h3 className="text-xl">Send our enquiries team an email and we will get back to you as soon as possible!</h3>
          <div className="text-left mt-5 flex flex-row items-center"><i className="mr-[10px] text-xl bi bi-envelope-fill"></i>enquiries@crewties.co.uk</div>
        </div>
      </div>
    </main>
  );
}