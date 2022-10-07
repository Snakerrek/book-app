import jwtDecode from "jwt-decode";
import { TokenUserData } from "./types";

export const getUserData = (): TokenUserData | null => {
  const token = localStorage.getItem("token")?.replace("Bearer ", "");
  if (token) {
    const user: TokenUserData = jwtDecode(token);
    return user;
  }
  return null;
};
