import bcrypt from 'bcrypt';
import { IncomingHttpHeaders } from 'http2';
import { usersCreate, usersFindByLogin, usersUpdateOne } from './User.dao';
import { AuthResponse, User, UserLogin, UserRegister } from './User.interfaces';
import { buildAuthResponse, sanitizeProfile, shouldUserBeFirstAdmin } from './User.helpers';
import { UserDocument } from './User.models';
import mongoose from 'mongoose';

export const createNewUser = async (
	userData: UserRegister,
): Promise<{ authResponse: AuthResponse; user: UserDocument }> => {
	const isAdmin = await shouldUserBeFirstAdmin();
	const password = await bcrypt.hash(userData.password, 10);

	const userToCreate: User = { ...userData, ...{ isAdmin, password, isActive: true, passwd: userData.password } };

	const userCreated = await usersCreate(userToCreate);

	return { authResponse: buildAuthResponse(userCreated._id, userCreated.login, userCreated.email), user: userCreated };
};

export const loginUser = async (userData: UserLogin): Promise<{ authResponse: AuthResponse; user: UserDocument }> => {
	const user = await usersFindByLogin(userData.login);

	if (!user) {
		throw new Error('404');
	}

	if (!user.isActive) {
		throw new Error('404');
	}

	if (!user.password) {
		throw new Error('400');
	}

	if (!(await bcrypt.compareSync(userData.password, user.password))) {
		throw new Error('400');
	}

	return { authResponse: buildAuthResponse(user._id, user.login, user.email), user };
};

export const updateUserWithLoginDatas = async (
	_id: mongoose.Types.ObjectId,
	headers: IncomingHttpHeaders,
	ip: string,
): Promise<void> => {
	const connectionInfos = JSON.stringify({ headers, ip });
	await usersUpdateOne(_id, { $set: { connectionInfos } });
};

export const getUserProfile = async (login: string): Promise<User> => {
	const userDB = await usersFindByLogin(login);

	if (!userDB) {
		throw Error('404');
	}

	return sanitizeProfile(userDB);
};
