"use client";
import Footer from "@/components/Footer";
/**
 * @file page.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Index page
 * @version 0.2
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
      <div className="flex flex-col md:flex-row max-w-[900px] pt-0 md:pt-[30px] px-[30px] pb-[30px]">
        <div className="pr-0 md:pr-20 flex flex-col justify-top pt-[30px] md:pt-[70px]">
          <h1 className="text-5xl italic text-left mb-3"><strong>The UK&apos;s best in quality</strong></h1>
          <h2 className="text-4xl italic text-left">Promote your brand with bespoke boat ties, designed by you, for you</h2>
          <Divider className="mb-[10px] mt-[15px] h-[2px] bg-secondary" />
          <h3 className="text-2xl text-left">Use the world&apos;s first boat strap designer to create a unique patttern for you or your club!</h3>
          <Button as={Link} href="/design" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px] mb-10">Start Designing</Button>
        </div>
        <div className="flex flex-row gap-[15px] justify-center">
          {/* <div className="absolute w-[10px] h-[600px] bg-primary rotate-12 right-[160px]"> </div>
          <div className="absolute w-[10px] h-[600px] bg-primary rotate-12 right-[200px]"> </div> */}
          <div className="flex flex-col gap-[30px] pt-[100px]">
            <EmptyImageCard />
            <EmptyImageCard />
          </div>
          <div className="flex flex-col gap-[30px]">
            <EmptyImageCard />
            <EmptyImageCard />
          </div>
        </div>
      {/* <DecorationBar width={10} height={10} rotate={0} top={100} right={100} color="primary"/> */}
      {/* <DecorationBar width={10} height={100} rotate={0} top={100} right={150} color="primary"/> */}
      </div>
      <Divider />
      <div className="flex flex-col gap-y-[20px] py-[30px] items-center w-full px-[10vw]  bg-background-300">
        {/* <h1 className="text-[90px]"><i className="bi bi-patch-question-fill"></i></h1> */}
        <div className="flex flex-row">
          <h3 className="text-3xl font-bold">CrewTies is a company dedicated to providing highly customizable boat straps to the rowing community that don&apos;t compromise on quality.</h3>
          {/* <EmptyImageCard /> */}
        </div>
        <h3 className="text-3xl font-bold">All of our boat straps are manufactured in the UK; featuring high quality buckles and printed polyester webbing.</h3>
      </div>
      <Divider />
      <div className="flex flex-col-reverse md:flex-row dark text-foreground bg-background md:justify-between px-[8vw] w-full py-[30px] items-center">
        <h3 className="flex-1 text-xl">
          Our bespoke straps offer the opportunity to create branded boat ties, promoting your club&apos;s identity and branding.<br/><br/>Use our very own online designer to create a design that best represents your club&apos;s ideals. You can also use any photo editing software and email your designs, or have one of our team do it for you!<br/><br/>Alternatively, a great way to bring together your club and create a lasting identity would be to host a design competition, so the boat ties would truly be a part of your community!<br/><br/>Having all of your equipment being branded also helps with organisation and preventing loss and theft.
        </h3>
        <div className="flex flex-row md:flex-col gap-x-[10px] md:gap-x-0 flex-1 items-center mb-[30px] md:mb-0">
          <i className="bi bi-people-fill text-6xl my-[10px] text-primary"></i>
          <h2 className="text-4xl font-bold text-primary">Branding</h2>
        </div>
      </div>
      <div className="flex flex-col md:flex-row md:justify-between px-[8vw] w-full py-[30px] items-center">
        <div className="flex flex-row gap-x-[10px] md:gap-x-0 md:flex-col md:flex-1 items-center mb-[30px] md:mb-0">
          <i className="bi bi-gear-wide-connected text-6xl my-[10px] text-secondary"></i>
          <h2 className="text-4xl font-bold text-secondary">Customization</h2>
        </div>
        <h3 className="md:flex-1 text-xl">Tired of having boat straps that are too long or too short? Don&apos;t want hull scratches from buckles?<br/><br/> Our boat straps can be tailor made to suit any requirement!
          <ul className="text-lg pl-[10px] mt-[5px]">
            <li>&#8226; Custom length</li>
            <li>&#8226; Custom pattern</li>
            <li>&#8226; Optional buckle padding</li>
          </ul>
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row dark text-foreground bg-background md:justify-between px-[8vw] w-full py-[30px] items-center">
        <h3 className="flex-1 text-xl">
          Rowing boats are expensive, and ensuring that they stay safe on trailers or racks at your club or in transit is crucial. <br /><br /> At CrewTies, we pride ourselves on having the highest quality boat straps, manufactured with precision and quality. <br/><br/>Our boat straps are sewn using polyester, a much stronger fabric than most mainstream polypropelene boat ties.<br/><br/>CrewTies are manufactured in the UK, using UK textiles, parts and people, for quality you can trust!
        </h3>
        <div className="flex flex-row md:flex-col gap-x-[10px] md:gap-x-0 flex-1 items-center mb-[30px] md:mb-0">
          <i className="bi bi-shield-fill text-6xl my-[10px] text-primary"></i>
          <h2 className="text-4xl font-bold text-primary">Quality</h2>
        </div>
      </div>
      <Divider className="mb-[30px]"/>
      <div className="text-center w-full mt-[20px] text-xl px-[20vw]">
        If you are interested in placing an order or would like to know the various pricing options, then head over to our contact page!
      </div>
      <Button as={Link} href="/contact" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px] mb-10">Contact Us</Button>
      <Divider className="mt-[30px]"/>
      <Footer />
    </main>
  )
}

interface DecorationBarProps {
  width: number,
  height:number,
  rotate: number,
  top: number,
  right:number,
  color:string,
}

function DecorationBar(props: DecorationBarProps) {
  return (<div className={`absolute w-10 h-${props.height} bg-primary z-100`}></div>);
  // t-[-${props.top}px] r-[-${props.right}px]
}


function EmptyImageCard() {
  return (
    <Card className="w-[160px] h-[280px] space-y-5 p-4" radius="lg">
      <Skeleton className="rounded-lg">
        <div className="h-[2000px] rounded-lg bg-default-300"></div>
      </Skeleton>
    </Card>
  );
}