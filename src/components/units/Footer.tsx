import { LucideInstagram, LucideTwitter } from "lucide-react";
import Link from "next/link";
import React from "react";
import { MdOutlineMail, MdOutlineFacebook } from "react-icons/md";
const Footer = () => {
  const date = new Date
  const year = date.getFullYear()
  return (
    <div className=" flex flex-col sm:flex-row justify-around gap-3 py-6 bg-gray-200 px-4 ">
      <div className="social-link flex text-lg text-primary  gap-2">
        <MdOutlineFacebook  size={24}/>
        <LucideInstagram size={24} />
        <LucideTwitter size={24} />
        <MdOutlineMail size={24} />
      </div>
      <div className="copyright"> &copy; {`${year}`}</div>
      <div className="footernote">
        <Link
          href="https://techpad.com.ng"
          target="_blank"
          className=" underline underline-offset-2 decoration-primary"
        >
          Developed by Emmanuel.
        </Link>
      </div>
    </div>
  );
};

export default Footer;
