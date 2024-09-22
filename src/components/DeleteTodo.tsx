import { url } from "./Todo";

type Props = {
  id: string;
};

export default function DeleteTodo({ id }: Props) {
  const handleDelete = async () => {
    const deleteUrl = `${url}/${id}`;

    await fetch(deleteUrl, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    });
  };

  return (
    <button
      onClick={handleDelete}
      className="px-3 text-white py-2 bg-red-500 rounded-lg"
    >
      DELETE
    </button>
  );
}
