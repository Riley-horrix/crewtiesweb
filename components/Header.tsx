import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link, NavbarMenu, NavbarMenuItem, Button } from "@nextui-org/react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import CrewtiesLogo from "./CrewtiesLogo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const path = usePathname();

  return (
    <Navbar
      isBordered={true}
      isMenuOpen={isMenuOpen}
      isBlurred
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      classNames={{
        "base": "dark",
        "item": [
          "flex",
          "relative",
          "h-full",
          "items-center",
          "data-[active=true]:after:content-['']",
          "data-[active=true]:after:absolute",
          "data-[active=true]:after:bottom-0",
          "data-[active=true]:after:left-[-25%]",
          "data-[active=true]:after:right-0",
          "data-[active=true]:after:h-[6px]",
          "data-[active=true]:after:w-[150%]",
          "data-[active=true]:after:rounded-[2px]",
          "data-[active=true]:after:bg-secondary-300",
        ]
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <CrewtiesLogo width={200} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-7" justify="end">
        <NavbarBrand>
          <CrewtiesLogo width={200} />
        </NavbarBrand>
        <NavbarItem isActive={path.endsWith("/")}>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path.startsWith("/contact")}>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem isActive={path.startsWith("/design")}>
          <Link color="foreground" href="/design">
            Design
          </Link>
        </NavbarItem>
      </NavbarContent>

      <NavbarMenu>
      <NavbarMenuItem>
        <Link
          className="w-full"
          color="foreground"
          href="/"
          size="lg"
        >
          Home
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          className="w-full"
          color="foreground"
          href="/contact"
          size="lg"
        >
          Contact
        </Link>
      </NavbarMenuItem>
      <NavbarMenuItem>
        <Link
          className="w-full"
          color="foreground"
          href="/design"
          size="lg"
        >
          Design
        </Link>
      </NavbarMenuItem>
      </NavbarMenu>
    </Navbar>
  );
}