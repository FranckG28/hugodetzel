"use client";

import { Button, ButtonProps } from "components/ui/button";
import { FC } from "react";
import { useFormStatus } from "react-dom";
import { AiOutlineLoading } from "react-icons/ai";

export const SubmitButton: FC<ButtonProps> = (props) => {
  const { pending } = useFormStatus();

  return (
    <Button
      {...props}
      aria-disabled={pending}
      disabled={pending || props.disabled}
      type="submit"
    >
      {props.children}
      {pending && <AiOutlineLoading className="ml-2 animate-spin" />}
    </Button>
  );
};