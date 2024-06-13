import Task from "../models/Task.js";

export const createTask = async (req, res) => {
  const { title, description, status } = req.body;
  const id = req.userId;

  // console.log(title, description, status)
  // console.log(id)

  try {
    const task = await Task.create({ title, description, status, userId: id });
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const getTasks = async (req, res) => {
  const id = req.userId;

  try {
    const task = await Task.find({ userId: id });
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const updateTask = async (req, res) => {
  const { id } = req.params;
  const { title, description, status } = req.body;

  try {
    const task = await Task.findByIdAndUpdate(
      id,
      { title, description, status },
      { new: true }
    );

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Task.findByIdAndDelete(id);
    res.status(200).json(task);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
