import { Dispatch, SetStateAction } from "react";
import { ILoginResponse } from "../../services/Login/types";

export interface IUser {
  username: string;
  id: number;
}

export interface IAuthContextProvider {
  children: React.ReactNode;
}

export interface IAuthContext {
  user: IUser | null;
  setUser: Dispatch<SetStateAction<IUser | null>>;
  logout: () => void;
  login: (data: ILoginResponse) => void;
  token: string | null;
}
