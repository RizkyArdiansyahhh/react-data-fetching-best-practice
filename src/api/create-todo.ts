import { axiosInstance } from "@/lib/axios";
import { Todo } from "@/types/api";

type TodoItemRequest = {
  title: string;
  isCompleted: boolean;
};

export const createTodo = async (todo: TodoItemRequest) => {
  return await axiosInstance.post<Todo>("/todos", todo);
};
