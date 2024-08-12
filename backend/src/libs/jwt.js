import jwt from 'jsonwebtoken';

export function createAccessToken(payload) {
	return new Promise((resolve, reject) => {
		jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1d' }, (err, token) => {
			if (err) return reject(err);
			resolve(token);
		});
	});
}
