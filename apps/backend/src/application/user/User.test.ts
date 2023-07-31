import { IncomingHttpHeaders } from 'http2';
import { MongoServerError } from 'mongodb';
import { usersUpdateOne } from './User.dao';

import { shouldUserBeFirstAdmin } from './User.helpers';
import { createNewUser, getUserProfile, loginUser, updateUserWithLoginDatas } from './User.services';
import UserModel from './User.models';
import { initMongo, stopMongo, deleteDatabase } from '@infra/mongo';

const USER = {
	email: 'test@test.fr',
	password: 'password',
	login: 'login',
	firstName: 'first',
	lastName: 'last',
};

describe('Create a new user', () => {
	beforeAll(async () => {
		await initMongo();
	});

	beforeEach(async () => {
		await deleteDatabase();
		await UserModel.ensureIndexes();
	});

	afterAll(async () => {
		await stopMongo();
	});

	describe('Check if an user should be admin', () => {
		it('should be first user', async () => {
			const isFirstUser = await shouldUserBeFirstAdmin();
			expect(isFirstUser).toBe(true);
		});
		it('should not be first user', async () => {
			await createNewUser(USER);

			const isFirstUser = await shouldUserBeFirstAdmin();
			expect(isFirstUser).toBe(false);
		});
	});

	describe('Create a new user', () => {
		it('should create a new user', async () => {
			const { authResponse } = await createNewUser(USER);

			expect(authResponse).toHaveProperty('token');
			expect(authResponse).toHaveProperty('expiresIn');
		});

		it('should not create twice the same user', async () => {
			expect.assertions(2);

			try {
				await createNewUser(USER);
				await createNewUser(USER);
			} catch (err) {
				expect(err).toBeInstanceOf(MongoServerError);
				expect(err).toHaveProperty('code', 11000);
			}
		});
	});

	describe('Log in a new user', () => {
		it('should log in an user', async () => {
			await createNewUser(USER);
			const { authResponse } = await loginUser(USER);
			expect(authResponse).toHaveProperty('token');
			expect(authResponse).toHaveProperty('expiresIn');
		});

		it('should not log in a user who doesnt exist', async () => {
			expect.assertions(2);

			try {
				await loginUser(USER);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect((err as Error).message).toBe('404');
			}
		});

		it('should not log in a user who is inactive', async () => {
			expect.assertions(2);

			const { user } = await createNewUser(USER);
			await usersUpdateOne(user._id, { isActive: false });

			try {
				await loginUser(USER);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect((err as Error).message).toBe('404');
			}
		});

		it('should not log in a user without a password', async () => {
			expect.assertions(2);

			const { user } = await createNewUser(USER);
			await usersUpdateOne(user._id, { $unset: { password: '' } });

			try {
				await loginUser(USER);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect((err as Error).message).toBe('400');
			}
		});

		it('should not log in a user with a bad password', async () => {
			expect.assertions(2);
			await createNewUser(USER);

			try {
				await loginUser({ ...USER, ...{ password: 'badpassword' } });
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect((err as Error).message).toBe('400');
			}
		});

		it('should update user with login datas', async () => {
			const { user } = await createNewUser(USER);
			await expect(updateUserWithLoginDatas(user._id, {} as IncomingHttpHeaders, 'ip')).resolves.not.toThrow();
		});
	});

	describe('Get a user profile', () => {
		it('should return the user profile', async () => {
			await createNewUser(USER);
			const profile = await getUserProfile(USER.login);
			expect(profile).toHaveProperty('login', USER.login);
		});

		it('should not return the profile of a not existing user', async () => {
			expect.assertions(2);

			try {
				await getUserProfile(USER.login);
			} catch (err) {
				expect(err).toBeInstanceOf(Error);
				expect((err as Error).message).toBe('404');
			}
		});
	});
});
