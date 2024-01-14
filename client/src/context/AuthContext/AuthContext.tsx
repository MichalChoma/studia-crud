import { createContext, useState } from "react";
import { IUser, IAuthContext, IAuthContextProvider } from "./types";
import { ILoginResponse } from "../../services/Login/types";
import axios from "axios";

export const AuthContext = createContext<IAuthContext | null>(null);

export const AuthContextProvider: React.FC<IAuthContextProvider> = ({
  children,
}) => {
  const [user, setUser] = useState<IUser | null>(null);
  const [token, setToken] = useState<string | null>(null);

  const logout = async () => {
    try {
      await axios.post("http://localhost:3000/logout");
      setUser(null);
    } catch (err) {
      console.error("Error during logout", err);
    }
  };

  const login = ({ returnUser, token }: ILoginResponse) => {
    setUser(returnUser);
    setToken(token);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, logout, login, token }}>
      {children}
    </AuthContext.Provider>
  );
};
