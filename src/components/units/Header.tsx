"use client";
import React from "react";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";

import { usePathname } from "next/navigation";
import { MenuLinks } from "@/utils/utils";

export default function Header() {
  const pathName = usePathname();
  return (
    <header>
      <Navbar className=" bg-none bg-transparent">
        <NavbarBrand>
          <Link href="/">
            <p className="font-bold text-inherit">Docx2mp3</p>
          </Link>
        </NavbarBrand>
        <NavbarContent className="hidden sm:flex gap-4" justify="center">
          {/* <NavbarItem>
            <Link color="foreground" href="#">
              Features
            </Link>
          </NavbarItem> */}

          {MenuLinks.map((x, i) => (
            <NavbarItem key={i}>
              <Link
                key={x.id}
                href={`${x.link}`}
                aria-current="page"
                color="foreground"
                className={`${
                  pathName === x.link
                    ? " text-gray-950 underline underline-offset-4"
                    : " text-gray-900"
                } capitalize font-bold text-md tracking-wide`}
              >
                {x.name}
              </Link>
            </NavbarItem>
          ))}

          {/* <NavbarItem>
            <Link color="foreground" href="#">
              Integrations
            </Link>
          </NavbarItem> */}
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="/login">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="/signup" variant="solid">
              Sign Up
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>
    </header>
  );
}
