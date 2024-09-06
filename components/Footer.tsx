import { Link } from "@nextui-org/react";
import Logo from "./Logo";

export default function Footer() {
  return (
    <div className="dark text-foreground-600 bg-background w-full py-[40px] flex flex-col items-center gap-y-[20px] self-end justify-self-end">
      <Logo size={170} className=""/>
      <div className="flex flex-row w-full justify-center items-center gap-x-[70px]">
        <Link className="font-bold text-foreground-600 hover:cursor-pointer" href="/">Home</Link>
        <Link className="font-bold text-foreground-600 hover:cursor-pointer" href="/contact">Contact</Link>
        {/* <Link className="font-bold text-foreground-600 hover:cursor-pointer" href="/design">Design</Link> */}
      </div>
      <div className="flex flex-col xs:flex-row gap-y-[10px] xs:gap-y-0 justify-between w-full px-[50px] items-center mt-[30px]">
        <h3 className="flex flex-row text-foreground-500 items-center text-xs"><i className="bi bi-envelope-fill pr-2 pt-[2px]"></i> enquiries@crewties.co.uk</h3>
        <Link className="text-foreground-500 hover:cursor-pointer text-xs" href="/privacy">Privacy Policy</Link>
      </div>
    </div>
  );
}