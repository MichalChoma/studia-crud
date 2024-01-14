import { UseQueryResult, useQuery } from "@tanstack/react-query";
import axios, { AxiosError, AxiosResponse } from "axios";

interface IBlog {
  id: number;
  title: string;
  content: string;
  authorId: number;
}

interface IProfileResponse {
  blogs: IBlog[];
  id: number;
  username: string;
}

export const useFetchAuthorBlogs = (
  id: string
): UseQueryResult<IProfileResponse, AxiosError<{ error: string }>> => {
  return useQuery({
    queryKey: ["authorBlogs", id],
    queryFn: async () => {
      try {
        const response: AxiosResponse<IProfileResponse> = await axios.get(
          `http://localhost:3000/authors/${id}`
        );
        return response.data;
      } catch (error) {
        throw error;
      }
    },
  });
};
