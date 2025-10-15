export default function HeadlineBoardTodo(props: {
  title: string;
  number: string;
}) {
  const { title, number } = props;
  return (
    <div className="flex items-center gap-4">
      <div className="h-14 w-14 rounded-full bg-white relative">
        <p className="text-2xl font-bold absolute top-1/2 right-1/2 translate-x-1/2 -translate-y-1/2">
          {number}
        </p>
      </div>
      <h2 className="text-3xl font-bold">{title}</h2>
    </div>
  );
}
