import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ILoginData, ILoginResponse } from "./types";

const useLogin = (): UseMutationResult<
  ILoginResponse,
  AxiosError<{ error: string }>,
  ILoginData,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    ILoginResponse,
    AxiosError<{ error: string }>,
    ILoginData,
    unknown
  >({
    mutationFn: async ({ username, password }: ILoginData) => {
      const response = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export default useLogin;
