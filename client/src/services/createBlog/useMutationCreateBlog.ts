import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { ICreateBlogData, ICreateBlogResponse } from "./types";

const useMutationCreateBlog = (): UseMutationResult<
  ICreateBlogResponse,
  AxiosError<{ error: string }>,
  ICreateBlogData,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    ICreateBlogResponse,
    AxiosError<{ error: string }>,
    ICreateBlogData,
    unknown
  >({
    mutationFn: async ({ title, content, token }: ICreateBlogData) => {
      const response = await axios.post(
        "http://localhost:3000/blogs",
        {
          title,
          content,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export default useMutationCreateBlog;
