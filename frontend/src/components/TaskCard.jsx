import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen, faEye } from "@fortawesome/free-solid-svg-icons";

/* eslint-disable react/prop-types */
function TaskCard({ task }) {
  const { deleteTask, changeTaskStatus } = useTask();

  return (
    <div
      className={`bg-slate-200 p-2 rounded-md w-80 sm:w-auto h-auto ${
        task.status === "completed" ? "sm:h-44" : "sm:h-56"
      } border border-slate-300 shadow-md flex flex-col justify-between`}
    >
      <div>
        <div className="flex justify-between">
          <p className="text-xl font-bold mt-3 mr-2 truncate">{task.title}</p>

          <div className="flex gap-x-2 justify-end">
            <Link
              to={`/tasks/${task._id}`}
              className="bg-slate-400 text-slate-700 px-3 py-2 mt-2 rounded-md border border-slate-700 hover:bg-slate-700 hover:text-slate-400 hover:border-slate-400 transition duration-500"
            >
              <FontAwesomeIcon icon={faEye} className="mt-1" />
            </Link>
            <Link
              to={`/tasks/update/${task._id}`}
              className="bg-slate-400 text-slate-700 px-3 py-2 mt-2 rounded-md border border-slate-700 hover:bg-slate-700 hover:text-slate-400 hover:border-slate-400 transition duration-500"
            >
              <FontAwesomeIcon icon={faPen} />
            </Link>
            <button
              className="bg-red-600 text-slate-50 px-3 py-2 mt-2 rounded-md border border-slate-50 hover:bg-slate-50 hover:text-red-600 hover:border-red-600  transition duration-500"
              onClick={() => deleteTask(task._id)}
            >
              <FontAwesomeIcon icon={faTrash} className="w-4" />
            </button>
          </div>
        </div>

        {task.description ? (
          <p className="line-clamp-3">{task.description}</p>
        ) : (
          <p className="line-clamp-3 opacity-50">No desc.</p>
        )}

        <hr className="border border-slate-300 my-1"></hr>

        {task.deadline ? (
          <p>
            <span className="font-semibold">Deadline:</span>{" "}
            {new Date(task.deadline).toLocaleDateString()}{" "}
          </p>
        ) : (
          <p className="font-semibold">No deadline</p>
        )}
      </div>
      <div className="flex justify-center">
        {task.status === "pending" ? (
          <button
            onClick={() => changeTaskStatus(task._id, "in-progress")}
            className="bg-slate-700 text-slate-400 px-2 py-1 mt-1 rounded-md border border-slate-400 hover:bg-slate-400 hover:text-slate-700 hover:border-slate-700 transition duration-500"
          >
            <p className="font-semibold">Start</p>
          </button>
        ) : (
          <></>
        )}
        {task.status === "in-progress" ? (
          <button
            onClick={() => changeTaskStatus(task._id, "completed")}
            className="bg-slate-700 text-slate-400 px-2 py-1 mt-1 rounded-md border border-slate-400 hover:bg-slate-400 hover:text-slate-700 hover:border-slate-700 transition duration-500"
          >
            <p className="font-semibold">Set as completed</p>
          </button>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
