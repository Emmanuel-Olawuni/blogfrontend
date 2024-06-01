"use client";
import React, { useState } from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
  Skeleton,
} from "@nextui-org/react";
import Link from "next/link";
import {  Textarea } from "@nextui-org/react";
import { CiEdit } from "react-icons/ci";
import { Input } from "@/components/ui/input";

import * as z from "zod";
import { useForm } from "react-hook-form";
import { IoMdEye } from "react-icons/io";
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

const EditComponent = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [loading, isLoading] = useState<boolean>(true);
  const MAX_FILE_SIZE = 1024 * 1024 * 3; // 3MB
  const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/gif",
  ];

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
  return (
    <>
      <Button onPress={onOpen} variant="flat">
        <CiEdit className="text-xl text-primary" />{" "}
      </Button>

      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Blog Post
              </ModalHeader>
              <ModalBody>
                {loading ? (
                  <div className=" w-full flex flex-col gap-2">
                    <Skeleton className=" rounded-lg h-3 w-full" />
                    <Skeleton className=" rounded-lg h-3 w-full" />
                  </div>
                ) : (
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

                      <Button variant="flat" type="submit">
                        Create Post
                      </Button>
                    </form>
                  </Form>
                )}
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default EditComponent;
