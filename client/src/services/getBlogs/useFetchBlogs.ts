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

export const useFetchBlogs = (): UseQueryResult<
  IBlog[],
  AxiosError<{ error: string }>
> => {
  return useQuery({
    queryKey: ["blogs"],
    queryFn: async () => {
      const response: AxiosResponse<IBlog[]> = await axios.get(
        "http://localhost:3000/blogs"
      );
      return response.data;
    },
  });
};
