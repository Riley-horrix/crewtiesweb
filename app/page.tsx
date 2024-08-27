"use client";
/**
 * @file page.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Index page
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */

import Header from "@/components/Header";
import { Button, Card, Divider, Link, Skeleton } from "@nextui-org/react";

/**
 * The index page of the website.
 */
export default function Home() {
  return (
    <main className="light text-foreground bg-background flex flex-col items-center">
      <Header />
      <div className="flex flex-row max-w-[900px] pt-[30px] px-[30px]">
        <div className="pr-20 flex flex-col justify-top pt-[70px]">
          <h1 className="text-5xl italic text-left mb-3"><strong>High Quality Boat Straps</strong></h1>
          <h2 className="text-4xl italic text-left">Stylish boat ties to make your club look professional</h2>
          <Divider className="mb-[5px] mt-[10px] h-[2px] bg-secondary" />
          <h3 className="text-2xl text-left">Create a unique design for your club today using our one-of-a-kind boat strap designer.</h3>
          <Button as={Link} href="/design" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px]">Start Designing</Button>
        </div>
        <Divider orientation="vertical" />
        <div className="flex flex-row gap-[15px]">
          <div className="w-1/2 flex flex-col gap-[30px] pt-[100px]">
            <Default />
            <Default />
          </div>
          <div className="w-1/2 flex flex-col gap-[30px]">
            <Default />
            <Default />
          </div>
        </div>
      </div>
    </main>
  )
}


function Default() {
  return (
    <Card className="w-[160px] h-[280px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[2000px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}