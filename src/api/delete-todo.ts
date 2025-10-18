import { axiosInstance } from "@/lib/axios";

type TodoItemRequest = {
  id: string;
};
export const deleteTodo = async ({ id }: TodoItemRequest) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
