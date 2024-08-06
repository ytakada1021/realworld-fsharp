import { User } from "@/shared/types";

export const showYourFeed = (authUser: User | undefined) => {
  return authUser != null;
};
