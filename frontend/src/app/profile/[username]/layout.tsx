import { FollowButton } from "@/app/profile/[username]/followButton";
import { Button } from "@/modules/common/components/button";
import { DefaultIcon } from "@/modules/common/components/icons/defaultIcon";
import { ReactNode } from "react";
import { fetchProfile } from "./fetch";
import { showEditProfileSettingsButton } from "./authorization";
import { getSessionData } from "@/shared/auth/session";

type Props = {
  children: ReactNode;
  params: {
    username: string;
  };
};

const ProfilePageLayout = async ({ children, params }: Props) => {
  const profile = await fetchProfile(params.username);
  const session = getSessionData();

  return (
    <div className="profile-page">
      <div className="user-info">
        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              {profile.image ? (
                <img src={profile.image} className="user-img" alt="" />
              ) : (
                <DefaultIcon className="user-img" />
              )}
              <h4>{profile.username}</h4>
              {profile.bio && <p>{profile.bio}</p>}
              <FollowButton profile={profile} />
              {showEditProfileSettingsButton(profile.username, session?.authUser) && (
                <Button component="a" href="/settings" className="action-btn" color="secondary">
                  <i className="ion-plus-round"></i> Edit Profile Settings
                </Button>
              )}
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
