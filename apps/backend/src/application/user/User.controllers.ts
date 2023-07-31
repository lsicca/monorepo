import { Request, Response } from 'express';
import { usersCount } from './User.dao';
import { UserLogin, UserRegister } from './User.interfaces';
import { createNewUser, getUserProfile, loginUser, updateUserWithLoginDatas } from './User.services';

export const isFirstUser = async (req: Request, res: Response): Promise<void> => {
	try {
		const nbUsers = await usersCount();
		res.status(200).json(nbUsers === 0);
	} catch (err) {
		res.sendStatus(500);
	}
};

export const register = async ({ bodyData }: Request, res: Response): Promise<void> => {
	try {
		const { authResponse } = await createNewUser(bodyData as UserRegister);
		res.status(201).send(authResponse);
	} catch (err) {
		const error = err as { code: number; keyPattern: { [key: string]: number } };
		if (error.code === 11000) {
			res.status(409).json(error.keyPattern);
			return;
		}
		res.sendStatus(500);
	}
};

export const login = async ({ bodyData, headers, ip }: Request, res: Response): Promise<void> => {
	try {
		const { user, authResponse } = await loginUser(bodyData as UserLogin);
		updateUserWithLoginDatas(user._id, headers, ip);
		res.status(200).json(authResponse);
	} catch (err) {
		if ((err as Error).message === '404') {
			res.sendStatus(404);
			return;
		}
		if ((err as Error).message === '400') {
			res.sendStatus(400);
			return;
		}
		res.sendStatus(500);
	}
};

export const getProfile = async ({ auth }: Request, res: Response): Promise<void> => {
	try {
		const profile = await getUserProfile(auth.login);

		res.status(200).json(profile);
	} catch (err) {
		if (err === '404') {
			res.sendStatus(404);
			return;
		}
		res.sendStatus(500);
	}
};
