import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

export interface IBlog {
  id: number;
  title: string;
  content: string;
  author: IAuthor;
}

export interface IAuthor {
  id: number;
  username: string;
}
export const useFetchSingleBlog = (
  id: string
): UseQueryResult<IBlog, AxiosError<{ error: string }>> => {
  return useQuery({
    queryKey: ["blogId", id],
    queryFn: async () => {
      try {
        const response: AxiosResponse<IBlog> = await axios.get(
          `http://localhost:3000/blogs/${id}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
