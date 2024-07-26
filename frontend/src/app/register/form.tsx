"use client";

import { FC } from "react";
import { useFormState } from "react-dom";
import { signUpAction } from "./actions";
import { ErrorMessage } from "@/components/ErrorMessage";
import { initialFormState } from "./types";

export const SignUpForm: FC = () => {
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
        <button type="submit" className="btn btn-lg btn-primary pull-xs-right">
          Sign up
        </button>
      </form>
    </>
  );
};
