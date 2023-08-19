import { useForm } from "react-hook-form";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = handleSubmit(async (data) => {
    console.log(data);
  });

  return (
    <div className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow">
      <h1>Create a new task</h1>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          {...register("title", { required: true, max: 50 })}
          placeholder="Title"
          autoFocus
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-2"
        />
        {errors.title && (
          <span className="text-red-500 text-sm">
            Title is required and must be less than 50 characters
          </span>
        )}
        <textarea
          rows={5}
          {...register("description", { max: 1000 })}
          placeholder="Description"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-2"
        ></textarea>
        {errors.description && (
          <span className="text-red-500 text-sm">
            Description must be less than 1000 characters
          </span>
        )}
        <input
          type="date"
          {...register("deadline")}
          placeholder="Deadline"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg block w-full p-2.5 my-2"
        />
        <br />
        <button
          type="submit"
          className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Create task
        </button>
      </form>
    </div>
  );
}

export default TaskFormPage;
