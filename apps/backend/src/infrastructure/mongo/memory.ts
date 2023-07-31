import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';

const mongod = new MongoMemoryServer();

export const initMongo = async (): Promise<void> => {
	try {
		await mongod.start();
		const uri = mongod.getUri();
		await mongoose.connect(`${uri}`, {
			dbName: process.env.NODE_ENV,
		});
	} catch (e) {
		throw new Error(`Fail trying to connect on mongo Database, with context ${e}`);
	}
};

export const stopMongo = async (): Promise<void> => {
	try {
		await mongoose.disconnect();
		await mongod.stop();
	} catch (e) {
		throw new Error(`Fail trying to disconnect mongo Database, with context ${e}`);
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

export const deleteDatabase = async (): Promise<void> => {
	try {
		await mongoose.connection.dropDatabase();
	} catch (e) {
		throw new Error(`Fail trying to delete Database, with context ${e}`);
	}
};
