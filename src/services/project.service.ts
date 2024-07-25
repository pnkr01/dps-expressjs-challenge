import db from './db.service';
import { Project } from '../models/project.model';
import { PROJECT_QUERIES } from '../config/queries';
import { MESSAGES } from '../config/constants';

class ProjectService {
	//create a project, while creating first we have to check if there is already a project with the same id.
	//If yes, then return a 400 status code with a message 'Project ID already exists. Please choose another ID for this project'.
	//If no, then insert the project into the database and return a 201 status code with a message 'Project created successfully'.

	async createProject(
		id: string,
		name: string,
		description: string,
	): Promise<void> {
		const project = db.query(PROJECT_QUERIES.GET_PROJECT_BY_ID, { id: id });
		if (project.length > 0) {
			throw new Error(MESSAGES.PROJECT_EXISTS);
		} else {
			db.run(PROJECT_QUERIES.CREATE_PROJECT, { id, name, description });
		}
	}

	//get all projects. If there are no projects, return a 404 status code with a message 'No projects found'.
	//If there are projects, return a 200 status code with the list of projects.
	//If there is an error while fetching the projects, return a 500 status code with a message 'Internal server error'.
	async getAllProjects(): Promise<Project[]> {
		return db.query(PROJECT_QUERIES.GET_ALL_PROJECTS) as Project[];
	}

	//update a project by id. If there is no project with the given id, return a 404 status code with a message 'No project exists with this ID'.
	//If there is a project with the given id, update the project and return a 200 status code with a message 'Project updated'.
	//If there is an error while updating the project, return a 500 status code with a message 'Internal server error'.
	async updateProject(
		id: string,
		name: string,
		description: string,
	): Promise<void> {
		const project = db.query(PROJECT_QUERIES.GET_PROJECT_BY_ID, {
			id,
		});
		if (project.length === 0) {
			throw new Error(MESSAGES.PROJECT_NOT_FOUND);
		} else {
			db.run(PROJECT_QUERIES.UPDATE_PROJECT, { name, description, id });
		}
	}

	//delete a project by id. If there is no project with the given id, return a 404 status code with a message 'No project exists with this ID'.
	//If there is a project with the given id, delete the project and return a 200 status code with a message 'Project deleted'.
	//If there is an error while deleting the project, return a 500 status code with a message 'Internal server error'.

	async deleteProject(id: string): Promise<void> {
		const project = db.query(PROJECT_QUERIES.GET_PROJECT_BY_ID, {
			id,
		});
		if (project.length === 0) {
			throw new Error(MESSAGES.PROJECT_NOT_FOUND);
		} else {
			db.run(PROJECT_QUERIES.DELETE_PROJECT, { id });
		}
	}
}

export default new ProjectService();
