import { Request, Response } from 'express';
import ProjectService from '../services/project.service';
import { handleError, handleSuccess } from '../utils/response';
import { MESSAGES, STATUS_CODES } from '../config/constants';

class ProjectController {
	async createProject(req: Request, res: Response) {
		const { id, name, description } = req.body;
		try {
			await ProjectService.createProject(id, name, description);
			handleSuccess(res, MESSAGES.PROJECT_CREATED, STATUS_CODES.CREATED);
		} catch (err) {
			handleError(
				res,
				(err as Error).message,
				STATUS_CODES.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async getAllProjects(req: Request, res: Response) {
		try {
			const projects = await ProjectService.getAllProjects();
			handleSuccess(res, projects);
		} catch (err) {
			handleError(
				res,
				(err as Error).message,
				STATUS_CODES.INTERNAL_SERVER_ERROR,
			);
		}
	}

	async updateProject(req: Request, res: Response) {
		const { id } = req.params;
		const { name, description } = req.body;
		try {
			await ProjectService.updateProject(id, name, description);
			handleSuccess(res, MESSAGES.PROJECT_UPDATED);
		} catch (err) {
			handleError(res, (err as Error).message, STATUS_CODES.NOT_FOUND);
		}
	}

	async deleteProject(req: Request, res: Response) {
		const { id } = req.params;
		try {
			await ProjectService.deleteProject(id);
			handleSuccess(res, MESSAGES.PROJECT_DELETED);
		} catch (err) {
			handleError(res, (err as Error).message, STATUS_CODES.NOT_FOUND);
		}
	}
}

export default new ProjectController();
