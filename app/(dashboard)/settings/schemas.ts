import { z } from "zod";

const requiredStringSchema = z.string().min(1, "Required");
const numberSchema = z
  .string()
  .min(1, "Required")
  .regex(/^[0-9.]*$/, "Only Numbers");
  
  const phoneSchema =   z.string()
  .min(10, "Phone number must be at least 10 digits")
  .max(15, "Phone number must be at most 15 digits")
  .regex(/^\d+$/, "Phone number must contain only digits")

  export const settingsSchema = (hasSettings: boolean) =>
    z
      .object({
        companyName: requiredStringSchema,
        email: requiredStringSchema.email("Enter Valid Email"),
        oldPassword: z.string().optional(),
        password: z
          .string()
          .min(8, "At Least 8 Characters")
          .regex(/[a-z]/, "At least one lowercase letter")
          .regex(/[A-Z]/, "At least one uppercase letter")
          .regex(/\d/, "At least one number")
          .regex(/[!@#$%^&*(),.?":{}|<>]/, "At least one special character")
          .optional().or(z.literal('')), // Initially optional for conditional checks
        phoneNumber: phoneSchema,
        whatsAppNumber: phoneSchema,
      })
      .refine(
        (data) => {
          if (hasSettings) {
            // If settings exist, oldPassword is required if password is provided
            return !data.password || data.oldPassword;
          } else {
            // If no settings, password must be provided
            return !!data.password;
          }
        },
        {
          message: "Required",
         
          path:hasSettings ? ["oldPassword"] : ["password"], // Adjust error path dynamically
        }
      );
