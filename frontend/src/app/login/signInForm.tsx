"use client";

import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { signInAction } from "./actions";
import { useFormState } from "react-dom";
import { initialFormState } from "./types";
import { Button } from "@/modules/common/components/button";

export const SignInForm = () => {
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
        <Button component="button" size="lg" type="submit" className="pull-xs-right">
          Sign in
        </Button>
      </form>
    </>
  );
};
