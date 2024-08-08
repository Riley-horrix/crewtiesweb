/**
 * @file Logo.tsx
 * @author Riley Horrix (riley@horrix.com)
 * @brief Logo image component
 * @version 0.1
 * @date 2024-08-08
 * 
 * Copyright (c) Riley Horrix 2024
 * 
 */
import Image from "next/image"

interface Props {
  size: number,
  className?: string
}

const aspect = 0.2647;

/**
 * Logo component
 * @param size The width in px of the image
 * @param className Any additional classnames
 */
export default function Logo({ size, className = "" }: Props) {
  return (
    <Image className={className} src={"/logo.png"} alt={"logo"} width={size} height={size * aspect} />
  )
}