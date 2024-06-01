'use client'
// import { useRouter } from "next/router";
import { getCurrentUser, logOut } from "../../../pages/api/auth";
import Link from "next/link";
import { Button } from "../ui/button";
import { useRouter} from 'next/navigation'

export default function NavBar() {
  const router = useRouter();
  const user = getCurrentUser();

  const handleLogout = () => {
    logOut();
    router.push("/login");
  };
  return (
    <nav className=" w-full justify-around flex flex-1 font-medium text-md ">
      <Link href="/"> Home</Link>
      {user ? (
        <>
          <Link href="/blogs">View Blog</Link>
          <Button onClick={handleLogout}>Logout</Button>
        </>
      ) : (
        <>
          <Link href='/login'>Login</Link>
          <Link href='/register'>Register</Link>
        </>
      )}
    </nav>
  );
}
