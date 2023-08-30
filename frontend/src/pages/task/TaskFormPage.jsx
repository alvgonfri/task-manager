import { useForm } from "react-hook-form";
import { useTask } from "../../context/TaskContext";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { useEffect } from "react";
import BackButton from "../../components/BackButton";

function TaskFormPage() {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const { getTask, createTask, updateTask, errors: formErrors } = useTask();
  const navigate = useNavigate();
  const params = useParams();
  const location = useLocation();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setValue("title", task.title);
        setValue("description", task.description);
        if (task.deadline) {
          setValue("deadline", task.deadline.slice(0, 10));
        }
      } else {
        setValue("title", "");
        setValue("description", "");
        setValue("deadline", "");
      }
    }
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location]);

  const onSubmit = handleSubmit(async (data) => {
    if (params.id) {
      await updateTask(params.id, data);
    } else {
      await createTask(data);
    }
    navigate("/tasks");
  });

  return (
    <>
      <BackButton />
      <div className="flex justify-center mt-5">
        <div className=" bg-slate-200 border border-slate-300 p-6 md:w-1/2 lg:w-1/3 rounded-lg shadow-md">
          <h1 className="text-xl font-bold mb-4">
            {params.id ? "Update task" : "Create a new task"}
          </h1>
          {formErrors.map((error, i) => (
            <div
              className="bg-red-500 text-slate-50 text-sm p-2 rounded-lg my-2"
              key={i}
            >
              {error}
            </div>
          ))}

          <form onSubmit={onSubmit}>
            <label className="text-sm text-slate-500">&nbsp;Title</label>
            {errors.title && (
              <>
                <br></br>
                <p className="text-red-500 text-sm mb-1">
                  &nbsp;Title is required and must be less than 50 characters
                </p>
              </>
            )}
            <input
              type="text"
              {...register("title", { required: true, maxLength: 50 })}
              autoFocus
              className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
            />

            <label className="text-sm text-slate-500">&nbsp;Description</label>
            {errors.description && (
              <>
                <br></br>
                <p className="text-red-500 text-sm mb-1">
                  &nbsp;Description must be less than 1000 characters
                </p>
              </>
            )}
            <textarea
              rows={5}
              {...register("description", { maxLength: 1000 })}
              className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
            ></textarea>

            <label className="text-sm text-slate-500">&nbsp;Deadline</label>
            {errors.deadline && (
              <>
                <br></br>
                <p className="text-red-500 text-sm mb-1">
                  &nbsp;Deadline must be today or later
                </p>
              </>
            )}
            <input
              type="date"
              {...register("deadline", {
                validate: (value) => {
                  if (value === "") {
                    return true;
                  }
                  const today = new Date().toISOString().slice(0, 10);
                  return value >= today;
                },
              })}
              className="bg-slate-50 border border-slate-300 text-sm rounded-lg block w-full p-2.5 mb-3"
            />

            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-slate-700 hover:bg-slate-800 text-slate-50 font-medium rounded-lg text-sm px-5 py-2.5"
              >
                {params.id ? "Update" : "Create"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default TaskFormPage;
