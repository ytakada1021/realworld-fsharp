"use client";

import { Button } from "@/modules/common/components/button";
import { Profile } from "@/shared/types";
import { useState } from "react";
import { followAction } from "./actions";

export const FollowButton = ({ profile }: { profile: Profile }) => {
  const [profileState, setProfileState] = useState(profile);

  const onClickFollow = async () => {
    const newProfile = await followAction(profile.username);
    setProfileState(newProfile);
  };

  return (
    <Button
      component="button"
      className="action-btn"
      color="secondary"
      variant={profile.following ? "filled" : "outline"}
      onClick={onClickFollow}
    >
      <i className="ion-plus-round"></i> {profile.following ? "Following" : "Follow"} {profileState.username}
    </Button>
  );
};
