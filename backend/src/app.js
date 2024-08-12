import express from 'express';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import cros from 'cors';
import fileUpload from 'express-fileupload';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Importar rutas
import authRoutes from './router/auth.routes.js';
import taskRoutes from './router/tasks.routes.js';

app.use(express.static(path.join(__dirname, 'uploads')));
app.use(fileUpload());

// Configurar Body Parser

app.use(cookieParser());
// app.use(
//   cors({
//     origin: FRONTEND_URL,
//     credentials: true,
//   })
// );

// Configuración de Header HTTP - CORS

app.use(cros());
app.use(morgan('dev'));
app.use(express.json());

// Configurar rutas

app.use('/api/auth', authRoutes);
app.use('/api', taskRoutes);

app.use((req, res, next) => {
	res.status(404).json({
		message: 'EndPoint No Encontrado',
	});
});

export default app;
