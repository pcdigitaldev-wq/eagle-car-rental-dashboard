import { wait } from "@/lib/utils";
import Heading from "./_components/Heading";
import MonthlyChart from "./_components/MonthlyChart";
import DashboardContainer from "./_components/DashboardContainer";

import { Suspense } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import CarAvailability from "./_components/CarAvailability";
import DailyRevenue from "./_components/DailyRevenue";
import { Metadata } from "next";

type Props = {};

export const revalidate = 0
export const metadata:Metadata = {
  title:{
    default:"Dashboard",
    template:"%s | Eagle Car Rental"
  },
  icons:{
    icon:'/icon.png'
  }
}
export default async function HomeMainPage(props: Props) {
  return (
    <div>
      <Heading title="Dashboard" />
      {/* Daily Revenue */}
      <DashboardContainer>
        <Suspense fallback={<Skeleton className=" min-h-[400px] rounded-md" />}>
          <DailyRevenue />
        </Suspense>
      </DashboardContainer>
      {/* Monthly Revenue */}
      <DashboardContainer>
        <Suspense fallback={<Skeleton className=" min-h-[400px] rounded-md" />}>
          <MonthlyChart />
        </Suspense>
      </DashboardContainer>
      {/* Car Availability */}
      <DashboardContainer>
        <Suspense fallback={<Skeleton className=" min-h-[400px] rounded-md" />}>
          <CarAvailability />
        </Suspense>
      </DashboardContainer>
    </div>
  );
}
