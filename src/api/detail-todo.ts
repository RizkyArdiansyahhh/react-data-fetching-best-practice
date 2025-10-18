import { axiosInstance } from "@/lib/axios";
import { Todo } from "@/types/api";

type TodoItemRequest = {
  id: string;
};
export const getDetailTodo = async ({ id }: TodoItemRequest) => {
  const response = await axiosInstance.get<Todo>(`/todos/${id}`);
  return response.data;
};
