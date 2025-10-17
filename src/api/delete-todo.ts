import { axiosInstance } from "@/lib/axios";

type TodoItemRequest = {
  id: number;
};
export const deleteTodo = async ({ id }: TodoItemRequest) => {
  return await axiosInstance.delete(`/todos/${id}`);
};
