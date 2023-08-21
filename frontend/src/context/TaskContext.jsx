import { createContext, useContext, useState } from "react";
import { createTaskRequest, getTasksRequest } from "../api/task.js";
import PropTypes from "prop-types";

const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);
  if (!context) {
    throw new Error("useTask must be used within a TaskProvider");
  }
  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const modifyDeadline = (task) => {
    const { deadline } = task;
    if (deadline) {
      const newDeadline = deadline + "T00:00:00.00Z";
      task.deadline = newDeadline;
    } else {
      delete task.deadline;
    }
  };

  const createTask = async (task) => {
    try {
      modifyDeadline(task);
      const res = await createTaskRequest(task);
      console.log(res.data);
      //setTasks([...tasks, res.data]);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider value={{ tasks, getTasks, createTask }}>
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
