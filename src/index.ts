import express, { Express } from 'express';
import dotenv from 'dotenv';
import projectRoutes from './routes/projects';
import reportRoutes from './routes/reports';

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());

const authMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const token = req.headers['authorization'];
	if (token === 'Password123') {
		next();
	} else {
		res.status(403).send(
			'You do not have permission to access this server. Check Authorization token in Header.',
		);
	}
};

app.use(authMiddleware);
app.use('/projects', projectRoutes);
app.use('/reports', reportRoutes);

app.listen(port, () => {
	console.log(`[server]: Server is running at http://localhost:${port}`);
});
