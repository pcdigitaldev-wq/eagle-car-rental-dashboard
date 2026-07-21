'use client'
import { useModal } from "@/app/hooks/zustand";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import Heading from "../../../_components/Heading";
import { useCategory } from "../../hooks/useCategory";
import {
  Form,
} from "@/components/ui/form";
import InputField from "@/components/InputField";
import SuperButton from "@/components/SuperButton";
import { useState } from "react";
import dynamic from "next/dynamic";
import { log } from "@/lib/utils";
const Editor = dynamic(()=>import('@/components/Editor'),{ssr:false})

type Props = {};

const CategoryModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const category = modalInputs?.modal === "category" ?  modalInputs.data : undefined;
  log({

    messages:["Category modal data",category]
  })
  const { form, onSubmit } = useCategory();
  const title = category ? `Update ${category.title}` : "Create Blog Category";
  const isOpen = open && modalInputs?.modal === "category";
  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Blog Category" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 
            <InputField
              form={form}
              label="Title"
              name="title"
              placeholder="Enter Category Title"
            />
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={category ? "Update" : "Create"}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
