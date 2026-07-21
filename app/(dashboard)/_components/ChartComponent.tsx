"use client";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

type ChartData = {
  x: string;
  y: number;
};

type Props = {
  chartData: ChartData[];
};

const ChartComponent = ({ chartData }: Props) => {
  const paddedChartData = [{ x: "00", y: 0 }, ...chartData];
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={paddedChartData}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis
          dataKey="x"
          tickFormatter={(tick) => (tick === "00" ? "" : tick)}
        />
        <YAxis  />
        <Tooltip />
        <Line type="monotone" dataKey="y" stroke="#2A82FE"  dot={false} strokeWidth={2} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ChartComponent;
