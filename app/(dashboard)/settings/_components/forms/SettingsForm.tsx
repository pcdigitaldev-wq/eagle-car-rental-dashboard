"use client";

import React from "react";
import { useSettings } from "../../hooks/useSettings";
import { Settings } from "@prisma/client";

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SuperButton from "@/components/SuperButton";
import FormWrapper from "@/components/FormWrapper";
import InputField from "@/components/InputField";
import PhoneField from "@/components/PhoneField";
import { SaveIcon } from "lucide-react";
type Props = { settings: Settings | null };

const SettingsForm = ({ settings }: Props) => {
  const { form, onSubmit, pending } = useSettings(settings);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormWrapper title="General Settings">
          <InputField
            inputStyles="max-w-[357px]"
            form={form}
            name={"companyName"}
            label="Company Name"
            placeholder="Enter Company Name"
          />
          <InputField
            inputStyles="max-w-[357px]"
            form={form}
            name={"email"}
            label="Email"
            placeholder="Enter Email"
          />
          {!!settings && <InputField
            inputStyles="max-w-[357px]"
            form={form}
            name={"oldPassword"}
            label="Old Password"
            placeholder="Enter Your Old Password"
            type="password"
          />}
          <InputField
            inputStyles="max-w-[357px]"
            form={form}
            name={"password"}
            label={settings ? "New Password" :"Password"}
            placeholder={settings ? 'Enter New Password' : `Enter Password`}
            type="password"
          />
          <PhoneField
            containerStyle={{ maxWidth: 357 }}
            form={form}
            name={"phoneNumber"}
            label="Phone Number"
            placeholder="Enter Phone Number"
          />
          <PhoneField
            containerStyle={{ maxWidth: 357 }}
            form={form}
            name={"whatsAppNumber"}
            label="WhatsApp Number"
            placeholder="Enter WhatsApp Number"
          />
        </FormWrapper>
        <SuperButton
          variant="site"
          type="submit"
          buttonType="loadingButton"
          loading={pending}
          title={"Save"}
          Icon={<SaveIcon className="icon"  />
          }
        />
      </form>
    </Form>
  );
};

export default SettingsForm;
