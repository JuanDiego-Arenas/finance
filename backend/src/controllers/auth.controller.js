import User from '../models/user.model.js';
import bcrypt from 'bcryptjs';
import { createAccessToken } from '../libs/jwt.js';

export const register = async (req, res) => {
	const { user_name, email, password } = req.body;

	try {
		const passwordHash = await bcrypt.hash(password, 10);

		const newUser = new User({
			user_name,
			email,
			password: passwordHash,
		});

		const userSaved = await newUser.save();
		const token = await createAccessToken({ id: userSaved._id });
		res.cookie('token', token);
		res.json({
			id: userSaved._id,
			user_name: userSaved.user_name,
			email: userSaved.email,
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const login = async (req, res) => {
	const { user_name, password } = req.body;

	try {
		const userFound = await User.findOne({ user_name });
		if (!userFound) return res.status(404).json(['usuario o contraseña incorrectos']);

		const isMatch = await bcrypt.compare(password, userFound.password);
		if (!isMatch) return res.status(400).json(['usuario o contraseña incorrectos']);

		const token = await createAccessToken({ id: userFound._id });
		res.cookie('token', token);
		res.json({
			user_name: userFound.user_name,
			message: 'Bienvenido',
		});
	} catch (error) {
		res.status(500).json({ message: error.message });
	}
};

export const logout = (req, res) => {
	res.clearCookie('token');
	return res.sendStatus(200);
};

export const profile = async (req, res) => {
	const userFound = await User.findById(req.user.id);

	if (!userFound) return res.status(404).json({ message: 'Usuario no encontrado' });

	return res.status(200).json({
		id: userFound._id,
		user_name: userFound.user_name,
		email: userFound.email,
	});
};
