"use client";
import { useAuthHooks } from "@/components/hooks/Authhooks";
import Image from "next/image";
import { useRouter } from "next/navigation";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  Spinner,
} from "@nextui-org/react";

import { IoMdEye } from "react-icons/io";

import DeleteComponent from "@/components/units/DeleteComponent";
import AxiosInstance from "@/components/hooks/AxiosInstance";
import { blogTypes } from "@/lib/type";
import { CiEdit } from "react-icons/ci";
export default function Home() {
  const [posts, setPosts] = useState<blogTypes>();
  const [loading, isLoading] = useState(true);
  const tableColumns = [
    {
      key: "title",
      name: "TITLE",
    },
    {
      key: "description",
      name: "DESCRIPTION",
    },
    {
      key: "thumbnail",
      name: "THUMBNAIL",
    },
    {
      key: "action",
      name: "ACTION",
    },
  ];

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await AxiosInstance.get("/blogs");
      console.log("blog response", response);

      setPosts(response.data);
      isLoading(false);
    };
    fetchPosts();
  }, []);
  const { user } = useAuthHooks();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  return (
    <main>
      <div className=" flex px-6 py-4  justify-around max-w-md">
        <h1 className=" font-bold text-xl text-gray-800">All Blog Posts</h1>
        <div>
          <Link href="/create" className=" underline underline-offset-4">
            Create New Post
          </Link>
        </div>
      </div>
      {loading ? (
        <Spinner
          label="Loading blogs"
          size="md"
          color="default"
          className="text-center flex justify-center items-center"
        />
      ) : (
        <Table isStriped aria-label="Example static collection table">
          <TableHeader columns={tableColumns}>
            {(tableColumns) => (
              <TableColumn key={tableColumns.key}>
                {tableColumns.name}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody emptyContent={"No blogs to display."} items={posts}>
            {(item) => (
              <TableRow key={item.id}>
                <TableCell>{item.title}</TableCell>
                <TableCell className=" text-balance text-ellipsis">
                  {item.description}
                </TableCell>
                <TableCell>
                  <img
                    src={`http://127.0.0.1:8000/storage/${item.thumbnail}`}
                    alt="Blog Thumbnail"
                    className=" w-[50px] h-[50px] object-contain"
                   
                  />
                </TableCell>
                <TableCell>
                  <div className=" flex gap-2 px-3 ">
                    <Link href={`/blog/${item.id}`} target="_blank">
                      <IoMdEye className=" text-xl text-primary-600" />{" "}
                    </Link>
                    <Link href={`/blog/edit/${item.id}`} target="_blank">
                      <CiEdit className=" text-xl text-primary-600" />{" "}
                    </Link>
                    <DeleteComponent dataID={item.id} />
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </main>
  );
}
