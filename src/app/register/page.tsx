// src/components/RegisterForm.js
"use client";
import React, { useContext } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import axios from "axios";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
// import { useHistory } from 'react-router-dom';
// import { AuthContext } from "../contexts/AuthContext";
import { MdTextFields } from "react-icons/md";
import { MdEmail, MdLock } from "react-icons/md";
import { Button, Input } from "@nextui-org/react";
import Link from "next/link";
import { Register } from "@/lib/type";
import { useAuthHooks } from "@/components/hooks/Authhooks";

const schema = z.object({
  name: z
    .string({
      required_error: "Name field is required.",
    })
    .min(2, {
      message: "Name must be at least 2 characters",
    }),
  email: z
    .string({
      required_error: "Email field is required.",
    })
    .email({
      message: "Invalid email format",
    }),
  password: z
    .string({
      required_error: "Password field is required.",
    })
    .min(6, {
      message: "Password must be at least 6 characters",
    }),
});

const RegisterForm = () => {
  const { registerUser } = useAuthHooks();
  // const history = useHistory();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Register>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Register> = async (data) => {
    console.log(data);
    
    await registerUser(data.name, data.email, data.password);
    console.log(data);
    try {
    } catch (error) {
      console.error("Registration error", error);
    }
  };

  return (
    <div className={`flex flex-col justify-center px-6 py-12 lg:px-8  `}>
      <h2 className=" px-6 py-8 text-center text-2xl font-bold tracking-tight text-gray-900">
        Register a new account
        <p className=" text-md">
          already have an account{" "}
          <Link href="/login" className=" underline underline-offset-6">
            {" "}
            login here
          </Link>
        </p>
      </h2>

      <div className=" mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mt-10 space-y-8 flex flex-col gap-3 px-4 py-6 items-center  "
        >
          <Input
            isClearable
            label="Name"
            variant="flat"
            {...register("name")}
            startContent={
              <MdTextFields className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
         
            className=" max-w-md"
            aria-invalid={errors.name ? true : false}
          />{" "}
          {errors.name?.type === "required" && (
            <p role="alert destructive">Name is required.</p>
          )}
          {errors.name?.type === "min" && (
            <p role="alert destructive">Name must be at least 2 characters</p>
          )}
          <Input
            isClearable
            label="Email"
            variant="flat"
            {...register("email")}
            startContent={
              <MdEmail className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
            type="email"
            className=" max-w-md"
            aria-invalid={errors.email ? true : false}
          />{" "}
          {errors.email?.type === "required" && (
            <p role="alert " className="destructive">Email is required.</p>
          )}
          {errors.email?.type === "pattern" && (
            <p role="alert destructive">Invalid email format</p>
          )}{" "}
          <Input
            label="Password"
            variant="flat"
            {...register("password")}
            startContent={
              <MdLock className=" pointer-events-none flex-shrink-0 text-2xl" />
            }
            type="password"
            className=" max-w-md"
            aria-invalid={errors.password ? true : false}
          />{" "}
          {errors.password?.type === "required" && (
            <p role="alert destructive">Password is required.</p>
          )}
          {errors.password?.type === "min" && (
            <p role="alert destructive">
              Password must be at least 6 characters
            </p>
          )}{" "}
          <Button
            type="submit"
            variant="flat"
            className="flex w-full bg-black max-w-md justify-center rounded-md py-1.5 text-sm leading-6 text-white "
          >
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
