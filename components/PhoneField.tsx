"use client";

import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import { CSSProperties, HTMLInputTypeAttribute } from "react";
import { cn } from "@/lib/utils";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label: string;
  placeholder: string;
  labelStyles?: string;
  inputStyles?: CSSProperties ;
  containerStyle?: CSSProperties ;
};

const PhoneField = <T extends FieldValues>({
  form,
  label,
  placeholder,
  containerStyle,
  name,
  inputStyles,
  labelStyles,
}: Props<T>) => {
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
            <PhoneInput
                country={'us'}
              enableSearch={true}
              buttonStyle={{ border: "none" }}
              containerStyle={{
                borderRadius: "4px",
                paddingBlock: 2,
                width: "100%",
                border: "1px #e5e5e5 solid",
                backgroundColor:'#F5F6FA',
                ...containerStyle
              }}
              inputStyle={{
                border: "none",
                width: "100%",
                backgroundColor: "transparent",
                ...inputStyles
              }}
              value={form.getValues(name)}
              onChange={(phone) =>
                form.setValue(name, phone as PathValue<T, Path<T>>)
              }
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};

export default PhoneField;
