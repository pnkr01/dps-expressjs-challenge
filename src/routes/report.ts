import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

router.post('/', (req, res) => {
	const { id, name, description } = req.body;
	db.run(
		'INSERT INTO reports (id, name, description) VALUES (@id, @name, @description)',
		{ id, name, description },
	);
	res.status(201).send('Project created successfully.');
});

router.get('/', (req, res) => {
	const projects = db.query('SELECT * FROM reports');
	res.status(200).json(projects);
});

export default router;
