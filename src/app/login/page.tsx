'use client'
import React, { useContext, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
// import { AuthContext } from '../contexts/AuthContext';
import { Button, Input } from "@nextui-org/react";
import { EyeFilledIcon } from "@/components/units/Eyefilled";
import { EyeSlashFilledIcon } from "@/components/units/Eyeslashed";
import { MdEmail, MdLock } from "react-icons/md";
import Link from "next/link";
import axios from "axios";
import { Login } from "@/lib/type";

const LoginForm = () => {
  const schema = z.object({
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
  // const { login } = useContext(AuthContext);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Login>({
    resolver: zodResolver(schema),
  });

  const onSubmit: SubmitHandler<Login> = async (data) => {
    // const response = await axios.get("http://127.0.0.1:8000/api/blogs");
    // console.log(response);

    // await login(data.email, data.password);
    console.log(data);
  };
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => setIsVisible(!isVisible);

  return (
    <div className={`flex flex-col justify-center px-6 py-12 lg:px-8  `}>
      <h2 className=" px-6 py-8 text-center text-2xl font-bold   tracking-tight text-gray-900">
        Login to your account
        <p className=" text-md">
          New account?{" "}
          <Link href="/register" className=" underline underline-offset-8">
            {" "}
            Register here
          </Link>
        </p>
      </h2>

      <div className="  sm:mx-auto sm:w-full sm:max-w-sm">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className=" space-y-8 flex flex-col gap-3 items-center  "
        >
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
            <p role="alert destructive">Email is required.</p>
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
            endContent={
              <button
                className="focus:outline-none"
                type="button"
                onClick={toggleVisibility}
              >
                {isVisible ? (
                  <EyeSlashFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                ) : (
                  <EyeFilledIcon className="text-2xl text-default-400 pointer-events-none" />
                )}
              </button>
            }
            type={isVisible ? "text" : "password"}
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

export default LoginForm;
