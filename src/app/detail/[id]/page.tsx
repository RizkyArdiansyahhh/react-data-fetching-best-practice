"use client";

import { getDetailTodo } from "@/api/detail-todo";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";

const DetailTodoPage = () => {
  const { id } = useParams() || "";

  const { data: todo } = useQuery({
    queryKey: ["todo", id],
    queryFn: () => getDetailTodo({ id: id as string }),
    enabled: !!id,
  });
  return (
    <>
      <div className="h-screen w-screen container mx-auto flex items-center justify-center">
        <div className="w-2/3 h-1/3 bg-amber-100 rounded-md p-5">
          <h1 className="text-xl font-semibold ">{todo?.title}</h1>
          <div className="w-ful h-0.5 bg-black/20 my-4"></div>
          <p className="text-lg text-black/50">
            {todo?.createdAt
              ? new Date(todo.createdAt).toLocaleDateString("id-ID", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })
              : "-"}
          </p>
        </div>
      </div>
    </>
  );
};

export default DetailTodoPage;
