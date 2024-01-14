export interface ILoginData {
  username: string;
  password: string;
}

export interface IUser {
  id: number;
  username: string;
}

export interface ILoginResponse {
  message: string;
  token: string;
  returnUser: IUser;
}
