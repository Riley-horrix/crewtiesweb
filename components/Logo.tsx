import Image from "next/image"

interface Props {
  size: number,
  id?: number,
  className?: string
}

const aspect = 0.2647;

export default function Logo({ size, id = 0, className = "" }: Props) {
  return (
    <Image src={"/logo.png"} alt={"logo"} width={size} height={size * aspect} />
  )
}