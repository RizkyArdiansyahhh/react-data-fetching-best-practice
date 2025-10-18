import { axiosInstance } from "@/lib/axios";
import { MutationConfig, queryClient } from "@/lib/query-client";
import { useMutation } from "@tanstack/react-query";
import { getTodosQueryKey } from "./get-todos";

type TodoItemRequest = {
  id: string;
};
export const deleteTodo = async ({ id }: TodoItemRequest) => {
  return await axiosInstance.delete(`/todos/${id}`);
};

type useDeleteTodoPrams = {
  mutationConfig?: MutationConfig<typeof deleteTodo>;
};

export const useDeleteTodo = (params: useDeleteTodoPrams = {}) => {
  return useMutation({
    mutationFn: deleteTodo,
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
