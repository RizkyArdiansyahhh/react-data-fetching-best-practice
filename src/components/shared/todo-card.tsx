import { CircleCheckBig, Trash, UndoDot } from "lucide-react";
import Link from "next/link";

type TodoCardProps = {
  title: string;
  isCompleted: boolean;
};

export default function TodoCard(props: TodoCardProps) {
  const { title, isCompleted } = props;
  return (
    <div className="bg-white rounded-md w-full p-3">
      <p className="text-xl font-semibold">{title}</p>
      <div className="w-full h-0.5 bg-foreground/10 my-3"></div>
      <div className="flex flex-row gap-3 justify-end">
        <Link
          href={""}
          className="hover:scale-110 transition-all ease-in-out duration-200"
        >
          <CircleCheckBig size={"25"} color="green" />
        </Link>
        <Link
          href={""}
          className="hover:scale-110 transition-all ease-in-out duration-200"
        >
          {isCompleted ? (
            <UndoDot size={"25"} color="green" />
          ) : (
            <Trash color="red" size={"25"} />
          )}
        </Link>
      </div>
    </div>
  );
}
