import jwt from 'jsonwebtoken';
import { usersCount } from './User.dao';
import { AuthResponse, User } from './User.interfaces';
import { UserDocument } from './User.models';
import { userValidator } from './User.validators';

export const buildAuthResponse = (id: string, login: string, email: string): AuthResponse => {
	return {
		token: jwt.sign(
			{
				id,
				login,
				email,
			},
			String(process.env.JWT_KEY),
			{ expiresIn: `${process.env.JWT_EXPIRATIONTIME_HOUR || 1}h` },
		),
		expiresIn: Number(process.env.JWT_EXPIRATIONTIME_HOUR || 1) * 3600,
	};
};

export const sanitizeProfile = (profile: UserDocument): User => {
	const { value } = userValidator.validate(profile.toObject(), {
		abortEarly: false,
		stripUnknown: true,
	});
	return value;
};

export const shouldUserBeFirstAdmin = async (): Promise<boolean> => {
	const nbUsers = await usersCount();
	return nbUsers === 0;
};
