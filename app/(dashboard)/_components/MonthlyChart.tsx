import React from "react";
import ChartComponent from "./ChartComponent";
import {
  formatToDollar,
  getMonthlyRevenue,
  prepareChartData,
} from "@/lib/utils";
import { format } from "date-fns";

type Props = {};

const MonthlyChart = async (props: Props) => {
  const date = new Date();
  const year = date.getFullYear();
  const month = date.getMonth();
  const { bookings, monthlyRevenue } = await getMonthlyRevenue(year, month);

  // Prepare chart data
  const chartData = prepareChartData(bookings, year, month);

  return (
    <div className="">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <h3 className="font-bold text-lg text-site-primary capitalize">
            Monthly Revenue
          </h3>

          <p className="text-muted-foreground">
            {formatToDollar(monthlyRevenue)}
          </p>
        </div>
        <p className="text-xs ml-16 mb-2">
          {format(new Date(), "MMMM, dd yyyy")}
        </p>
      </div>

      <div className="h-[300px] mt-8">
        <ChartComponent chartData={chartData} />
      </div>
    </div>
  );
};

export default MonthlyChart;
