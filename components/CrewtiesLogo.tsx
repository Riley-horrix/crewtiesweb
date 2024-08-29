import Image from "next/image";
import LogoImg from "@/public/logo.png"

interface LogoProps {
  width: number
}

export default function CrewtiesLogo({ width }: LogoProps) {
  return (
    <Image
      width={width}
      alt="Crewties Logo"
      src={LogoImg}
    />
  );
}