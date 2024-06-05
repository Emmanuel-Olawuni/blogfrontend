"use client";
import React, { useState, useEffect } from "react";
import { Input } from "@/components/ui/input";
import * as z from "zod";
import { useForm } from "react-hook-form";
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
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import { Button, Spinner } from "@nextui-org/react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import AxiosInstance from "@/components/hooks/AxiosInstance";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";
import { useAuthHooks } from "@/components/hooks/Authhooks";

const page = () => {
  const router = useRouter();
  const [loading, isLoading] = useState<boolean>(false);
  const { user } = useAuthHooks();

  if (!user) {
    router.push("/login");
  }
  const schema = z.object({
    title: z.string().min(2, {
      message: "Title must be more than 2 characters",
    }),
    content: z.string().min(5, {
      message: "Minimum charater is 5",
    }),
    thumbnail: z.any().optional(),

    main_image: z.any().optional(),

    images: z.array(z.instanceof(File)).optional(),
    description: z
      .string()
      .min(6, {
        message: "Minumum of 6 characters",
      })
      .max(100, {
        message: "Maximum of 100 characters",
      }),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      content: "",
      description: "",
    },
  });

  async function onSubmit(data: z.infer<typeof schema>) {
    isLoading(true);
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("content", data.content);
    if (data.thumbnail[0]) {
      formData.append("thumbnail", data.thumbnail[0]);
    }
    if (data.main_image[0]) {
      formData.append("mainImage", data.main_image[0]);
    }
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    try {
      const response = await AxiosInstance.post("/blogs", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.status === 200) {
        toast.success("Blog Created Successfully");
        isLoading(false);
        router.push("/");
      } else {
        isLoading(false);
        toast.error("Wrong Params Sent");
      }
    } catch (error) {
      isLoading(false);
      toast.error("Unable to create blog Post");
    }
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input placeholder="" {...field} />
                </FormControl>
                <FormDescription>Write the blog description</FormDescription>
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
                  <ReactQuill theme="snow" {...field} />
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
                  <Input
                    placeholder=""
                    onChange={(e) =>
                      field.onChange(
                        Array.from((e.target.files as FileList) ?? null)
                      )
                    }
                    type="file"
                  />
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
                  <Input
                    placeholder=""
                    onChange={(e) =>
                      field.onChange(
                        Array.from((e.target.files as FileList) ?? null)
                      )
                    }
                    type="file"
                  />
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
                  <Input
                    placeholder=""
                    onChange={(e) =>
                      field.onChange(
                        Array.from((e.target.files as FileList) ?? null)
                      )
                    }
                    type="file"
                    multiple
                  />
                </FormControl>
                <FormDescription>
                  You can upload multiples image
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {loading ? (
            <Spinner label="Creating Blog...." size="md"/>
          ) : (
            <Button variant="solid" className=" bg-primary text-white"  type="submit">
              Create Post
            </Button>
          )}
        </form>
      </Form>
    </div>
  );
};

export default page;
