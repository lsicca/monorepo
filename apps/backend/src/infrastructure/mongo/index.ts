import {
	initMongo as initMongoTest,
	stopMongo as stopMongoTest,
	cleanCollections as cleanCollectionsTest,
	deleteDatabase as deleteDatabaseTest,
} from './memory';
import {
	initMongo as initMongoDb,
	stopMongo as stopMongoDb,
	cleanCollections as cleanCollectionsDb,
	deleteDatabase as deleteDatabaseDb,
} from './mongo';

export const initMongo = () => {
	if (process.env.NODE_ENV === 'test') {
		initMongoTest();
	} else {
		initMongoDb();
	}
};

export const stopMongo = () => {
	if (process.env.NODE_ENV === 'test') {
		stopMongoTest();
	} else {
		stopMongoDb();
	}
};

export const cleanCollections = () => {
	if (process.env.NODE_ENV === 'test') {
		cleanCollectionsTest();
	} else {
		cleanCollectionsDb();
	}
};

export const deleteDatabase = () => {
	if (process.env.NODE_ENV === 'test') {
		deleteDatabaseTest();
	} else {
		deleteDatabaseDb();
	}
};
