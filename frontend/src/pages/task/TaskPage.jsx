import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTask } from "../../context/TaskContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faPen } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import BackButton from "../../components/BackButton";

function TaskPage() {
  const [task, setTask] = useState({});
  const { getTask, deleteTask } = useTask();
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
        <div className="bg-slate-200 p-2 rounded-md w-5/6 lg:w-1/2 border border-slate-300 shadow-md">
          <p className="text-xl font-bold text-center break-words">
            {task.title}
          </p>
          <div className="flex gap-x-2 justify-center my-2">
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
        </div>
      </div>
    </>
  );
}

export default TaskPage;
