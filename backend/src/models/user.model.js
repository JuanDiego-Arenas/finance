import mongoose from 'mongoose';

const userSchema = new mongoose.Schema(
	{
		user_name: {
			type: String,
			required: true,
			unique: true,
			trim: true,
		},
		email: {
			type: String,
			required: true,
			unique: true,
			trim: true,
			lowercase: true,
		},
		password: {
			type: String,
			required: true,
			trim: true,
		},
	},
	{
		timestamps: true,
	}
);
export default mongoose.model('User', userSchema);
