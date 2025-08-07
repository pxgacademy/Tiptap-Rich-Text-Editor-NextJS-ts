import { LocalUserInputs } from "@/lib/types";

const USER_KEY = "rich-text-user";

export const setUserLocal = (user: LocalUserInputs) => {
  localStorage.setItem(USER_KEY, JSON.stringify(user));
};

export const getUserLocal = (): LocalUserInputs | null => {
  if (typeof window === "undefined") return null;
  const user = localStorage.getItem(USER_KEY);
  return user ? JSON.parse(user) : null;
};

export const removeUserLocal = () => {
  localStorage.removeItem(USER_KEY);
};
