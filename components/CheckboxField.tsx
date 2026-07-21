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
import { Checkbox } from "./ui/checkbox";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  labelStyles?: string;
};

const CheckboxField = <T extends FieldValues>({
  form,
  label,
  name,
  labelStyles,
}: Props<T>) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="flex items-center space-x-2">
              <Checkbox
                checked={field.value}
                onCheckedChange={(checked) => field.onChange(checked)}
                id={name}
              />
              <FormLabel
                htmlFor={name}
                className={cn("text-[#606060] cursor-pointer", labelStyles)}
              >
                {label}
              </FormLabel>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default CheckboxField;
