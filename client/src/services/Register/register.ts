import { UseMutationResult, useMutation } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ILoginData, ILoginResponse } from "../Login/types";

const useLogin = (): UseMutationResult<
  ILoginResponse,
  AxiosError<{ error: string }>,
  ILoginData,
  unknown
> => {
  return useMutation<
    ILoginResponse,
    AxiosError<{ error: string }>,
    ILoginData,
    unknown
  >({
    mutationFn: async ({ username, password }: ILoginData) => {
      const response = await axios.post("http://localhost:3000/register", {
        username,
        password,
      });
      return response.data;
    },
  });
};

export default useLogin;
