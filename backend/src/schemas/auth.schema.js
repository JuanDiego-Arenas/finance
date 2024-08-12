import { z } from 'zod';

export const registerSchema = z.object({
	user_name: z
		.string({
			required_error: 'El nombre de usuario es requerido',
		})
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
	email: z
		.string({
			required_error: 'El correo electrónico es requerido',
		})
		.email({
			message: 'El correo electrónico no es válido',
		}),
	password: z
		.string({
			required_error: 'La contraseña es requerida',
		})
		.min(6, 'La contraseña debe tener al menos 6 caracteres'),
});

export const loginSchema = z.object({
	user_name: z
		.string({
			required_error: 'El nombre de usuario es requerido',
		})
		.min(3, 'El nombre de usuario debe tener al menos 3 caracteres'),
	password: z
		.string({
			required_error: 'Contraseña es requerida',
		})
		.min(6, {
			message: 'La contraseña mínimo 6 Caracteres',
		}),
});
