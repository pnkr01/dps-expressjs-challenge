import { Router } from 'express';
import db from '../services/db.service';

const router = Router();

// Create a report, while creating first we have to check if there is already a report with the same id.
// If yes, then return a 400 status code with a message 'Report ID already exists'.
// If no, then insert the report into the database and return a 201 status code with a message 'Report created'.
// If there is an error while creating the report, return a 500 status code with a message 'Internal server error'.
router.post('/', (req, res) => {
	const { id, text, projectid } = req.body;

	const report = db.query('SELECT * FROM reports WHERE id = @id', { id });
	if (report.length > 0) {
		res.status(400).send('This Report ID already exists, Choose another.');
	} else {
		try {
			//check if with this id is any project exists, if not then raise error as no
			//project exists with this id, else create the report.
			const project = db.query(
				'SELECT * FROM projects WHERE id = @projectid',
				{
					projectid: projectid,
				},
			);
			if (project.length != 0) {
				db.run(
					'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)',
					{ id, text, projectid },
				);
				res.status(201).send('Report created');
			} else {
				res.status(201).send('No Project exist with this ID.');
			}
		} catch (err) {
			res.status(500).send('Internal server error');
		}
	}
});

// Get all reports. If there are no reports, return a 404 status code with a message 'No reports found'.
// If there are reports, return a 200 status code with the list of reports.
// If there is an error while fetching the reports, return a 500 status code with a message 'Internal server error'.
// If the reports are fetched successfully, return a 200 status code with the list of reports.
router.get('/', (req, res) => {
	try {
		const reports = db.query('SELECT * FROM reports');
		res.status(200).json(reports);
	} catch (err) {
		res.status(500).send('Internal server error');
	}
});

// Update a report by id. If there is no report with the given id, return a 404 status code with a message 'No report exists with this ID'.
// If there is a report with the given id, update the report and return a 200 status code with a message 'Report updated'.
// If there is an error while updating the report, return a 500 status code with a message 'Internal server error'.
// If the report is updated successfully, return a 200 status code with a message 'Report updated'.
router.put('/:id', (req, res) => {
	const { id } = req.params;
	const { text, projectid } = req.body;
	const report = db.query('SELECT * FROM reports WHERE id = @id', { id });
	if (report.length == 0) {
		res.status(404).send('cannot update as no report exists with this ID');
	} else {
		try {
			db.run(
				'UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id',
				{ text, projectid, id },
			);
			res.status(200).send('Report updated');
		} catch (err) {
			res.status(500).send('Internal server error');
		}
	}
});

// Delete a report by id. If there is no report with the given id, return a 404 status code with a message 'No report exists with this ID'.
// If there is a report with the given id, delete the report and return a 200 status code with a message 'Report deleted successfully'.
// If there is an error while deleting the report, return a 500 status code with a message 'Internal server error'.
// If the report is deleted successfully, return a 200 status code with a message 'Report deleted successfully'.
router.delete('/:id', (req, res) => {
	const { id } = req.params;
	const deletedReport = db.query('SELECT * FROM reports WHERE id = @id', {
		id,
	});
	if (deletedReport.length == 0) {
		res.status(404).send('cannot delete as no report exists with this ID');
	} else {
		try {
			db.run('DELETE FROM reports WHERE id = @id', { id });
			res.status(200).send('Report deleted successfully');
		} catch (err) {
			res.status(500).send(
				'Internal server error while deleting the report.',
			);
		}
	}
});

// Get all reports of a project using project id. If there are no reports with the given project id, return a 404 status code with a message 'No Report exists with this ID'.
// If there are reports with the given project id, return a 200 status code with the list of reports.
// If there is an error while fetching the reports, return a 500 status code with a message 'Internal server error'.
// If the reports are fetched successfully, return a 200 status code with the list of reports.
router.get('/project/:projectid', (req, res) => {
	const { projectid } = req.params;
	const reports = db.query(
		'SELECT * FROM reports WHERE projectid = @projectid',
		{ projectid },
	);
	if (reports.length == 0) {
		res.status(404).send('No Report exists with this ID');
	} else {
		try {
			res.status(200).json(reports);
		} catch (err) {
			res.status(500).send('Internal server error');
		}
	}
});

// Special endpoint to get reports with the same word appearing at least three times
router.get('/special/reports', (req, res) => {
	interface Report {
		id: number;
		text: string;
		projectid: number;
	}

	const reports: Report[] = db.query('SELECT * FROM reports') as Report[];
	const filteredReports = reports.filter((report: Report) => {
		const wordCount: { [key: string]: number } = {};
		report.text.split(' ').forEach((word: string) => {
			wordCount[word] = (wordCount[word] || 0) + 1;
		});
		return Object.values(wordCount).some((count) => count >= 3);
	});
	res.status(200).json(filteredReports);
});

export default router;
