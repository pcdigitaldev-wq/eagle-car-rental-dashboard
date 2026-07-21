'use client'

import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "./ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
  } from "@/components/ui/select"
import { HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues,Model> = {
    form: UseFormReturn<T>;
    name: Path<T>; 
    label: string,
    placeholder: string,
    labelStyles?:string,
    inputStyles?:string,
    optionStyles?:string
    values:Model[]
    renderItem: (item: Model) => { value: string; label: string }

  };

const SelectField = <T extends FieldValues, Model>({form,label,placeholder,name,values,renderItem,labelStyles,inputStyles,optionStyles}: Props<T,Model>) => {
  return (
    <FormField
          control={form.control}
          name={name}
          render={({ field }) => (
            <FormItem>
              <FormLabel className={cn("text-[#606060]",labelStyles)}>{label}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className={cn('',inputStyles)}>
                    <SelectValue placeholder={placeholder} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                {values.map((item) => {
                const { value, label } = renderItem(item);
                return (
                  <SelectItem className={cn(' cursor-pointer ',optionStyles)} key={value} value={value}>
                    {label}
                  </SelectItem>
                );
              })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
  )
}

export default SelectField