"use client";

import { useEdgeStore } from "@/lib/edgestore";
import { ReactNode, useState } from "react";
import { SingleImageDropzone } from "./SingleImageDropeZone";
import { Button } from "./ui/button";
import { Upload } from "lucide-react";
import { Label } from "./ui/label";
import { cn } from "@/lib/utils";
import { FieldValues, Path, UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";

type Props<T extends FieldValues> = {
  form: UseFormReturn<T>;
  name: Path<T>;
  label?: string;
  labelStyles?: string;
  file: File | undefined;
  setFile: (file: File | undefined) => void;
  uploadImage: () => Promise<void>;
  isDisabled: boolean;
  ImagePlaceholder: ReactNode;
};
export const SingleImageUploadField = <T extends FieldValues>({
  form,
  name,
  label = "Add image",
  labelStyles,
  file,
  setFile,
  uploadImage,
  isDisabled,
  ImagePlaceholder,
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
            <div className="flex gap-2">
              <div>
                <SingleImageDropzone
                  width={200}
                  height={200}
                  value={file}
                  onChange={(file) => {
                    setFile(file);
                  }}
                />
                {!isDisabled && (
                  <Button
                    variant={"site"}
                    className="w-[200px] mt-2"
                    disabled={isDisabled}
                    type="button"
                    onClick={async () => {
                      if (file) {
                        await uploadImage();
                      }
                    }}
                  >
                    <Upload className="w-10 h-10 ml-2" /> Upload
                  </Button>
                )}
              </div>
              {ImagePlaceholder}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  );
};
