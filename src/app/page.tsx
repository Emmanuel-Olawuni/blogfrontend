"use client";
import { useAuthHooks } from "@/components/hooks/Authhooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import axios from "axios";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";

import { IoMdEye } from "react-icons/io";

import EditComponent from "@/components/units/EditComponent";
import DeleteComponent from "@/components/units/DeleteComponent";
export default function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      // const response = await axios.get("http://127.0.0.1:8000/api/posts");
      // setPosts(response.data);
    };
    fetchPosts();
  }, []);
  const { user } = useAuthHooks();
  const router = useRouter();

  // if (!user) {
  //   router.push("/login");
  // }
  return (
    <main>
      <div className=" flex px-6 py-4  justify-around max-w-md">
        <h1 className=" font-bold text-xl text-gray-800">All Blog Posts</h1>
        <div>
          <Button href="/create" variant="flat">
            Create New Post
          </Button>
        </div>
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>THUMBNAIL</TableColumn>
          <TableColumn>ACTION</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No blogs to display."}>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell className=" text-balance text-ellipsis">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              sequi minima natus ducimus! Nobis quos optio quibusdam est ea
              nihil officiis tempora aut magni labore eaque culpa, quia sed
              minima.
            </TableCell>
            <TableCell>
              <Image src="" alt="Blog Thumbnail" />
            </TableCell>
            <TableCell>
              <div className=" flex gap-2 px-3 ">
                <Link href="/blog/1" target="_blank">
                  <IoMdEye className=" text-xl text-primary-600" />{" "}
                </Link>
                <EditComponent id={"1"} />
                <DeleteComponent id={"1"} />
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
