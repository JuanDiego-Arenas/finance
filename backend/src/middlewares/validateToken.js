import jwt from 'jsonwebtoken';

export const authRequired = (req, res, next) => {
	const { token } = req.cookies;
	if (!token) return res.status(401).json({ message: 'No estas autorizado' });

	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
		if (err) return res.status(401).json({ message: 'Invalid token' });

		req.user = user;

		next();
	});
};

console.log('Triple hp cookies');
