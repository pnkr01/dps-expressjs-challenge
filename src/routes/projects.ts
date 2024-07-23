import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

// create a project.
router.post('/', (req, res) => {
	const { id, name, description } = req.body;
	db.run(
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
		{ id, name, description },
	);
	res.status(201).send('Project created');
});

// get all projects.
router.get('/', (req, res) => {
	const projects = db.query('SELECT * FROM projects');
	res.status(200).json(projects);
});

// update a project by id.
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	db.run(
		'UPDATE projects SET name = @name, description = @description WHERE id = @id',
		{ name, description, id },
	);
	res.status(200).send('Project updated');
});

// delete a project by id.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.run('DELETE FROM projects WHERE id = @id', { id });
	res.status(200).send('Project deleted');
});

export default router;
