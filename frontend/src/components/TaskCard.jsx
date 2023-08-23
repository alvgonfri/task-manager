import { Link } from "react-router-dom";
import { useTask } from "../context/TaskContext";

/* eslint-disable react/prop-types */
function TaskCard({ task }) {
  const { deleteTask } = useTask();

  return (
    <div className="bg-slate-300 max-w-md p-2 m-2 rounded-md">
      <h2 className="text-xl font-bold">{task.title}</h2>
      <hr></hr>
      <p>{task.description}</p>
      <hr></hr>
      <p>Status: {task.status}</p>
      <hr></hr>
      {task.deadline ? (
        <p>Deadline: {new Date(task.deadline).toLocaleDateString()} </p>
      ) : (
        <p>No deadline</p>
      )}
      <hr></hr>
      <div className="flex gap-x-2 justify-end">
        <Link
          to={`/tasks/${task._id}`}
          className="bg-slate-400 p-2 my-2 rounded-md"
        >
          Edit
        </Link>
        <button
          className="bg-slate-400 p-2 my-2 rounded-md"
          onClick={() => deleteTask(task._id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;
