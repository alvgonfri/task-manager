import { useEffect } from "react";
import { useTask } from "../../context/TaskContext";

function TasksPage() {
  const { tasks, getTasks } = useTask();
  useEffect(() => {
    getTasks();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        <h1>Tasks</h1>
        <p>No tasks</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Tasks</h1>
      {tasks.map((task) => (
        <div
          key={task._id}
          className="block max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow"
        >
          <h2>{task.title}</h2>
          <p>{task.description}</p>
          <p>{task.deadline}</p>
        </div>
      ))}
    </div>
  );
}

export default TasksPage;
