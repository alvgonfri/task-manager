import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useTask } from "../../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

function TaskPage() {
  const [task, setTask] = useState({});
  const { getTask, deleteTask, changeTaskStatus } = useTask();
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    async function loadTask() {
      if (params.id) {
        const task = await getTask(params.id);
        setTask(task);
      }
    }
    loadTask();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <BackButton />
      <div className="flex justify-center mt-2">
        <div
          className={`bg-slate-200 p-2 rounded-md w-5/6 lg:w-1/2 border ${
            task.status !== "completed" &&
            (!task.deadline ||
              (task.deadline &&
                new Date(task.deadline).toISOString().slice(0, 10) >
                  new Date().toISOString().slice(0, 10)))
              ? "border-green-600 border-2"
              : task.status !== "completed" &&
                task.deadline &&
                new Date(task.deadline).toISOString().slice(0, 10) ===
                  new Date().toISOString().slice(0, 10)
              ? "border-yellow-400 border-2"
              : task.status !== "completed" &&
                task.deadline &&
                new Date(task.deadline).toISOString().slice(0, 10) <
                  new Date().toISOString().slice(0, 10)
              ? "border-red-700 border-2"
              : "border-slate-300 border-2"
          } shadow-md`}
        >
          <p className="text-xl font-bold text-center break-words">
            {task.title}
          </p>

          <div className="flex gap-x-2 justify-center my-2">
            {task.status !== "completed" ? (
              <Link
                to={`/tasks/update/${task._id}`}
                className="bg-slate-400 text-slate-700 px-3 py-2 mt-2 rounded-md border border-slate-700 hover:bg-slate-700 hover:text-slate-400 hover:border-slate-400 transition duration-500"
              >
                <FontAwesomeIcon icon={faPen} />
              </Link>
            ) : (
              <></>
            )}
            <button
              className="bg-red-600 text-slate-50 px-3 py-2 mt-2 rounded-md border border-slate-50 hover:bg-slate-50 hover:text-red-600 hover:border-red-600  transition duration-500"
              onClick={() => {
                if (
                  window.confirm("Are you sure you wish to delete this task?")
                ) {
                  deleteTask(task._id);
                  navigate("/tasks");
                }
              }}
            >
              <FontAwesomeIcon icon={faTrash} className="w-4" />
            </button>
          </div>

          {task.description ? (
            <p className="break-words">{task.description}</p>
          ) : (
            <p className="opacity-50">No desc.</p>
          )}

          <hr className="border border-slate-300 my-2"></hr>

          {task.deadline ? (
            <p>
              <span className="font-semibold">Deadline:</span>{" "}
              {new Date(task.deadline).toLocaleDateString()}{" "}
            </p>
          ) : (
            <p className="font-semibold">No deadline</p>
          )}

          <div className="flex justify-center">
            {(task.status === "pending" &&
              task.deadline &&
              new Date(task.deadline).toISOString().slice(0, 10) >=
                new Date().toISOString().slice(0, 10)) ||
            (task.status === "pending" && !task.deadline) ? (
              <button
                onClick={() =>
                  changeTaskStatus(task._id, "in-progress") &&
                  navigate("/tasks")
                }
                className="bg-slate-700 text-slate-400 px-2 py-1 mt-1 rounded-md border border-slate-400 hover:bg-slate-400 hover:text-slate-700 hover:border-slate-700 transition duration-500"
              >
                <p className="font-semibold">Start</p>
              </button>
            ) : (task.status === "in-progress" &&
                task.deadline &&
                new Date(task.deadline).toISOString().slice(0, 10) >=
                  new Date().toISOString().slice(0, 10)) ||
              (task.status === "in-progress" && !task.deadline) ? (
              <button
                onClick={() =>
                  changeTaskStatus(task._id, "completed") && navigate("/tasks")
                }
                className="bg-slate-700 text-slate-400 px-2 py-1 mt-1 rounded-md border border-slate-400 hover:bg-slate-400 hover:text-slate-700 hover:border-slate-700 transition duration-500"
              >
                <p className="font-semibold">Set as completed</p>
              </button>
            ) : (task.status === "pending" || task.status === "in-progress") &&
              task.deadline &&
              new Date(task.deadline).toISOString().slice(0, 10) <
                new Date().toISOString().slice(0, 10) ? (
              <div className="bg-red-700 text-slate-50 px-2 py-1 mt-1 rounded-md border border-slate-50">
                Uncompleted at deadline
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default TaskPage;
