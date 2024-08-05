import { Button } from "@/components/button";
import Link from "next/link";
import { ReactNode } from "react";
import { fetchProfile } from "./fetch";
import { DefaultIcon } from "@/features/profile/defaultIcon";
import { FollowButton } from "@/app/profile/[username]/followButton";

type Props = {
  children: ReactNode;
  params: {
    username: string;
  };
};

const ProfilePageLayout = async ({ children, params }: Props) => {
  const profile = await fetchProfile(params.username);

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {profile.image ? (
                <img src="http://i.imgur.com/Qr71crq.jpg" className="user-img" alt="" />
              ) : (
                <DefaultIcon className="user-img" />
              )}
              <h4>{profile.username}</h4>
              {profile.bio && <p>{profile.bio}</p>}
              <FollowButton profile={profile} />
              <Button component="a" href="/settings" className="action-btn" color="secondary">
                <i className="ion-plus-round"></i> Edit Profile Settings
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container">
        <div className="row">
          <div className="col-xs-12 col-md-10 offset-md-1">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePageLayout;
