import db from './db.service';
import { Report } from '../models/report.model';
import { PROJECT_QUERIES, REPORT_QUERIES } from '../config/queries';
import { MESSAGES } from '../config/constants';

class ReportService {
	// Create a report, while creating first we have to check if there is already a report with the same id.
	// If yes, then return a 400 status code with a message 'Report ID already exists'.
	// If no, then insert the report into the database and return a 201 status code with a message 'Report created'.
	// If there is an error while creating the report, return a 500 status code with a message 'Internal server error'.
	async createReport(
		id: string,
		text: string,
		projectid: string,
	): Promise<void> {
		const report = db.query(REPORT_QUERIES.GET_REPORT_BY_ID, { id });
		if (report.length > 0) {
			throw new Error(MESSAGES.REPORT_EXISTS);
		}
		const project = db.query(PROJECT_QUERIES.GET_PROJECT_BY_ID, {
			id: projectid,
		});
		if (project.length == 0) {
			throw new Error(MESSAGES.NO_PROJECTS_FOUND);
		} else {
			db.run(REPORT_QUERIES.CREATE_REPORT, { id, text, projectid });
		}
	}

	// Get all reports. If there are no reports, return a 404 status code with a message 'No reports found'.
	// If there are reports, return a 200 status code with the list of reports.
	// If there is an error while fetching the reports, return a 500 status code with a message 'Internal server error'.
	// If the reports are fetched successfully, return a 200 status code with the list of reports.

	async getAllReports(): Promise<Report[]> {
		return db.query(REPORT_QUERIES.GET_ALL_REPORTS) as Report[];
	}

	// Update a report by id. If there is no report with the given id, return a 404 status code with a message 'No report exists with this ID'.
	// If there is a report with the given id, update the report and return a 200 status code with a message 'Report updated'.
	// If there is an error while updating the report, return a 500 status code with a message 'Internal server error'.
	// If the report is updated successfully, return a 200 status code with a message 'Report updated'.

	async updateReport(
		id: string,
		text: string,
		projectid: string,
	): Promise<void> {
		const report = db.query(REPORT_QUERIES.GET_REPORT_BY_ID, { id });
		if (report.length === 0) {
			throw new Error(MESSAGES.NO_REPORTS_FOUND);
		}
		db.run(REPORT_QUERIES.UPDATE_REPORT, { text, projectid, id });
	}

	// Delete a report by id. If there is no report with the given id, return a 404 status code with a message 'No report exists with this ID'.
	// If there is a report with the given id, delete the report and return a 200 status code with a message 'Report deleted successfully'.
	// If there is an error while deleting the report, return a 500 status code with a message 'Internal server error'.
	// If the report is deleted successfully, return a 200 status code with a message 'Report deleted successfully'.

	async deleteReport(id: string): Promise<void> {
		const report = db.query(REPORT_QUERIES.GET_REPORT_BY_ID, { id });
		if (report.length === 0) {
			throw new Error(MESSAGES.NO_REPORTS_FOUND);
		}
		db.run(REPORT_QUERIES.DELETE_REPORT, { id });
	}

	// Get all reports of a project using project id. If there are no reports with the given project id, return a 404 status code with a message 'No Report exists with this ID'.
	// If there are reports with the given project id, return a 200 status code with the list of reports.
	// If there is an error while fetching the reports, return a 500 status code with a message 'Internal server error'.
	// If the reports are fetched successfully, return a 200 status code with the list of reports.

	async getReportsByProject(projectid: string): Promise<Report[]> {
		return db.query(REPORT_QUERIES.GET_REPORTS_BY_PROJECT_ID, {
			projectid,
		}) as Report[];
	}

	// Special endpoint to get reports with the same word appearing at least three times

	async getSpecialReports(): Promise<Report[]> {
		const reports = db.query(REPORT_QUERIES.GET_ALL_REPORTS) as Report[];
		return reports.filter((report: Report) => {
			const wordCount: { [key: string]: number } = {};
			report.text.split(' ').forEach((word: string) => {
				wordCount[word] = (wordCount[word] || 0) + 1;
			});
			return Object.values(wordCount).some((count) => count >= 3);
		});
	}
}

export default new ReportService();
