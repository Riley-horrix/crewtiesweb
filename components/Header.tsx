import { Navbar, NavbarBrand, NavbarContent, NavbarItem, NavbarMenuToggle, Link, Button, NavbarMenu, NavbarMenuItem } from "@nextui-org/react";
import { useState } from "react";
import CrewtiesLogo from "./CrewtiesLogo";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const menuItems = [
    "Home",
    "Contact",
    "Design",
  ];

  return (
    <Navbar
      isBordered={true}
      isMenuOpen={isMenuOpen}
      onMenuOpenChange={setIsMenuOpen}
      position="sticky"
      classNames={{
        "base": "dark"
      }}
    >
      <NavbarContent className="sm:hidden" justify="start">
        <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} />
      </NavbarContent>

      <NavbarContent className="sm:hidden pr-3" justify="center">
        <NavbarBrand>
          <CrewtiesLogo width={150} />
        </NavbarBrand>
      </NavbarContent>

      <NavbarContent className="hidden sm:flex gap-4" justify="end">
        <NavbarBrand>
          <CrewtiesLogo width={150} />
        </NavbarBrand>
        <NavbarItem>
          <Link color="foreground" href="/">
            Home
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/contact">
            Contact
          </Link>
        </NavbarItem>
        <NavbarItem>
          <Link color="foreground" href="/design">
            Design
          </Link>
        </NavbarItem>
      </NavbarContent>

      {/* <NavbarContent justify="end">
        <NavbarItem className="hidden lg:flex">
          <Link href="#">Login</Link>
        </NavbarItem>
        <NavbarItem>
          <Button as={Link} color="warning" href="#" variant="flat">
            Sign Up
          </Button>
        </NavbarItem>
      </NavbarContent> */}

      <NavbarMenu>
        {menuItems.map((item, index) => (
          <NavbarMenuItem key={`${item}-${index}`}>
            <Link
              className="w-full"
              color="foreground"
              href={item === "Home" ? "" : item.toLowerCase()}
              size="lg"
            >
              {item}
            </Link>
          </NavbarMenuItem>
        ))}
      </NavbarMenu>
    </Navbar>
  );
}