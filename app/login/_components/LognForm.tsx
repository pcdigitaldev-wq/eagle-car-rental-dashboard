"use client";

import { useLogin } from "../hooks/useLogin";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { Input } from "@/components/ui/input";

import { Button } from "@/components/ui/button";
import InputField from "@/components/InputField";
import Image from "next/image";
import { Loader } from "lucide-react";
import SuperButton from "@/components/SuperButton";
 

type Props = {};

const LognForm = (props: Props) => {
  const { form, onSubmit, pending } = useLogin();
  return (
    <div className="flex flex-col p-12 border rounded-md w-[350px] ">
      <div className="px-12 mb-8 bg-site-primary rounded-md">
        <div className="relative w-[200px] mx-auto aspect-video">
          <Image
          priority
            src={"/Logo.png"}
            className="object-contain"
            fill
            alt="login-logo"
          />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <InputField
            name="username"
            inputStyles=""
            form={form}
            label="Username"
            placeholder="Username"
            type="text"
          />
          <InputField
            name="password"
            inputStyles=""
            form={form}
            label="Password"
            placeholder="Password"
            type="password"
          />
         <SuperButton
         buttonType="loadingButton" 
         className=" w-full"
         title="Login"
         type="submit"
         loading={pending} 
         />
        </form>
      </Form>
    </div>
  );
};

export default LognForm;
