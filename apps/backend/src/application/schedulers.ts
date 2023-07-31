import cron from 'node-cron';
import { readdirSync, existsSync } from 'fs';

export interface Scheduler {
	cron: string;
	call: () => void;
}

type Schedulers = {
	default: Scheduler[];
};

export const planSchedulers = async (): Promise<void> => {
	if (existsSync(`${__dirname}/../domains`)) {
		readdirSync(`${__dirname}/../domains`).forEach((folder) => {
			try {
				// eslint-disable-next-line @typescript-eslint/no-var-requires
				const schedulers: Schedulers = require(`${__dirname}/../domains/${folder}/${folder}.schedulers`);
				schedulers.default.forEach((scheduler: { cron: string; call: () => void }) => {
					cron.schedule(scheduler.cron, scheduler.call);
				});
			} catch (err) {
				// logger.error(`Unable to import scheduler for ${folder}`);
				// logger.error(err);
			}
		});
	}
};
