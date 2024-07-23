import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

//create a project, while creating first we have to check if there is already a project with the same id.
//If yes, then return a 400 status code with a message 'Project ID already exists. Please choose another ID for this project'.
//If no, then insert the project into the database and return a 201 status code with a message 'Project created successfully'.
router.post('/', (req, res) => {
	const { id, name, description } = req.body;
	try {
		db.run(
			'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
			{ id, name, description },
		);
		res.status(201).send('Project created successfully');
	} catch (err: unknown) {
		if ((err as Error).message.includes('UNIQUE constraint failed')) {
			res.status(400).send(
				'Project ID already exists. Please choose another ID for this project',
			);
		} else {
			res.status(500).send('Internal server error');
		}
	}
});

//get all projects. If there are no projects, return a 404 status code with a message 'No projects found'.
//If there are projects, return a 200 status code with the list of projects.
//If there is an error while fetching the projects, return a 500 status code with a message 'Internal server error'.
router.get('/', (req, res) => {
	try {
		const projects = db.query('SELECT * FROM projects');
		if (projects.length === 0) {
			res.status(404).send('No project found in the database.');
		} else {
			res.status(200).json(projects);
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

//update a project by id. If there is no project with the given id, return a 404 status code with a message 'No project exists with this ID'.
//If there is a project with the given id, update the project and return a 200 status code with a message 'Project updated'.
//If there is an error while updating the project, return a 500 status code with a message 'Internal server error'.
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { name, description } = req.body;
	try {
		const project = db.query('SELECT * FROM projects WHERE id = @id', {
			id,
		});
		if (project.length === 0) {
			res.status(404).send('No project exists with this ID');
		} else {
			try {
				db.run(
					'UPDATE projects SET name = @name, description = @description WHERE id = @id',
					{ name, description, id },
				);
				res.status(200).send('Project updated');
			} catch (err) {
				res.status(500).send('Internal server error');
			}
		}
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

//delete a project by id. If there is no project with the given id, return a 404 status code with a message 'No project exists with this ID'.
//If there is a project with the given id, delete the project and return a 200 status code with a message 'Project deleted'.
//If there is an error while deleting the project, return a 500 status code with a message 'Internal server error'.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const project = db.query('SELECT * FROM projects WHERE id = @id', { id });
	if (project.length === 0) {
		res.status(404).send('No project exists with this ID');
	} else {
		try {
			db.run('DELETE FROM projects WHERE id = @id', { id });
			res.status(200).send('Project deleted');
		} catch (err) {
			res.status(500).send('Internal server error');
		}
	}
});

export default router;
