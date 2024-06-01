"use client";
// import { useRouter } from "next/router";
// import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Navbar,
  NavbarBrand,
  NavbarContent,
  NavbarItem,
  Link,
  Button,
} from "@nextui-org/react";
import { useAuthHooks } from "../hooks/Authhooks";

export default function NavBar() {
  const router = useRouter();
  const { logOut, user } = useAuthHooks();
  const handleLogout = () => {
    logOut();
    router.push("/login");
  };
  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">My BLOG</p>
      </NavbarBrand>

      <NavbarContent justify="end">
        {user ? (
          <NavbarItem>
            <Button>Hi , {user.name}</Button>
            <Button onClick={handleLogout}>LogOut</Button>
          </NavbarItem>
        ) : (
          <>
            <NavbarItem>
              <Button as={Link} color="primary" href="/register" variant="flat">
                Register
              </Button>
              <Button as={Link} color="primary" href="/login" variant="flat">
                Login In
              </Button>
            </NavbarItem>
          </>
        )}
      </NavbarContent>
    </Navbar>
  );
}
