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

import {
  Form,
} from "@/components/ui/form";
import InputField from "@/components/InputField";
import SuperButton from "@/components/SuperButton";
import { useState } from "react";
import dynamic from "next/dynamic";
import { log } from "@/lib/utils";
import { useCategory } from "@/app/(dashboard)/blogs/hooks/useCategory";
import { useCarType } from "../../hooks/useCarType";
const Editor = dynamic(()=>import('@/components/Editor'),{ssr:false})

type Props = {};

const CarTypeModal = (props: Props) => {
  const { open, setClose, modalInputs } = useModal();
  const carType = modalInputs?.modal === "carType" ?  modalInputs.data : undefined;
  log({

    messages:["Category modal data",carType]
  })
  const { form, onSubmit } = useCarType();
  const title = carType ? `Update ${carType.title}` : "Create Car Type";
  const isOpen = open && modalInputs?.modal === "carType";
  return (
    <Dialog open={isOpen} onOpenChange={()=>{
      if(form.formState.isSubmitting) return
      setClose()
    }}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            <Heading title="Car Type" />
          </DialogTitle>
          <DialogDescription>{title}</DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
 
            <InputField
              form={form}
              label="Title"
              name="title"
              placeholder="Enter Car Type"
            />
            <SuperButton
              variant="site"
              className="w-full"
              type="submit"
              buttonType="loadingButton"
              loading={form.formState.isSubmitting}
              title={carType ? "Update" : "Create"}
            />
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default CarTypeModal;
