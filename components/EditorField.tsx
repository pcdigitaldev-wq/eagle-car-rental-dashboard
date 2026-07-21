"use client";

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import dynamic from "next/dynamic";
const Editor = dynamic(() => import("@/components/Editor"), { ssr: false });

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  labelStyles?: string;
  editorStyles?: string;
};

const EditorField = <T extends FieldValues>({
  form,
  label,
  placeholder,
  name,
  editorStyles,
  labelStyles,
}: Props<T>) => {


  const theme: {
    colors: {
      editor: {
        text: string;
        background: string;
      };
    };
  } = {
    colors: {
      editor: {
        background: "#F5F6FA",
        text: "#777",
      },
    },
  };
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className={cn("text-[#606060]", labelStyles)}>
            {label}
          </FormLabel>
          <FormControl>       
              <Editor
              className={cn('rounded-sm border bg-[#F5F6FA] focus-within:ring-1 focus-within:ring-ring border-input min-h-[40px] pt-1',editorStyles)}
                placeholder={placeholder}
                onChange={field.onChange}
                initialContent={field.value}
                theme={theme}
              />          
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default EditorField;
