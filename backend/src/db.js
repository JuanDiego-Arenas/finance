import mongoose from 'mongoose';

export const connectDB = async () => {
	try {
		await mongoose.connect(process.env.URI_MONGO);
		console.log('>>> Database connected <<<');
	} catch (error) {
		console.log(error);
	}
};
