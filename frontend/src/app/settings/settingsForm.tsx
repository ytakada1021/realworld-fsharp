"use client";

import { Button } from "@/modules/common/components/button";
import { ErrorMessage } from "@/modules/common/components/errorMessage";
import { useToast } from "@/modules/common/components/toast/useToast";
import { User } from "@/shared/types";
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { logoutAction, updateSettingsAction } from "./actions";
import { Inputs } from "./types";

type Props = {
  user: User;
};

export const SettingsForm = ({ user }: Props) => {
  const { register, handleSubmit } = useForm<Inputs>();
  const [errors, setErrors] = useState<string[]>([]);
  const { addToast } = useToast();

  const onSubmit: SubmitHandler<Inputs> = async (inputs) => {
    const result = await updateSettingsAction(inputs);
    setErrors(result.errors);
    if (result.errors.length < 1) {
      addToast({
        header: <i className="ion-checkmark-circled"></i>,
        body: "Successfully updated settings!",
      });
    }
  };

  return (
    <>
      <ErrorMessage errors={errors} />
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset>
          <fieldset className="form-group">
            <input
              className="form-control"
              type="text"
              placeholder="URL of profile picture"
              defaultValue={user.image}
              {...register("image")}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Your Name"
              defaultValue={user.username}
              {...register("username")}
            />
          </fieldset>
          <fieldset className="form-group">
            <textarea
              className="form-control form-control-lg"
              rows={8}
              placeholder="Short bio about you"
              {...register("bio")}
              defaultValue={user.bio}
            ></textarea>
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="text"
              placeholder="Email"
              {...register("email")}
              defaultValue={user.email}
            />
          </fieldset>
          <fieldset className="form-group">
            <input
              className="form-control form-control-lg"
              type="password"
              placeholder="New Password"
              {...register("password")}
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
