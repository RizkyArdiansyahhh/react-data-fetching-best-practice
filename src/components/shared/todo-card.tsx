import { ArrowUpRight, CircleCheckBig, Trash, UndoDot } from "lucide-react";
import { Button } from "../ui/button";
import { Todo } from "@/types/api";
import { useRouter } from "next/navigation";

interface TodoCardProps extends Todo {
  deleteTodoFn: (id: string) => void;
  completedTodoFn?: (id: string) => void;
  undoTodoFn?: (id: string) => void;
}

export default function TodoCard(props: TodoCardProps) {
  const { push } = useRouter();
  const { id, title, isCompleted, deleteTodoFn, completedTodoFn, undoTodoFn } =
    props;
  return (
    <div className="bg-white rounded-md w-full p-3">
      <p className="text-xl font-semibold">{title}</p>
      <div className="w-full h-0.5 bg-foreground/10 my-3"></div>
      <div className="flex flex-row gap-3 justify-end">
        <Button
          onClick={() =>
            !isCompleted ? completedTodoFn?.(id) : undoTodoFn?.(id)
          }
          variant={"secondary"}
          className="hover:scale-110 transition-all ease-in-out duration-200"
        >
          {!isCompleted ? (
            <CircleCheckBig size={"25"} color="green" />
          ) : (
            <UndoDot size={"25"} color="green" />
          )}
        </Button>
        <Button
          onClick={() => deleteTodoFn(id)}
          variant={"secondary"}
          className="hover:scale-110 transition-all ease-in-out duration-200"
        >
          <Trash color="red" size={"25"} />
        </Button>
        <Button
          onClick={() => push(`detail/${id}`)}
          variant={"secondary"}
          className="hover:scale-110 transition-all ease-in-out duration-200"
        >
          <ArrowUpRight color="black" size={"25"} />
        </Button>
      </div>
    </div>
  );
}
