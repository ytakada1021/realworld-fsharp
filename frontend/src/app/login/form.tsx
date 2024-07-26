"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { FC } from "react";
import { signInAction } from "./actions";
import { useFormState } from "react-dom";
import { initialFormState } from "./types";

export const SignInForm: FC = () => {
  const [formState, formAction] = useFormState(signInAction, initialFormState);

  return (
    <>
      <ErrorMessage errors={formState.errors} />

      <form action={formAction}>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="text" placeholder="Email" name="email" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="password" placeholder="Password" name="password" />
        </fieldset>
        <button className="btn btn-lg btn-primary pull-xs-right">Sign in</button>
      </form>
    </>
  );
};
