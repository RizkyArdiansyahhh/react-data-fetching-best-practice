"use client";
import { completedTodo } from "@/api/completed-todo";
import { createTodo } from "@/api/create-todo";
import { deleteTodo } from "@/api/delete-todo";
import { getTodos } from "@/api/get-todos";
import { uncompletedTodo } from "@/api/uncompleted-todo";
import HeadlineBoardTodo from "@/components/shared/headline-board-todo";
import TodoCard from "@/components/shared/todo-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { queryClient } from "@/lib/query-client";
import { Todo } from "@/types/api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useState } from "react";

export default function Home() {
  const [inputValue, setinputValue] = useState("");
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

  const { mutate: createTodoMutation } = useMutation({
    mutationFn: createTodo,

    onSuccess: () => {
      setinputValue("");
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: completedtodoMutation } = useMutation({
    mutationFn: completedTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const { mutate: uncompletedtodoMutation } = useMutation({
    mutationFn: uncompletedTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const handleDeleteTodo = (id: string) => {
    deleteTodoMutation({ id });
  };

  const handleCreateTodo = (e: React.FormEvent) => {
    e.preventDefault();
    createTodoMutation({
      title: inputValue,
      createdAt: new Date().toISOString(),
      isCompleted: false,
    });
  };

  const handleCompletedTodo = (id: string) => {
    completedtodoMutation({ id });
  };

  const handleUncompletedTodo = (id: string) => {
    uncompletedtodoMutation({ id });
  };

  console.log(todos);
  return (
    <div className="container mx-auto w-5/6 h-screen flex flex-col gap-2 overflow-hidden">
      <div className="pt-10">
        <form onSubmit={handleCreateTodo}>
          <div className="flex flex-row gap-3">
            <Input
              value={inputValue}
              onChange={(e) => setinputValue(e.target.value)}
              placeholder="Enter Something..."
            />
            <Button variant="default">Submit</Button>
          </div>
        </form>
      </div>

      {/* Scrollable Section */}
      <div className="flex flex-row gap-5 flex-1 w-full overflow-hidden">
        {/* On Progress */}
        <div className="w-1/2 bg-purple-200 rounded-sm p-3 flex flex-col">
          <HeadlineBoardTodo title="On Progress" number="1" />
          <div className="space-y-3 mt-3 flex-1 overflow-auto pr-2">
            {todos?.map((todo: Todo) => {
              return (
                !todo.isCompleted && (
                  <TodoCard
                    key={todo.id}
                    {...todo}
                    deleteTodoFn={handleDeleteTodo}
                    completedTodoFn={handleCompletedTodo}
                  />
                )
              );
            })}
          </div>
        </div>

        {/* Done */}
        <div className="w-1/2 bg-sky-200 rounded-sm p-3 flex flex-col">
          <HeadlineBoardTodo title="Done" number="2" />
          <div className="space-y-3 mt-3 flex-1 overflow-auto pr-2">
            {todos?.map((todo: Todo) => {
              return (
                todo.isCompleted && (
                  <TodoCard
                    key={todo.id}
                    {...todo}
                    deleteTodoFn={handleDeleteTodo}
                    undoTodoFn={handleUncompletedTodo}
                  />
                )
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
