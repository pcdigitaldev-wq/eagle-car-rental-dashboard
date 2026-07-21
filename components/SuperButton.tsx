"use client";

import { ModalInputs, useModal } from "@/app/hooks/zustand";
import { Button } from "@/components/ui/button";
import { cn, errorToast, log } from "@/lib/utils";
import { Loader2, LogOut } from "lucide-react";
import { signOut } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ButtonHTMLAttributes, HTMLAttributeAnchorTarget, ReactNode, useTransition } from "react";
import { toast } from "sonner";

const SuperButton = (props: SuperButtonProps) => {
  return RenderButton(props);
};

export default SuperButton;

const RenderButton = (props: SuperButtonProps) => {
  const { buttonType } = props;

  switch (buttonType) {
    case "linkButton": {
      return <RenderLinkButton {...props}/>;
    }
    case "loadingButton": {
      return <RenderLoadingButton  {...props} />;
    }
    case "modalButton": {
      return <RenderModalButton  {...props}/>;
    }
    case "pushButton": {
      return <RenderPushButton  {...props} />;
    }
    case "signOut": {
      return <RenderSignoutButton  {...props} />;
    }
  }
};

const RenderLinkButton = (
  props: LinkType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType,variant,scroll,replace,target,download, ...rest } = props;

  return (
    <Button {...rest}  className={cn("", className)} variant={variant ?? "site"} asChild>
     <Link scroll={scroll} download={download} className="flex items-center" href={href} replace={replace} target={target}>
        {Icon && Icon}
        {title}
      </Link>
    </Button>
  );
};

const RenderLoadingButton = (
  props: LoadingType & NormalButton & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const {
    title,
    clickHandler,
    variant,
    className,
    Icon,
    loading,
    loadingTitle,
    buttonType,
    ...rest
  } = props;
  return (
    <Button
      {...rest}
      type={props.type ?? "button"}
      variant={variant ?? "site"}
      onClick={async () => (clickHandler ? await clickHandler() : undefined)}
      className={cn("disabled:opacity-55", className)}
      disabled={loading}
    >
      {Icon && Icon}
      {!!loading && !!loadingTitle ? loadingTitle : title}
      {!!loading && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

const RenderModalButton = (
  props: NormalButton & ModalType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, className, Icon, modalInputs, buttonType,variant, ...rest } = props;
  const { setOpen } = useModal();
  const handleClick = () => {
    setOpen(modalInputs);
   log({

    messages:[modalInputs],
   });
  };

  return (
    <Button
      {...rest}
      variant={variant ?? "site"}
      className={cn("", className)}
      onClick={handleClick}
    >
      {Icon && Icon}
      {title}
    </Button>
  );
};

const RenderPushButton = (
  props: NormalButton & PushType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, Icon, className, href, buttonType,variant, ...rest } = props;
  const [pending, startTransition] = useTransition();
  const router = useRouter();
  const handler = () => {
    startTransition(() => {
      router.push(href);
    });
  };

  return (
    <Button
    onClick={handler}
      {...rest}
      disabled={pending}
      className={cn("disabled:opacity-55", className)}
      variant={variant ?? "site"}
    >
      {Icon && Icon}
      {title}
      {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};

const RenderSignoutButton = (
  props: NormalButton & SignOutType & ButtonHTMLAttributes<HTMLButtonElement>
) => {
  const { title, className, loadingTitle, buttonType,variant, ...rest } = props;
  const [pending, startTransition] = useTransition();
  const signOutHandler = async () => {
    startTransition(async () => {
      try {
        await signOut();
      } catch (error) {
        console.error("error logging out", error);
        errorToast();
      }
    });
  };
  return (
    <Button
      {...rest}
      onClick={signOutHandler}
      className={cn("", className)}
      disabled={pending}
    >
      <LogOut className="w-12 h-12 text-white disabled:opacity-55" />
      {pending && loadingTitle ? pending : title}
      {pending && <Loader2 className="ml-3 animate-spin" />}
    </Button>
  );
};






//types 

type SuperButtonProps = NormalButton &
  (ModalType | LoadingType | LinkType | PushType | SignOutType) &
  ButtonHTMLAttributes<HTMLButtonElement>;

type LoadingType = {
  buttonType: "loadingButton";
  loadingTitle?: string;
  loading: boolean;
};

type NormalButton = {
  variant?: "default" | "link" | "site" | "destructive" | "outline" | "secondary" | "ghost" | "siteSecondary",
  className?: string;
  title?: string;
  clickHandler?: () => Promise<void>;
  Icon?: ReactNode;
};

type ModalType = { buttonType: "modalButton"; modalInputs: ModalInputs };

type LinkType = {
  buttonType: "linkButton";
  href: string;
  scroll?:boolean,
  replace?:boolean
  target?: HTMLAttributeAnchorTarget
  download?:boolean
};

type PushType = {
  buttonType: "pushButton";
  href: string;
};

type SignOutType = {
  buttonType: "signOut";
  loadingTitle?: string;
};
