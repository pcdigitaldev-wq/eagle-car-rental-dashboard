'use client'

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";
import { Textarea } from "./ui/textarea";

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>; 
    label: string,
    resize?:boolean,
    placeholder: string,
    labelStyles?:string,
    inputStyles?:string,

  };

const TextAreaField = <T extends FieldValues>({form,label,placeholder,name,inputStyles,labelStyles,resize=false}: Props<T>) => {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className={cn('text-[#606060]',labelStyles)}>{label}</FormLabel>
        <FormControl>
          <Textarea  className={cn(`${!resize && 'resize-none'}`,inputStyles)} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default TextAreaField