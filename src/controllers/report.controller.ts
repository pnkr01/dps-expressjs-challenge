import { Request, Response } from 'express';
import ReportService from '../services/report.service';
import { handleError, handleSuccess } from '../utils/response';
import { MESSAGES, STATUS_CODES } from '../config/constants';

class ReportController {
	async createReport(req: Request, res: Response) {
		const { id, text, projectid } = req.body;
		try {
			await ReportService.createReport(id, text, projectid);
			handleSuccess(res, MESSAGES.REPORT_CREATED, STATUS_CODES.CREATED);
		} catch (err) {
			handleError(res, (err as Error).message, STATUS_CODES.BAD_REQUEST);
		}
	}

	async getAllReports(req: Request, res: Response) {
		try {
			const reports = await ReportService.getAllReports();
			handleSuccess(res, reports);
		} catch (err) {
			handleError(
				res,
				(err as Error).message,
				STATUS_CODES.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateReport(req: Request, res: Response) {
		const { id } = req.params;
		const { text, projectid } = req.body;
		try {
			await ReportService.updateReport(id, text, projectid);
			handleSuccess(res, MESSAGES.REPORT_UPDATED);
		} catch (err) {
			handleError(res, (err as Error).message, STATUS_CODES.NOT_FOUND);
		}
	}

	async deleteReport(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await ReportService.deleteReport(id);
			handleSuccess(res, MESSAGES.REPORT_DELETED);
		} catch (err) {
			handleError(res, (err as Error).message, STATUS_CODES.NOT_FOUND);
		}
	}

	async getReportsByProject(req: Request, res: Response) {
		const { projectid } = req.params;
		try {
			const reports = await ReportService.getReportsByProject(projectid);
			if (reports.length === 0) {
				handleError(
					res,
					MESSAGES.NO_REPORT_WITH_PROJECT_ID,
					STATUS_CODES.NOT_FOUND,
				);
			} else {
				handleSuccess(res, reports);
			}
		} catch (err) {
			handleError(
				res,
				(err as Error).message,
				STATUS_CODES.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getSpecialReports(req: Request, res: Response) {
		try {
			const reports = await ReportService.getSpecialReports();
			handleSuccess(res, reports);
		} catch (err) {
			handleError(
				res,
				(err as Error).message,
				STATUS_CODES.INTERNAL_SERVER_ERROR,
			);
		}
	}
}

export default new ReportController();
