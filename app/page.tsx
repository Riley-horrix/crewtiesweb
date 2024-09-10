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
import StrapShowcase from "@/components/StrapShowcase";
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
          <h1 className="text-5xl italic text-left mb-3"><strong>Customisable, quality boat ties for your club</strong></h1>
          <h2 className="text-4xl italic text-left">Promote your brand with bespoke boat ties, designed by you, for you</h2>
          <Divider className="mb-[10px] mt-[10px] h-[2px] bg-secondary" />
          <h3 className="text-2xl text-left">Email our enquiries team for more information or to organise a free design consultation where we can show you what your design could look like!</h3>
          <Button as={Link} href="/contact" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px] mb-10">Contact us!</Button>
          {/* <h3 className="text-2xl text-left">Use the world&apos;s first boat strap designer to create a unique patttern for you or your club!</h3>
          <Button as={Link} href="/design" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px] mb-10">Start Designing</Button> */}
        </div>
        <StrapShowcase />
        {/* <DecorationBar width={10} height={10} rotate={0} top={100} right={100} color="primary"/> */}
        {/* <DecorationBar width={10} height={100} rotate={0} top={100} right={150} color="primary"/> */}
      </div>
      <Divider />
      <div className="flex flex-col gap-y-[20px] py-[30px] items-center w-full px-[10vw]  bg-background-300">
        {/* <h1 className="text-[90px]"><i className="bi bi-patch-question-fill"></i></h1> */}
        <div className="flex flex-row">
          <h3 className="text-3xl font-bold">CrewTies is a company dedicated to providing highly customisable boat straps to the rowing community that don&apos;t compromise on quality.</h3>
          {/* <EmptyImageCard /> */}
        </div>
        <h3 className="text-3xl font-bold">Our boat straps are manufactured in the UK; they feature high quality buckles and printed polyester webbing.</h3>
      </div>
      <Divider />
      <div className="flex flex-col-reverse md:flex-row dark text-foreground bg-background md:justify-between px-[8vw] w-full py-[30px] items-center">
        <h3 className="flex-1 text-xl">
          We offer you the opportunity to create bespoke boat ties, promoting your club&apos;s identity and branding.<br /><br />Book a free consultation with one of our team and using our unique design service, we can show you what your club straps could look like!<br /><br />Having all of your equipment being branded also helps with organisation and preventing loss and theft.
        </h3>
        {/* <br /><br />A great way to bring together your club members and create a lasting identity would be to host a design competition, so the boat ties would truly be a part of your community! */}
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
        <h3 className="md:flex-1 text-xl">Tired of having boat straps that are too long or too short? Don&apos;t want hull scratches from buckles?<br /><br /> Our boat straps can be tailor made to suit any requirement!
          <ul className="text-lg pl-[10px] mt-[5px]">
            <li>&#8226; Custom length</li>
            <li>&#8226; Custom pattern</li>
            <li>&#8226; Optional buckle padding</li>
          </ul>
        </h3>
      </div>
      <div className="flex flex-col-reverse md:flex-row dark text-foreground bg-background md:justify-between px-[8vw] w-full py-[30px] items-center">
        {/* <h3 className="flex-1 text-xl">
          Rowing boats represent a considerable investment, and securing them safely on trailers or racks at your club or in transit is crucial. <br /><br /> At CrewTies, we pride ourselves on having the highest quality boat straps, manufactured with precision and quality. <br /><br />Our straps are sewn using polyester, a much stronger fabric than most mainstream polypropylene boat ties.<br /><br />CrewTies are manufactured in the UK, using UK textiles, parts and people, for quality you can trust!
        </h3> */}
        <h3 className="flex-1 text-xl">
          Rowing boats represent a considerable investment, and securing them safely on trailers or racks, at your club or in transit is crucial. <br /><br /> At CrewTies, our straps are manufactured using polyester, much stronger and UV / water resistant than mainstream polypropylene straps.<br /><br />We pride ourselves on supplying the highest quality boat straps, made with care and precision.<br /><br />CrewTies are produced in the UK, using UK textiles, parts and people, for quality you can trust!
        </h3>
        <div className="flex flex-row md:flex-col gap-x-[10px] md:gap-x-0 flex-1 items-center mb-[30px] md:mb-0">
          <i className="bi bi-shield-fill text-6xl my-[10px] text-primary"></i>
          <h2 className="text-4xl font-bold text-primary">Quality</h2>
        </div>
      </div>
      <Divider className="mb-[30px]" />
      <div className="text-center w-full mt-[20px] text-xl px-[20vw]">
        If you are interested in knowing more about what we do or would like to see firsthand what your boat straps could look like, then head over to our contact page!
      </div>
      <Button as={Link} href="/contact" color="primary" variant="solid" className="text-xl px-[20px] py-[25px] mt-[20px] mb-10">Contact Us</Button>
      <Divider className="mt-[30px]" />
      <Footer />
    </main>
  )
}