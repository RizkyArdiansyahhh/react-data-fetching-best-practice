import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { Todo } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

type TodoItemRequest = {
  id: string;
};
export const getDetailTodo = async ({ id }: TodoItemRequest) => {
  const response = await axiosInstance.get<Todo>(`/todos/${id}`);
  return response.data;
};

export const getDetailTodoQueryKey = (id: string) => ["todo", id];

const getDetailTodoQueryOptions = (id: string) => {
  return queryOptions({
    queryKey: getDetailTodoQueryKey(id),
    queryFn: () => getDetailTodo({ id }),
  });
};

type useGetDetailTodoPrams = {
  queryConfig?: QueryConfig<typeof getDetailTodoQueryOptions>;
  id: string;
};

export const useGetDetailTodo = (params: useGetDetailTodoPrams) => {
  return useQuery({
    ...getDetailTodoQueryOptions(params.id),
    ...params.queryConfig,
  });
};
