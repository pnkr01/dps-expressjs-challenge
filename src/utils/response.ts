import { Response } from 'express';
import { STATUS_CODES } from '../config/constants';

export const handleSuccess = (
	res: Response,
	data: unknown,
	statusCode: number = STATUS_CODES.SUCCESS,
) => {
	res.status(statusCode).json({
		respone: data,
		status: statusCode,
		success: true,
	});
};

export const handleError = (
	res: Response,
	message: string,
	statusCode: number = STATUS_CODES.INTERNAL_SERVER_ERROR,
) => {
	res.status(statusCode).json({
		error: message,
		status: statusCode,
		success: false,
	});
};
