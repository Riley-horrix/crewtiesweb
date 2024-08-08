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

import Link from "next/link";

/**
 * The index page of the website.
 */
export default function Home() {
  return (
    <>
      <h1>Home</h1>
      <Link href={"/design"}>To Design</Link>
    </>
  )
}
