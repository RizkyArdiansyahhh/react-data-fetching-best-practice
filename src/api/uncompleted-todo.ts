import { axiosInstance } from "@/lib/axios";

type TodoItemRequest = {
  id: string;
};

export const uncompletedTodo = async ({ id }: TodoItemRequest) => {
  return await axiosInstance.patch(`/todos/${id}`, {
    isCompleted: false,
  });
};
