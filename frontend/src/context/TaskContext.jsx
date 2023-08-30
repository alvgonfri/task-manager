import { createContext, useContext, useState, useEffect } from "react";
import {
  getTasksRequest,
  getTaskRequest,
  createTaskRequest,
  updateTaskRequest,
  deleteTaskRequest,
} from "../api/task.js";
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
  const [errors, setErrors] = useState([]);

  // Clear form errors after 5 seconds

  useEffect(() => {
    if (errors.length > 0) {
      const timer = setTimeout(() => {
        setErrors([]);
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [errors]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTasksByStatus = async (status) => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data.filter((task) => task.status === status));
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
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
      setTasks([...tasks, res.data]);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const updateTask = async (id, task) => {
    try {
      modifyDeadline(task);
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
      setErrors(error.response.data);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === 204) setTasks(tasks.filter((task) => task._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  const changeTaskStatus = async (id, status) => {
    try {
      const res = await getTaskRequest(id);
      const task = res.data;
      task.status = status;
      await updateTaskRequest(id, task);
      setTasks(
        tasks.map((task) =>
          task._id === id ? { ...task, status: status } : task
        )
      );
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        getTasks,
        getTasksByStatus,
        getTask,
        createTask,
        updateTask,
        deleteTask,
        changeTaskStatus,
        errors,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};

TaskProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default TaskContext;
