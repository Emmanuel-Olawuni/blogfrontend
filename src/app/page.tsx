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
  Input,
  Textarea,
} from "@nextui-org/react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@nextui-org/react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
import { MdDelete } from "react-icons/md";
import { CiEdit } from "react-icons/ci";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
export default function Home() {
  const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

  const fileSchema = z
    .instanceof(File)
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max file size is 3MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Invalid file type"
    );

  const schema = z.object({
    title: z.string().min(2, {
      message: "Title must be more than 2 characters",
    }),
    content: z.string().min(5, {
      message: "Minimum charater is 5",
    }),
    thumbnail: z
      .any()
      .optional()
      .refine((file) => {
        return !file || file.size <= 1024 * 1024 * 3;
      }, "File Size must be less than 3MB"),
    main_image: z
      .any()
      .optional()
      .refine((file) => {
        return !file || file.size <= 1024 * 1024 * 3;
      }, "File Size must be less than 3MB"),
    images: z.any(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
    },
  });
  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);

    // const formData = new FormData();
    // formData.append("title", data.title);
    // formData.append("content", data.content);
    // if (data.thumbnail[0]) {
    //   formData.append("thumbnail", data.thumbnail[0]);
    // }
    // if (data.main_image[0]) {
    //   formData.append("main_image", data.main_image[0]);
    // }
    // if (data.images.length) {
    //   data.images.forEach((image, index) => {
    //     formData.append(`images[${index}]`, image);
    //   });
    // }

    // try {
    //   await axios.post("http://127.0.0.1:8000/api/posts", {
    //     headers: {
    //       "Content-Type": "multipart/form-data",
    //     },
    //   });
    //   // history.push('/');
    // } catch (error) {
    //   console.error("Create post error", error);
    // }
  }
  const [posts, setPosts] = useState([]);
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

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
          <Button href="" onPress={onOpen} variant="flat">
            Create New Post
          </Button>
        </div>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {(onClose) => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  Modal Title
                </ModalHeader>
                <ModalBody>
                  <Form {...form}>
                    <form
                      onSubmit={form.handleSubmit(onSubmit)}
                      className=" space-y-6 flex flex-col gap-3"
                    >
                      <FormField
                        control={form.control}
                        name="title"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                              <Input placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                              Write the blog title
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Content</FormLabel>
                            <FormControl>
                              <Textarea placeholder="" {...field} />
                            </FormControl>
                            <FormDescription>
                              Write the blog content
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="thumbnail"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Image</FormLabel>
                            <FormControl>
                              <Input placeholder="" type="file" {...field} />
                            </FormControl>
                            <FormDescription>
                              Upload the thumbnail
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={form.control}
                        name="main_image"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Main Image</FormLabel>
                            <FormControl>
                              <Input placeholder="" type="file" {...field} />
                            </FormControl>
                            <FormDescription>
                              Upload the blog main image
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={form.control}
                        name="images"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Other Images</FormLabel>
                            <FormControl>
                              <Input
                                placeholder=""
                                type="file"
                                multiple
                                {...field}
                              />
                            </FormControl>
                            <FormDescription>
                              You can upload multiples image
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {/* <div> */}
                      {/* <Input
                      label="Title"
                      variant="underlined"
                      {...register("title")}
                    />
                    {errors.title && <span>{errors.title.message}</span>}
                  </div>
                  <div>
                    <Textarea
                      variant="underlined"
                      label="Content"
                      {...register("content")}
                    />
                    {errors.content && <span>{errors.content.message}</span>}
                  </div>
                  <div>
                    <Input
                      type="file"
                      variant="flat"
                      label="Thumbnail"
                      {...register("thumbnail")}
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      label="Main Image"
                      {...register("main_image")}
                    />
                  </div>
                  <div>
                    <Input
                      type="file"
                      label=" Images"
                      {...register("images")}
                      multiple
                    />
                  </div> */}
                      <Button variant="flat" type="submit">
                        Create Post
                      </Button>
                    </form>
                  </Form>
                </ModalBody>
                <ModalFooter>
                  <Button color="danger" variant="light" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" onPress={onClose}>
                    Create Post
                  </Button>
                </ModalFooter>
              </>
            )}
          </ModalContent>
        </Modal>
      </div>
      <Table isStriped aria-label="Example static collection table">
        <TableHeader>
          <TableColumn>TITLE</TableColumn>
          <TableColumn>DESCRIPTION</TableColumn>
          <TableColumn>THUMBNAIL</TableColumn>
          <TableColumn>Action</TableColumn>
        </TableHeader>
        <TableBody emptyContent={"No blogs to display."}>
          <TableRow key="1">
            <TableCell>Tony Reichert</TableCell>
            <TableCell>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Quasi
              sequi minima natus ducimus! Nobis quos optio quibusdam est ea
              nihil officiis tempora aut magni labore eaque culpa, quia sed
              minima.
            </TableCell>
            <TableCell>
              <Image src=''  alt="Blog Thumbnail"/>
            </TableCell>
            <TableCell>
              <div className=" flex gap-2 px-3 ">
                <Link href="/blog/id" target="_blank">
                  <IoMdEye className=" text-xl text-primary-600" />{" "}
                </Link>
                <Link href="">
                  <CiEdit className="text-xl text-primary" />{" "}
                </Link>
                <Link href="">
                  <MdDelete className=" text-xl text-destructive" />
                </Link>
              </div>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </main>
  );
}
