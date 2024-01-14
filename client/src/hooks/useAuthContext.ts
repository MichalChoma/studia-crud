import { useContext } from "react";
import { AuthContext } from "../context/AuthContext/AuthContext";

export const useAuthContext = () => {
  const userContext = useContext(AuthContext);

  if (!userContext) {
    throw new Error("You forgot UserContextProvider!");
  }
  return userContext;
};
