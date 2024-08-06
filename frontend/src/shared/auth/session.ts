import { secureCookie } from "@/config/constants";
import { User } from "@/shared/types";
import { cookies } from "next/headers";

const sessionKey = "session";

type SessionData = {
  authUser: User;
};

export const getSessionData = (): SessionData | undefined => {
  const encryptedData = cookies().get(sessionKey)?.value;

  if (encryptedData == null) {
    return undefined;
  }

  return JSON.parse(encryptedData); // TODO: encryption
};

export const saveSessionData = (sessionData: SessionData) => {
  const encryptedData = JSON.stringify(sessionData); // TODO: encryption

  cookies().set(sessionKey, encryptedData, {
    httpOnly: true,
    secure: secureCookie,
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
};

export const deleteSession = () => {
  cookies().delete(sessionKey);
};
