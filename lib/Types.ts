import { $Enums, Car } from "@prisma/client";

export const SEATS = [2, 4, 5, 7, 8];
export const SEATS_CONST = [2, 4, 5, 7, 8] as const;
export const SEATS_MAP: Record<(typeof SEATS_CONST)[number], string> = {
  "2": "2 Seats",
  "4": "4 Seats",
  "5": "5 Seats",
  "7": "7 Seats",
  "8": "8 Seats",
};

export const FUEL = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"];
export const FUEL_CONST = ["GASOLINE", "DIESEL", "ELECTRIC", "HYBRID"] as const;
export const FUEL_MAP: Record<(typeof FUEL_CONST)[number], string> = {
  GASOLINE: "gasoline",
  DIESEL: "diesel",
  ELECTRIC: "electric",
  HYBRID: "hybrid",
};

export const LOCATIONS = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"];
export const LOCATIONS_CONST = ["LOS_ANGELES", "LAS_VEGAS", "ORLANDO"] as const;
export const LOCATIONS_MAP: Record<(typeof LOCATIONS_CONST)[number], string> = {
  LAS_VEGAS: "las vegas",
  LOS_ANGELES: "los angeles",
  ORLANDO: "orlando",
};
export type LocationType = (typeof LOCATIONS_CONST)[number];
export const BOOKING_STATUS = ["PENDING", "PAID", "CANCELLED"];
export const BOOKING_STATUS_CONST = ["PENDING", "PAID", "CANCELLED"] as const;
export const BOOKING_STATUS_MAP: Record<
  (typeof BOOKING_STATUS_CONST)[number],
  string
> = {
  PENDING: "pending",
  PAID: "paid",
  CANCELLED: "cancelled",
};
export const BOOKING_STATUS_MAP_CLASSNAME: Record<
  (typeof BOOKING_STATUS_CONST)[number],
  string
> = {
  PAID: "bg-[#ECFDF3] text-green-700",
  PENDING: "bg-yellow-50 text-yellow-700",
  CANCELLED: "bg-red-50 text-red-700",
};

export const TAKE_BOOKINGS = 10;

export type CarCardWithCarType = {
  id: string;
  image: string;
  subTitle: string;
  slug: string;
  carType: { title: string };
};

export type BookingTable = {
  status: $Enums.BookingStatus;
  email: string;
  createdAt: Date;
  bookingID: string;
  firstName: string;
  lastName: string;
  totalAmount: number;
  payNow: number;
  startDate: Date;
  endDate: Date;
};
