import { User } from "@/types";
import { cookies } from "next/headers";

const SESSION_KEY = "session";

type SessionData = {
  authUser: User;
};

export const getSessionData = (): SessionData | undefined => {
  const encryptedData = cookies().get(SESSION_KEY)?.value;

  if (encryptedData == null) {
    return undefined;
  }

  return JSON.parse(encryptedData) as SessionData; // TODO: encryption
};

export const saveSessionData = (sessionData: SessionData) => {
  const encryptedData = JSON.stringify(sessionData); // TODO: encryption

  cookies().set(SESSION_KEY, encryptedData, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // One day
    path: "/",
  });
};

export const deleteSession = () => {
  cookies().delete(SESSION_KEY);
};
