import { User } from "@/shared/types";

export const showEditProfileSettingsButton = (profileUsername: string, authUser: User | undefined) => {
  if (authUser == null) {
    return false;
  }

  return profileUsername === authUser.username;
};
