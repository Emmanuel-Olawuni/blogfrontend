"use client";
import React, { useState, useEffect } from "react";
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
import EditComponent from "@/components/units/EditComponent";
import DeleteComponent from "@/components/units/DeleteComponent";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import axios from "axios";
import { Button } from "@nextui-org/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

const page = () => {
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
        return !file || file.size <= 1024 * 1024 * 5;
      }, "File Size must be less than 3MB"),
    main_image: z
      .any()
      .optional()
      .refine((file) => {
        return !file || file.size <= 1024 * 1024 * 5;
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
    <div className="   items-center flex flex-col justify-center  p-4">
      <h2 className=" font-bold text-xl text-center ">
        {" "}
        Create A New Blog Post
      </h2>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className=" space-y-6 flex flex-col  gap-3"
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
                <FormDescription>Write the blog title</FormDescription>
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
                  <ReactQuill
                    theme="snow"
                    {...field}
                  />
                </FormControl>
                <FormDescription>Write the blog content</FormDescription>
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
                <FormDescription>Upload the thumbnail</FormDescription>
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
                <FormDescription>Upload the blog main image</FormDescription>
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
                  <Input placeholder="" type="file" multiple {...field} />
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
    </div>
  );
};

export default page;
