"use client";
import { deleteTodo } from "@/api/delete-todo";
import { getTodos } from "@/api/get-todos";
import HeadlineBoardTodo from "@/components/shared/headline-board-todo";
import TodoCard from "@/components/shared/todo-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/lib/query-client";
import { Todo } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";

export default function Home() {
  const { data: todos, isLoading: fetchTodosIsLoading } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const { mutate: deleteTodoMutation, isPending: deleteTodoLoading } =
    useMutation({
      mutationFn: deleteTodo,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["todos"] });
      },
    });

  const handleDeleteTodo = (id: number) => {
    deleteTodoMutation({ id });
  };

  console.log(todos);
  return (
    <div className="container mx-auto py-10 w-5/6 h-screen flex flex-col gap-2">
      <div>
        <form>
          <div className="flex flex-row gap-3">
            <Input placeholder="Enter Something..."></Input>
            <Button variant={"default"}>Submit</Button>
          </div>
        </form>
      </div>
      <div className="flex flex-row gap-5 flex-1 w-full">
        <div className="w-1/2  bg-purple-200 h-full rounded-sm p-3">
          <HeadlineBoardTodo title="On Progress" number="1"></HeadlineBoardTodo>
          <div className="space-y-3 mt-3 h-full overflow-y-scroll">
            {todos?.map((todo: Todo) => {
              return (
                !todo.isCompleted && (
                  <TodoCard
                    key={todo.id}
                    {...todo}
                    deleteTodoFn={handleDeleteTodo}
                  />
                )
              );
            })}
          </div>
        </div>
        <div className="w-1/2  bg-sky-200 h-full rounded-sm p-3">
          <HeadlineBoardTodo title="Done" number="2"></HeadlineBoardTodo>
        </div>
      </div>
    </div>
  );
}
