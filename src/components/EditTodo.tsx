import { useForm } from "react-hook-form";
import { url } from "./Todo";

type Props = {
  onClose: () => void;
  refetch: () => void;
  id: string;
};

type Fields = {
  title: string;
};

export default function EditTodo({ id, onClose, refetch }: Props) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Fields>();

  const handleEdit = async (data: Fields) => {
    const editUrl = `${url}/${id}`;

    await fetch(editUrl, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title: data.title }),
    });

    refetch();

    onClose();
  };

  return (
    <div
      onClick={onClose}
      className="fixed top-0 start-0 h-screen w-full bg-black bg-opacity-30 grid place-items-center"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="bg-white p-12 rounded-xl space-y-4"
      >
        <h1 className="text-3xl font-bold">Edit Task</h1>
        <form
          onSubmit={handleSubmit(handleEdit)}
          className="flex flex-col gap-2"
        >
          <input
            type="text"
            className="py-2 px-4 border border-indigo-500 outline-none focus:border-indigo-800 rounded-lg"
            {...register("title", {
              required: "Введите это поле",
              minLength: { value: 3, message: "Минимум 3 символа" },
            })}
          />
          {errors.title && (
            <div className="text-red-500">{errors.title.message}</div>
          )}
          <button className="py-2 bg-indigo-200 rounded-xl hover:bg-indigo-300">
            Edit
          </button>
        </form>
      </div>
    </div>
  );
}
