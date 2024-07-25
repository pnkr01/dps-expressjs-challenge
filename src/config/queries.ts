export const PROJECT_QUERIES = {
	CREATE_PROJECT:
		'INSERT INTO projects (id, name, description) VALUES (@id, @name, @description)',
	GET_ALL_PROJECTS: 'SELECT * FROM projects',
	GET_PROJECT_BY_ID: 'SELECT * FROM projects WHERE id = @id',
	UPDATE_PROJECT:
		'UPDATE projects SET name = @name, description = @description WHERE id = @id',
	DELETE_PROJECT: 'DELETE FROM projects WHERE id = @id',
};

export const REPORT_QUERIES = {
	CREATE_REPORT:
		'INSERT INTO reports (id, text, projectid) VALUES (@id, @text, @projectid)',
	GET_ALL_REPORTS: 'SELECT * FROM reports',
	GET_REPORT_PROJECT_BY_PROJECT_ID:
		'SELECT * FROM projects WHERE id = @projectid',
	GET_REPORT_BY_ID: 'SELECT * FROM reports WHERE id = @id',
	GET_REPORTS_BY_PROJECT_ID:
		'SELECT * FROM reports WHERE projectid = @projectid',
	UPDATE_REPORT:
		'UPDATE reports SET text = @text, projectid = @projectid WHERE id = @id',
	DELETE_REPORT: 'DELETE FROM reports WHERE id = @id',
};
