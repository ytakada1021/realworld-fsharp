"use client";

import { ErrorMessage } from "@/components/ErrorMessage";
import { FC } from "react";
import { useFormState } from "react-dom";
import { logoutAction, updateSettingsAction } from "./actions";
import { initialFormState, User } from "./types";

type SettingsFormProps = {
  user: User;
};

export const SettingsForm: FC<SettingsFormProps> = ({ user }) => {
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
          <button className="btn btn-lg btn-primary pull-xs-right">Update Settings</button>
        </fieldset>
      </form>
      <hr />
      <form action={logoutAction}>
        <button className="btn btn-outline-danger" type="submit">
          Or click here to logout.
        </button>
      </form>
    </>
  );
};
