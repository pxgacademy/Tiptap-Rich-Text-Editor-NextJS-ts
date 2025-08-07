import { LocalUserInputs } from "@/lib/types";

export const setUserLocal = (user: LocalUserInputs) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("rich-text-user", JSON.stringify(user));
  }
};

export const getUserLocal = (): LocalUserInputs | null => {
  if (typeof window !== "undefined") {
    const storedUser = localStorage.getItem("rich-text-user");
    if (storedUser) {
      try {
        return JSON.parse(storedUser);
      } catch (error) {
        console.error("Error parsing rich-text-user from localStorage", error);
        return null;
      }
    }
  }
  return null;
};
