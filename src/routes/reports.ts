import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

//create a report for a project whose id is passed in the request body.
router.post('/', (req, res) => {
	const { id, text, projectid } = req.body;
	db.run(
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)',
		{ id, text, projectid },
	);
	res.status(201).send('Report created');
});

//get all reports.
router.get('/', (req, res) => {
	const reports = db.query('SELECT * FROM reports');
	res.status(200).json(reports);
});

//update a report by projectid.
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { text, projectid } = req.body;
	db.run(
		'UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id',
		{ text, projectid, id },
	);
	res.status(200).send('Report updated');
});

//delete a report by projectid.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	db.run('DELETE FROM reports WHERE id = @id', { id });
	res.status(200).send('Report deleted');
});

export default router;
