"use client";
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
import AxiosInstance from "../hooks/AxiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DeleteComponent = ({ dataID }: { dataID: string }) => {
  const router = useRouter();

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  async function onSubmit() {
    try {
      const response = await AxiosInstance.delete(`/blogs/${dataID}`);
      console.log("post blog", response);

      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        router.push("/");
      } else {
        toast.error("unable to delete blog post");
      }
    } catch (error) {
      toast.error("Unable to delete blog Post");
    }
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
              <ModalFooter>
                <Button color="danger" variant="solid" onPress={onSubmit}>
                  Delete
                </Button>
                <Button color="default" variant="light" onPress={onClose}>
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
