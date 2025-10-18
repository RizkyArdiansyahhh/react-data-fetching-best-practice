import { axiosInstance } from "@/lib/axios";
import { QueryConfig } from "@/lib/query-client";
import { Todo } from "@/types/api";
import { queryOptions, useQuery } from "@tanstack/react-query";

export const getTodos = async () => {
  const response = await axiosInstance.get<Todo[]>("/todos");
  return response.data;
};

export const getTodosQueryKey = () => ["todos"];

const getTodosQueryOptions = () => {
  return queryOptions({
    queryKey: getTodosQueryKey(),
    queryFn: getTodos,
  });
};

type useGetTodosParams = {
  queryConfig?: QueryConfig<typeof getTodosQueryOptions>;
};

export const useGetTodos = (params: useGetTodosParams = {}) => {
  return useQuery({
    ...getTodosQueryOptions(),
    ...params.queryConfig,
  });
};
