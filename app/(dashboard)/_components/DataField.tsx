"use client";

import * as React from "react";
import { format } from "date-fns";
import { Calendar as CalendarIcon } from "lucide-react";

import { cn, convertDateToISOString } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import StateLabel from "./StateLabel";
import { formatInTimeZone } from "date-fns-tz";
 
 

type Props = {
  value: string;
  setValue: (val: string) => void;

  stateLabel?: string;
  placeholder: string;
};

const DateField = ({ placeholder, setValue, value, stateLabel }: Props) => {
  const [open, setOpen] = React.useState(false);
  return (
    <div>
      {stateLabel && <StateLabel stateLabel={stateLabel} />}
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-full justify-start text-left font-normal line-clamp-1 flex"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4" />
            {value ? formatInTimeZone(value,"UTC", "MMM, dd yyyy"): <span>{placeholder}</span>}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0">
          <Calendar
            disabled={(date) => {
                const today = new Date(); 
                today.setHours(0, 0, 0, 0); 
                return date < today
            }}
            classNames={{day_selected:'bg-site-primary text-white'}}
            mode="single"
            selected={new Date(value)}
            onSelect={(date) => {
              setOpen(false);
              const refactoredDate = convertDateToISOString(date)
              setValue(refactoredDate || '');
              console.log("Chosen Date:",refactoredDate)
            }}
            initialFocus
          />
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default DateField;
