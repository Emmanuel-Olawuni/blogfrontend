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
import { blogForm } from "@/lib/type";
import { useAuthHooks } from "@/components/hooks/Authhooks";
import { useRouter } from "next/router";
import { toast } from "react-toastify";

const page = ({ params }: { params: { id: string } }) => {
  const { user } = useAuthHooks();
  const router = useRouter();

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
    thumbnail: z.instanceof(File).optional(),

    main_image: z.instanceof(File).optional(),

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

  const [loading, isLoading] = useState<boolean>(true);
  const [blog, setBlog] = useState<blogForm>();
  useEffect(() => {
    const fetchPost = async () => {
      const response = await AxiosInstance.get(`/blogs/${params.id}`);
      console.log("blog response", response);

      setBlog(response.data);
      isLoading(false);
    };
    fetchPost();
  }, []);
  async function onSubmit(data: z.infer<typeof schema>) {
    console.log(data);

    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

    formData.append("content", data.content);
    if (data.thumbnail) {
      formData.append("thumbnail", data.thumbnail);
    }
    if (data.main_image) {
      formData.append("mainImage", data.main_image);
    }
    if (data.images && data.images.length > 0) {
      Array.from(data.images).forEach((file, index) => {
        formData.append(`images[${index}]`, file);
      });
    }

    try {
      const response = await AxiosInstance.put(
        `/blogs/${params.id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log("post blog", response);

      if (response.status === 200) {
        toast.success("Blog Edited Successfully");
        router.push("/");
      } else {
        toast.error("Wrong Params Sent");
      }
    } catch (error) {
      toast.error("Unable to edit blog Post");
    }
  }

  return (
    <div className="   items-center flex flex-col justify-center  p-4">
      <h2 className=" font-bold text-xl text-center "> Edit Blog Post</h2>
      {loading ? (
        <Spinner label="Please wait ..." size="md" color="default" />
      ) : (
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
                    <Input placeholder={blog?.title} {...field} />
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
                    <Input placeholder={blog?.decsription} {...field} />
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
                      placeholder={blog?.content}
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
                    <Input
                      placeholder=""
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files as FileList))
                      }
                      type="file"
                    />
                  </FormControl>
                  <FormDescription>
                    Previous Thumbnail: {blog?.thumbnail}
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
                  <Input
                      placeholder=""
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files as FileList))
                      }
                      type="file"
                    />                  </FormControl>
                  <FormDescription>
                    Previous Image: {blog?.mainImage}
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
                      onChange={(e) =>
                        field.onChange(Array.from(e.target.files as FileList))
                      }
                      type="file"
                    />                  </FormControl>
                  {blog?.otherImages.map((x, i) => (
                    <FormDescription key={i}>
                      Previous Images: {x}
                    </FormDescription>
                  ))}

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
    </div>
  );
};

export default page;
