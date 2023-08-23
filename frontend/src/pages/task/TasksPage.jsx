import { useEffect } from "react";
import { useTask } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";

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
    <>
      <h1>Tasks</h1>
      <div className="grid sm:grid-cols-2 md:grid-cols-3">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
}

export default TasksPage;
