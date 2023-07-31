import mongoose from 'mongoose';
import { logger } from '../logger';

export const initMongo = async (): Promise<void> => {
	try {
		const uri = String(process.env.MONGO_URL);
		await mongoose.connect(`${uri}`, {
			// dbName: process.env.NODE_ENV || 'development',
			dbName: 'lux',
		});
		mongoose.set('bufferCommands', false);
		mongoose.set('debug', false);
		mongoose.set('runValidators', true);
		mongoose.set('maxTimeMS', 60000);
		mongoose.set('autoIndex', false);
		mongoose.set('strict', 'throw');

		mongoose.connection
			.on('error', (err: Error) => {
				logger.error('Mongoose connection error : ');
				logger.error(err);
			})
			.once('open', () => {
				logger.info('Success connection to mongoDb');
			});
	} catch (e) {
		throw new Error(`Fail trying to connect on mongo Database, with context ${e}`);
	}
};

export const stopMongo = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
	} catch (e) {
		throw new Error(`Fail trying to disconnect mongo Database, with context ${e}`);
	}
};

export const deleteDatabase = async (): Promise<void> => {
	try {
		await mongoose.connection.dropDatabase();
	} catch (e) {
		throw new Error(`Fail trying to delete Database, with context ${e}`);
	}
};

export const cleanCollections = async (collections: string[] = []): Promise<void> => {
	try {
		await mongoose.connection.db.collections().then((collectionsDb) => {
			return Promise.all(
				collectionsDb
					.filter((collection) => {
						return collections.length > 0 ? collections.includes(collection.collectionName) : true;
					})
					.map((collection) => {
						return collection.deleteMany({});
					}),
			);
		});
	} catch (e) {
		throw new Error(`Fail trying to clean mongo collections, with context ${e}`);
	}
};
