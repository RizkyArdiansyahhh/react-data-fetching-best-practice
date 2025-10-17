import { axiosInstance } from "@/lib/axios";
import { Todo } from "@/types/api";

export const getTodos = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data;
};
