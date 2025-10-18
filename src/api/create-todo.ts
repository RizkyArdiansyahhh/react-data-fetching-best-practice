import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { Todo } from "@/types/api";
import { useMutation } from "@tanstack/react-query";
import { getTodosQueryKey } from "./get-todos";

type TodoItemRequest = {
  title: string;
  createdAt: string;
  isCompleted: boolean;
};

export const createTodo = async (todo: TodoItemRequest) => {
  return await axiosInstance.post<Todo>("/todos", todo);
};

type useCreateTodoParams = {
  mutationConfig?: MutationConfig<typeof createTodo>;
};
export const useCreateTodo = (params: useCreateTodoParams = {}) => {
  return useMutation({
    mutationFn: createTodo,
    ...params.mutationConfig,
    onSuccess: (data, Variable, onMutateResult, context) => {
      queryClient.invalidateQueries({ queryKey: getTodosQueryKey() });
      params.mutationConfig?.onSuccess?.(
        data,
        Variable,
        onMutateResult,
        context
      );
    },
  });
};
