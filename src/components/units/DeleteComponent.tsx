import React from "react";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
  Button,
} from "@nextui-org/react";
import Skeleton from "react-loading-skeleton";
import Link from "next/link";
import { Textarea } from "@nextui-org/react";
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
const DeleteComponent = ({ id }: { id: string }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const schema = z.object({
    id: z.string(),
  });
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      id: id,
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
    <div>
      <Button onPress={onOpen} variant="flat">
        <MdDelete className=" text-xl text-destructive" />
      </Button>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Edit Blog Post
              </ModalHeader>
              <ModalBody>
                <Form {...form}>
                  <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className=" space-y-6   gap-3 hidden"
                  >
                    <FormField
                      control={form.control}
                      name="id"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Input placeholder="" hidden {...field} />
                          </FormControl>
                        </FormItem>
                      )}
                    />

                    <Button variant="flat" color="primary" type="submit">
                      Delete Post
                    </Button>
                  </form>
                </Form>
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
    </div>
  );
};

export default DeleteComponent;
