"use state";
import { generateTimeSlots } from "@/lib/utils";
import { useMutation } from '@tanstack/react-query'
import { useMemo, useState } from "react";
import { getAvailability } from "../(dashboard)/actions/getAvailability";
import { toast } from "sonner";

export const useDailyRevenue = () => {
  const [carId, setCarId] = useState("");

  const [startDate, setStartDate] = useState("");
  const [startTime, setStartTime] = useState("");

  const [endDate, setEndDate] = useState("");
  const [endTime, setEndTime] = useState("");

  const setCarIdFn = (value: string) => {
    setCarId(value);
  };
  const setStartDateFn = (value: string) => {
    setStartDate(value);
  };

  const setStartTimeFn = (value: string) => {
    setStartTime(value);
  };

  const setEndDateFn = (value: string) => {
    setEndDate(value);
  };

  const setEndTimeFn = (value: string) => {
    setEndTime(value);
  };

  const hours = useMemo(() => generateTimeSlots(30), []);


  const availabilityQuery = useMutation({
    mutationFn:async()=>await getAvailability(carId,startDate,startTime,endDate,endTime),
  })


  const fetchFn =async ()=>{
 
    if(!carId || !startDate || !startTime || !endDate || !endTime){
        toast.error("Choose All Required Info")
        return
    }

   availabilityQuery.mutate()
  }

  return {
    carId,
    startDate,
    startTime,
    endDate,
    endTime,
    setCarIdFn,
    setStartDateFn,
    setStartTimeFn,
    setEndDateFn,
    setEndTimeFn,
    hours,
    availabilityQuery,
    fetchFn
  };
};
