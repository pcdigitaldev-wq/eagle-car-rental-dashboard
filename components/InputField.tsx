'use client'

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import { Input } from "./ui/input";
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
    form: UseFormReturn<T>;
    name: Path<T>; 
    label: string,
    placeholder: string,
    type?: HTMLInputTypeAttribute,
    labelStyles?:string,
    inputStyles?:string,

  };

const InputField = <T extends FieldValues>({form,label,placeholder,type = 'text',name,inputStyles,labelStyles}: Props<T>) => {
  return (
    <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel className={cn('text-[#606060]',labelStyles)}>{label}</FormLabel>
        <FormControl>
          <Input className={cn(inputStyles)} type={type} placeholder={placeholder} {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
  )
}

export default InputField