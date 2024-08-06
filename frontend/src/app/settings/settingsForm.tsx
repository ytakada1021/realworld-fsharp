"use client";

import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { User } from "@/shared/types";
import { useFormState } from "react-dom";
import { logoutAction, updateSettingsAction } from "./actions";
import { initialFormState } from "./types";

type Props = {
  user: User;
};

export const SettingsForm = ({ user }: Props) => {
  const [formState, formAction] = useFormState(updateSettingsAction, initialFormState);

  return (
    <>
      <ErrorMessage errors={formState.errors} />
      <form action={formAction}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              name="image"
              defaultValue={user.image}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              name="username"
              defaultValue={user.username}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              name="bio"
              defaultValue={user.bio}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              name="email"
              defaultValue={user.email}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              name="password"
              autoComplete="new-password"
            />
          </fieldset>
          <Button component="button" size="lg" color="primary" variant="filled" type="submit" className="pull-xs-right">
            Update Settings
          </Button>
        </fieldset>
      </form>
      <hr />
      <form action={logoutAction}>
        <Button component="button" color="danger" type="submit" size="lg">
          Or click here to logout.
        </Button>
      </form>
    </>
  );
};
