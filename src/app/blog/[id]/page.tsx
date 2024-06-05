"use client";
import React, { FC, useEffect, useState } from "react";
import AxiosInstance from "@/components/hooks/AxiosInstance";
import { Spinner } from "@nextui-org/react";
import { toast } from "react-toastify";
import { useAuthHooks } from "@/components/hooks/Authhooks";
import { useRouter } from "next/navigation";


interface BlogData {
  content: string;
  title: string;
  images: string[];
  mainImage: string;
}

const BlogPage = ({ params }: { params: { id: string } }) => {


const { user } = useAuthHooks();
  const router = useRouter();

  if (!user) {
    router.push("/login");
  }
  const [loading, isLoading] = useState<boolean>(true);
  const [post, setPost] = useState<BlogData>();
  useEffect(() => {
    const fetchContent = async () => {
      try {
        const response = await AxiosInstance.get(`/blogs/${params.id}`);
        const data: BlogData = await response.data;
        setPost(data);
        isLoading(false);
      } catch (error) {
        toast.error("Unable to load post");
      }
    };

    fetchContent();
  }, [params.id]);
  return (
    <div>
      {loading ? (
        <Spinner label=" Loading blog post" />
      ) : (
        <>
          <h3 className=" font-bold leading-4 text-center text-xl">
            {post?.title}
          </h3>{" "}
          <img
            className=" h-[200px] w-[200px] object-contain items-center flex justify-center"
            src={`http://127.0.0.1:8000/storage/${post?.mainImage}`}
          />
          <BlogContent blogContent={post?.content} />
          {post?.images.map((x, i) => (
            <div className=" flex flex-col px-3 py-4 gap-3">
              <img
                key={i}
                src={`http://127.0.0.1:8000/storage/images/${x}`}
                className=" h-[200px] w-[200px] object-contain"
              />
            </div>
          ))}
        </>
      )}
    </div>
  );
};

export default BlogPage;

const BlogContent = ({ blogContent }: { blogContent: string | undefined }) => {
  return (
    <div className=" flex  max-w-md px-6 py-4">
      {blogContent ? (
        <p dangerouslySetInnerHTML={{ __html: blogContent }} />
      ) : (
        <p>No content Available</p>
      )}
    </div>
  );
};
