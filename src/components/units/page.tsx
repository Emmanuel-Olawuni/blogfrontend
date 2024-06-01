"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { FaGoogle, FaFacebookF } from "react-icons/fa6";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
export default function Login() {
  const formSchema = z.object({
    email: z
      .string({
        invalid_type_error: "Invalid Email format",
      })
      .min(2, {
        message: "Username must be at least 2 characters",
      })
      .email({
        message: "Invalid email format",
      }),
    password: z.string().min(6, {
      message: "Password must be at least 6 characters",
    }),
  });
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onsubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }
  return (
    <div className={`flex min-h-full md:h-[86vh] flex-1 flex-col justify-center px-6 py-12 mb-3 lg:px-8  `}>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        {/* <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          /> */}
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Sign in to your account
        </h2>
      </div>

      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onsubmit)}>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2">
                    <FormLabel className="  block text-sm font-semibold leading-6 text-gray-900">
                      Email Address
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="example@gmail.com"
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <div className="mt-2">
                    <FormLabel className="  block text-sm font-semibold leading-6 text-gray-900">
                      <div className="flex items-center justify-between">
                        <label
                          htmlFor="password"
                          className="block text-sm font-semibold leading-6 text-gray-900"
                        >
                          Password
                        </label>
                        <div className="text-sm">
                          <a
                            href="#"
                            className="font-normal underline underline-offset-2 text-primary"
                          >
                            Forgot password?
                          </a>
                        </div>
                      </div>
                    </FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        placeholder="password"
                        id="password"
                        name="password"
                        type="password"
                        autoComplete="current-password"
                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </FormControl>
                  </div>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div>
              <Button
                type="submit"
                className="flex w-full justify-center rounded-md bg-primary px-3 hover:text-primary hover:border-1 hover:border-primary py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-transparent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                Sign Up
              </Button>
            </div>
          </form>
        </Form>

        <p className="mt-10 text-center text-sm text-gray-700">
          Not a member?{" "}
          <a
            href="#"
            className="font-semibold leading-6 text-primary hover:text-primary underline underline-offset-2"
          >
            Start a 14 day free trial
          </a>
        </p>

        <div className=" sm:mx-auto sm:w-full sm:max-w-sm">
          <p className=" text-muted-foreground px-3 py-4  text-sm underline underline-offset-2">
            Or continue with
          </p>
          <div className="button flex flex-col gap-3">
            <Button className="flex w-full justify-center rounded-md hover:bg-primary px-3  border-1 border-primary py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-sm bg-transparent focus-visible:outline  text-primary focus-visible:outline-2 focus-visible:outline-offset-2 ">
              <FaGoogle className="pr-2 " size={20} /> Google
            </Button>
            <Button className="flex w-full justify-center rounded-md hover:bg-primary px-3  border-1 border-primary py-1.5 text-sm font-semibold leading-6 hover:text-white shadow-sm bg-transparent focus-visible:outline  text-primary focus-visible:outline-2 focus-visible:outline-offset-2 ">
              <FaFacebookF className=" pr-2" size={20} /> Facebook
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
