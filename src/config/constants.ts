export const MESSAGES = {
	//project string starts
	PROJECT_CREATED: 'Hurray!! Project created successfully.',
	PROJECT_EXISTS:
		'Project id already exists. please choose another id for this project.',
	NO_PROJECTS_FOUND: 'No project exists in the database for this project id.',
	PROJECT_UPDATED: 'Project updated with new details.',
	PROJECT_DELETED: 'Project deleted successfully.',
	PROJECT_NOT_FOUND: 'No project exists with this id.',
	EMPTY_PROJECT_IN_DATABASE: 'No Project exist in the database.',
	//project string ends

	//report string starts
	REPORT_CREATED: 'Report created successfully.',
	REPORT_EXISTS: 'This report id already exists, Choose another report id.',
	NO_REPORTS_FOUND: 'No reports found with this id.',
	REPORT_UPDATED: 'Report updated successfully.',
	REPORT_DELETED: 'Report deleted successfully.',
	NO_REPORT_WITH_PROJECT_ID: 'No report exists with this project id.',
	//report string ends
	INTERNAL_SERVER_ERROR: 'Internal server error.',
	AUTH_ERROR:
		'You do not have permission to access this server. check authorization token in header.',
	UNIQUE_ERR: 'UNIQUE constraint failed',
};

export const STATUS_CODES = {
	SUCCESS: 200,
	CREATED: 201,
	BAD_REQUEST: 400,
	NOT_FOUND: 404,
	INTERNAL_SERVER_ERROR: 500,
	FORBIDDEN: 403,
};

export const password = 'Password123';
