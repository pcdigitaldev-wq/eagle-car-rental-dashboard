"use client";

import * as React from "react";
import { Check, ChevronDown, ChevronsUpDown, Loader } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import StateLabel from "./StateLabel";

type Props = {
  minWidth?:boolean,
  noBorder?:boolean,
  items: { value: string; label: string }[];
  noItems?: string;
  placeholder?: string;
  param: string;
  value:string | null,
  setValue:(value:string)=>void
  
} & ({push:true} | {push:false,stateLabel:string})

export function ComboBoxField({
  value,
  setValue,
  items,
  noBorder,
  noItems = "No Items Found",
  placeholder = "Select Item",
  param,
  minWidth,
  ...rest
}: Props) {

  const [open, setOpen] = React.useState(false);
  const searchParams = useSearchParams();
  const isPush = rest.push

 
  const initialLabel =
    items.find((item) => item.value === value)?.label || "";

 
  const [label, setLabel] = React.useState(initialLabel);


  const router = useRouter();
  const [pending, startTransition] = React.useTransition();

 
  React.useEffect(() => {
   
    if (value && isPush) {
      const params  = new URLSearchParams(searchParams)
      params.set(param,value)
      startTransition(() => {
        router.push(`/cars?${params.toString()}`,{scroll:false});
      });
    }
  }, [value]);

  return (
    <div>
      {!rest.push &&   <StateLabel stateLabel={rest.stateLabel} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild className={cn("",noBorder && "border-none hover:bg-transparent bg-transparent shadow-none")}>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={cn(" w-full justify-between capitalize ",minWidth && "min-w-[200px]")}
          >
            {value
              ? <span className="line-clamp-1 w-full flex-1">{items.find((item) => item.label === label)?.label}</span> 
              : placeholder}
            {pending ? (
              <Loader className="animate-spin ml-2 h-4 w-4 shrink-0 opacity-50" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0">
   
          <Command>
            <CommandInput placeholder={placeholder} />
            <CommandList>
              <CommandEmpty>{noItems}</CommandEmpty>
              <CommandGroup>
                {items.map((item) => (
                  <CommandItem
                    className="cursor-pointer capitalize"
                    key={item.value}
                    value={item.label}
                    onSelect={() => {
                      setValue(item.value);
                      setLabel(item.label);
                      setOpen(false);
                    }}
                  >
                    <Check
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === item.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {item.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}

export default ComboBoxField;
