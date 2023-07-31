import express, { NextFunction, Request, Response } from 'express';
import * as dotenv from 'dotenv';
import * as path from 'path';
import cors from 'cors';
import * as helmet from 'helmet';
import { expressjwt as jwt } from 'express-jwt';

import { logger, loggerMdw } from '@infra/logger';

import router from './router';

export const initApp = async () => {
	const app = express();

	app.set('env', process.env.NODE_ENV || 'development');
	app.set('port', process.env.PORT || 3333);

	if (app.get('env') !== 'production') {
		dotenv.config({ path: path.resolve('config', `${app.get('env')}.env`) });
	}

	const corsOptions: cors.CorsOptions = {
		origin: app.get('env') === 'development' ? true : JSON.parse(String(process.env.CORS_ORIGIN)),
	};

	app.use(helmet.default());
	app.use(express.json());
	app.use(cors(corsOptions));

	app.use(express.json());

	app.use(
		jwt({ secret: String(process.env.JWT_KEY), algorithms: ['HS256'] }).unless({
			path: [/health-check/, /spotify\/callback/, /auth\/(login|register)/, /users\/isFirst/],
		}),
	);

	app.use(loggerMdw);

	app.get('/health-check', async (req, res) => {
		res.json({ message: 'Api is working' });
	});

	app.use('/', router);

	app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
		res.status(401).send();
		next();
	});

	return app.listen(app.get('port'), () => {
		logger.info(`${process.env.APP_TITLE} listening on port ${app.get('port')} (${app.get('env')})`);
	});
};
