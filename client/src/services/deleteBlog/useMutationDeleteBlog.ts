import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IDeleteBlogData, IDeleteBlogResponse } from "./types";

const useMutationDeleteBlog = (): UseMutationResult<
  IDeleteBlogResponse,
  AxiosError<{ error: string }>,
  IDeleteBlogData,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    IDeleteBlogResponse,
    AxiosError<{ error: string }>,
    IDeleteBlogData,
    unknown
  >({
    mutationFn: async ({ id, token }: IDeleteBlogData) => {
      const response = await axios.delete(`http://localhost:3000/blogs/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["blogs"] });
    },
  });
};

export default useMutationDeleteBlog;
