import { initApp } from '@app/app';
import { initMongo } from '@infra/mongo';
import { planSchedulers } from '@app/schedulers';
import { logger } from '@infra/logger';

declare module 'express' {
	// eslint-disable-next-line no-shadow
	interface Request {
		logger: typeof logger;
		bodyData: unknown;
		auth: {
			email: string;
			login: string;
			id: string;
			iat: number;
			exp: number;
		};
	}
}

(async function () {
	await initApp();
	await initMongo();
	planSchedulers();
})();
