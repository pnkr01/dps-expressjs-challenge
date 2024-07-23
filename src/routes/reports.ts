import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

//create a report for a project whose id is passed in the request body.
router.post('/', (req, res) => {
	const { id, name, description } = req.body;
	db.run(
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
		{ id, name, description },
	);
	res.status(201).send('Project created');
});

//get all reports.
router.get('/', (req, res) => {
	const projects = db.query('SELECT * FROM projects');
	res.status(200).json(projects);
});

//update a report by projectid.

router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	db.run(
		'UPDATE projects SET name = @name, description = @description WHERE id = @id',
		{ name, description, id },
	);
	res.status(200).send('Project updated');
});

//delete a report by projectid.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.run('DELETE FROM projects WHERE id = @id', { id });
	res.status(200).send('Project deleted');
});

export default router;
