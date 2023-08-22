import Task from "../models/task.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user.id }).populate("user");
    res.json(tasks);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Task.findById(req.params.id).populate("user");
    if (!task) res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const createTask = async (req, res) => {
  try {
    const { title, description, deadline, status } = req.body;
    const newTask = new Task({
      title,
      description,
      deadline,
      status,
      user: req.user.id,
    });
    const taskSaved = await newTask.save();
    res.json(taskSaved);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!task) res.status(404).json({ message: "Task not found" });
    res.json(task);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Task.findByIdAndDelete(req.params.id);
    if (!task) res.status(404).json({ message: "Task not found" });
    res.sendStatus(204);
  } catch (error) {
    return res.status(500).json({ message: "Something went wrong" });
  }
};
