import React from "react";
import { startOfDay, endOfDay, subDays } from "date-fns";
import { formatToDollar, getDailyRevenue } from "@/lib/utils";
import { ArrowDown, ArrowUp, CircleSlash, Minus } from "lucide-react";

type Props = {};

const DailyRevenue = async (props: Props) => {
  const date = new Date();
  const { dailyRevenue, yesterDayRevenue, percentageChange, trend } =
    await getDailyRevenue(new Date());

  const Icon =
    trend === "down" ? (
      <ArrowDown className="w-6 h-6 text-red-400" />
    ) : trend === "up" ? (
      <ArrowUp className="w-6 h-6 text-green-400" />
    ) : (
      <CircleSlash className="w-6 h-6 text-muted-foreground" />
    );

  return (
    <div>
      <h3 className="font-bold text-lg text-site-primary capitalize">
        Income For Today
      </h3>
      <div className="flex items-center gap-2">
        <p className="text-[28px] font-[700]">{formatToDollar(dailyRevenue)}</p>
        <span>{Icon}</span>
      </div>
      <p className="text-xs text-muted-foreground">
        <span className="text-black font-medium">{percentageChange}</span>{" "}
        compared to{" "}
        <span className="text-black font-medium">
          {formatToDollar(yesterDayRevenue)}
        </span>{" "}
        yestaerday
      </p>
    </div>
  );
};

export default DailyRevenue;
