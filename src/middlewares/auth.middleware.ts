import express from 'express';
import { MESSAGES, password } from '../config/constants';
import { STATUS_CODES } from '../config/constants';

const checkAccess = (token: string) => {
	return token === password;
};

const authMiddleware = (
	req: express.Request,
	res: express.Response,
	next: express.NextFunction,
) => {
	const token = req.headers['authorization'];
	if (token && checkAccess(token)) {
		next();
	} else {
		res.status(STATUS_CODES.FORBIDDEN).send({
			error: MESSAGES.AUTH_ERROR,
			status: STATUS_CODES.FORBIDDEN,
			sucess: false,
		});
	}
};

export default authMiddleware;
