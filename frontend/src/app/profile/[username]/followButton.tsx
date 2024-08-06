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
    <>
      <Button component="button" className="action-btn" color="secondary" onClick={onClickFollow}>
        <i className="ion-plus-round"></i> {profile.following ? "Follow" : "Following"} {profileState.username}
      </Button>
    </>
  );
};
