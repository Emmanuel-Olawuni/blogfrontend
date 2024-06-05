"use client";
import React, { useState } from "react";
import { MdDelete } from "react-icons/md";
import {
  Modal,
  ModalContent,

  ModalFooter,
  useDisclosure,
  Button,
  Spinner,
} from "@nextui-org/react";

import AxiosInstance from "../hooks/AxiosInstance";
import { toast } from "react-toastify";
import { useRouter } from "next/navigation";
const DeleteComponent = ({ dataID }: { dataID: string }) => {
  const router = useRouter();
  const [loading, isLoading] = useState<boolean>(false);

  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  async function onSubmit() {
    isLoading(true)
    try {
      const response = await AxiosInstance.delete(`/blogs/${dataID}`);

      if (response.status === 200) {
        toast.success("Blog Deleted Successfully");
        isLoading(false)
        router.push("/create");
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
                {loading ? (
                  <Spinner label="Deleting ..." />
                ) : (
                  <>
                    <Button color="danger" variant="solid" onPress={onSubmit}>
                      Delete
                    </Button>
                    <Button color="default" variant="light" onPress={onClose}>
                      Close
                    </Button>
                  </>
                )}
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};

export default DeleteComponent;
