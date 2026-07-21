import Heading from "@/app/(dashboard)/_components/Heading";
import { cn } from "@/lib/utils";
import React, { PropsWithChildren } from "react";

type Props = {
  title: string;
  className?: string;
  headingClassName?:string
} & PropsWithChildren;

const FormWrapper = ({ children, title, className,headingClassName }: Props) => {
  return (
    <div
      className={cn(
        "p-[30px] border rounded-[13.91px] flex flex-col gap-[21px]",
        className
      )}
    >
      <Heading title={title} className={cn('text-black text-[31px] font-[700]',headingClassName)} />
      {children}
    </div>
  );
};

export default FormWrapper;
