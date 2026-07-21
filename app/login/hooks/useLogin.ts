import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { log } from "@/lib/utils";

const loginSchema = z.object({
  username: z
    .string()
    .min(2, { message: "Required" })
    .max(50, { message: "Maximum 50 chars" }),
  password: z
    .string()
    .min(8, { message: "At least 8 chars" })
    .max(50, { message: "Maximum 50 chars" }),
});

export const useLogin = () => {
  const router = useRouter();
  const [pending, startTransition] = useTransition()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    startTransition(async()=>{
      
        try {
            const res = await signIn("credentials", {
              username: values.username,
              password: values.password,
              redirect: false,
            });
            if (res?.error) {
              toast.error("Invalid Credentials");
            } else {
              router.replace("/");
            }
        
          } catch (error) {
            log({
              type:'error',
              messages:[error]
            });
          }
    })
  
  }

  return { form, onSubmit,pending };
};
