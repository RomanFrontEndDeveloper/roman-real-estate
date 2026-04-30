import { Request, Response, NextFunction } from 'express';

export const errorHandler = (
	err: Error & { status?: number },
	req: Request,
	res: Response,
	next: NextFunction,
) => {
	console.error('🔥 ERROR:', err);

	const status = err.status ?? 500;
	const message = err.message ?? 'Server error';

	res.status(status).json({
		success: false,
		message,
	});
};
