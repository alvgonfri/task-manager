import { useState, useEffect } from "react";
import { useTask } from "../../context/TaskContext";
import TaskCard from "../../components/TaskCard";
import UnderlinedButton from "../../components/UnderlinedButton";

function TasksPage() {
  const { tasks, getTasksByStatus } = useTask();
  const [activeTab, setActiveTab] = useState("pending");
  const taskStatuses = ["pending", "in-progress", "completed"];

  useEffect(() => {
    getTasksByStatus(activeTab);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tasks]);

  if (tasks.length === 0) {
    return (
      <div>
        <h1 className="font-semibold text-xl flex justify-center mb-5">
          TASKS
        </h1>
        <p>No tasks</p>
      </div>
    );
  }

  return (
    <>
      <h1 className="font-semibold text-xl flex justify-center mb-2">TASKS</h1>
      <div className="flex justify-between sm:mx-10 md:mx-20 lg:mx-56">
        {taskStatuses.map((status) => (
          <UnderlinedButton
            key={status}
            text={status}
            onClick={() => setActiveTab(status)}
            isActive={activeTab === status}
          />
        ))}
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 justify-center pb-5">
        {tasks.map((task) => (
          <TaskCard key={task._id} task={task} />
        ))}
      </div>
    </>
  );
}

export default TasksPage;
