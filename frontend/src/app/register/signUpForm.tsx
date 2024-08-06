"use client";

import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { useFormState } from "react-dom";
import { signUpAction } from "./actions";
import { initialFormState } from "./types";

export const SignUpForm = () => {
  const [state, formAction] = useFormState(signUpAction, initialFormState);

  return (
    <>
      <ErrorMessage errors={state.errors} />
      <form action={formAction}>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="text" placeholder="Username" name="username" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="text" placeholder="Email" name="email" />
        </fieldset>
        <fieldset className="form-group">
          <input className="form-control form-control-lg" type="password" placeholder="Password" name="password" />
        </fieldset>
        <Button component="button" size="lg" variant="filled" type="submit" className="pull-xs-right">
          Sign up
        </Button>
      </form>
    </>
  );
};
