import { Router } from 'express';
import { readdirSync, existsSync } from 'fs';
import routes from '@app/user/User.routes';
import { logger } from '@infra/logger';

const router = Router();

router.use('/api/', routes);

if (existsSync(`${__dirname}/../domains`)) {
	readdirSync(`${__dirname}/../domains`).forEach((folder) => {
		try {
			// eslint-disable-next-line @typescript-eslint/no-var-requires
			const folderRoutes: Router = require(`${__dirname}/../domains/${folder}/${folder}.routes`);
			router.use('/api/', folderRoutes);
		} catch (err) {
			logger.info(`Unable to import route for ${folder}`);
			logger.error(err);
		}
	});
}

export default router;
