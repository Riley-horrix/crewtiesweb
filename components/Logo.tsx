import Image from "next/image"

interface Props {
  size: number,
  className?: string
}

const aspect = 0.2647;

export default function Logo({ size, className = "" }: Props) {
  return (
    <Image className={className} src={"/logo.png"} alt={"logo"} width={size} height={size * aspect} />
  )
}