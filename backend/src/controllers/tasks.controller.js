import Task from '../models/tasks.model.js';

export const getTasks = async (req, res) => {
	const tasks = await Task.find({
		user: req.user.id,
	}).populate('user');
	res.json(tasks);
};

export const getTask = async (req, res) => {
	const task = await Task.findById(req.params.id).populate('user');
	if (!task) return res.status(404).json({ message: 'Task not found' });
	res.json(task);
};

export const createTask = async (req, res) => {
	const { title, description, date } = req.body;

	try {
		const newTask = new Task({
			title,
			description,
			date,
			user: req.user.id,
		});

		const taskSaved = await newTask.save();
		res.status(201).json(taskSaved);
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const updateTask = async (req, res) => {
	const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
	if (!task) return res.status(404).json({ message: 'Task not found' });
	res.json(task);
};

export const deleteTask = async (req, res) => {
	const task = await Task.findByIdAndDelete(req.params.id, req.body, { new: true });
	if (!task) return res.status(404).json({ message: 'Task not found' });
	return res.sendStatus(204);
};
