import {
  UseMutationResult,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { IEditBlogData, IEditBlogResponse } from "./types";

const useMutationEditBlog = (): UseMutationResult<
  IEditBlogResponse,
  AxiosError<{ error: string }>,
  IEditBlogData,
  unknown
> => {
  const queryClient = useQueryClient();

  return useMutation<
    IEditBlogResponse,
    AxiosError<{ error: string }>,
    IEditBlogData,
    unknown
  >({
    mutationFn: async ({ title, content, token, id }: IEditBlogData) => {
      const response = await axios.put(
        `http://localhost:3000/blogs/${id}`,
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
      queryClient.invalidateQueries({ queryKey: ["blogId"] });
    },
  });
};

export default useMutationEditBlog;
