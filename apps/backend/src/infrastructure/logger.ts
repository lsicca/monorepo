/* eslint-disable no-console */

import { NextFunction, Request, Response } from 'express';

const info = (message: unknown): void => {
	console.log('\x1b[33m%s\x1b[0m', message);
};

const error = (message: unknown): void => {
	console.error('\x1b[31m%s\x1b[0m', message);
};

const debug = (message: unknown): void => {
	console.debug(message);
};

const table = (message: unknown[]): void => {
	console.table(message);
};

export const logger = Object.freeze({
	info,
	error,
	debug,
	table,
});

export const loggerMdw = (req: Request, res: Response, next: NextFunction): void => {
	req.logger = logger;
	next();
};
