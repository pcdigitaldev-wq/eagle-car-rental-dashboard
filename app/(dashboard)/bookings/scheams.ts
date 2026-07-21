import { BookingStatus, PaymentMethod } from "@prisma/client";
import { z } from "zod";
const requiredStringSchema = z.string().min(1, "Required");
const numberSchema = z
  .string()
  .min(1, "Required")
  .regex(/^[0-9.]*$/, "Only Numbers");

const phoneSchema = z
  .string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be at most 15 digits")
  .regex(/^\d+$/, "Phone number must contain only digits");

const drivingDetails = z.object({
  email: requiredStringSchema.email("Enter Valid Email"),
  firstName: requiredStringSchema,
  middleName: requiredStringSchema,
  lastName: requiredStringSchema,
  contactNumber: phoneSchema,
});

const billingAddress = z.object({
  billingFirstName: requiredStringSchema,
  billingMiddleName: requiredStringSchema,
  billingLastName: requiredStringSchema,
  billingContactNumber: phoneSchema,
  address: requiredStringSchema,
  City: requiredStringSchema,
  State: requiredStringSchema,
  Zipcode: requiredStringSchema,
});

const requiredDocuments = z.object({
  license: requiredStringSchema,
  insurance: requiredStringSchema,
  returnFlight: requiredStringSchema,
});

const date = z
  .object({
    startDate: requiredStringSchema.refine(
      (data) => !isNaN(Date.parse(data)),
      "Invalid Start Date"
    ),
    endDate: requiredStringSchema.refine(
      (data) => !isNaN(Date.parse(data)),
      "Invalid Start Date"
    ),
  })
  .refine((data) => new Date(data.startDate) < new Date(data.endDate), {
    message: "End Date Should Be After Start Date",
    path: ["endDate"],
  });

const isBusiness = z
  .object({
    business: z.boolean().optional(),
    companyName: z.string().optional().or(z.literal("")),
    companyVat: z.string().optional().or(z.literal("")),
  })
  .refine((data) => !data.business || !!data.companyName, {
    path: ["companyName"],
    message: "Required",
  })
  .refine((data) => !data.business || !!data.companyVat, {
    path: ["companyVat"],
    message: "Required",
  });

const location = z.object({
  pickupLocation: requiredStringSchema,
  dropoffLocation: z.string().optional().or(z.literal("")),
});

const prices = z.object({
  price: numberSchema,
  totalAmount: numberSchema,
  paymentMethod: z.nativeEnum(PaymentMethod),
  extraOptions: z.array(
    z.object({
      id: z.string().optional().or(z.literal("")),
      title: z.string().min(1, "Required").max(100),
      price: numberSchema,
      daily:z.boolean()
    })
  ),
});

const status = z.object({
  status: z.nativeEnum(BookingStatus),
  terms:z.boolean().refine(value=>!!value ,{message:"You Must Accept Terms & Conditions."})
});

export const bookingSchema = drivingDetails
  .and(billingAddress)
  .and(requiredDocuments)
  .and(date)
  .and(isBusiness)
  .and(location)
  .and(prices)
  .and(status);
