import React from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { PopoverClose } from "@radix-ui/react-popover";
import { ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";
import StateLabel from "./StateLabel";
 
type Props = {
  value: string;
  setValue: (val: string) => void;
  items: string[];
  stateLabel?: string;
  placeholder: string;
};

const PopOverField = ({
  items,
  setValue,
  value,
  placeholder,
  stateLabel,
}: Props) => {
  return (
    <div>
      {stateLabel && (
      <StateLabel stateLabel={stateLabel} />
      )}
      <Popover>
        <PopoverTrigger className="border cursor-pointer w-full px-[16px] py-[8px] text-sm rounded-md font-[500] shadow-sm flex items-center justify-between">
          <span className="line-clamp-1">{value ? value : placeholder}</span>
          <ChevronDown className="w-4 h-4 text-muted-foreground" />
        </PopoverTrigger>
        <PopoverContent
          className="w-[120px] h-[200px] overflow-y-auto px-2"
          side="bottom"
        >
          <div className="flex flex-col gap-1">
            {items.map((item, index) => (
              <PopoverClose
                key={`pickTime-${index}`}
                className={cn(
                  "py-2 hover:bg-site-primary/20 transition cursor-pointer  rounded-md text-xs   text-black  w-full text-center font-[500]",
                  value === item &&
                    "bg-site-primary text-white hover:bg-site-primary"
                )}
                onClick={() => setValue(item)}
              >
                {item}
              </PopoverClose>
            ))}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default PopOverField;
