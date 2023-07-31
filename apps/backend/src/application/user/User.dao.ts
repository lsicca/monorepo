import mongoose from 'mongoose';
import { User } from './User.interfaces';
import UserModel, { UserDocument } from './User.models';

export const usersCount = async (): Promise<number> => {
	return UserModel.estimatedDocumentCount();
};

export const usersCreate = async (user: User): Promise<UserDocument> => {
	return UserModel.create(user);
};

export const usersFindByLogin = async (login: string): Promise<UserDocument | null> => {
	return UserModel.findOne({ login });
};

export const usersUpdateOne = async (_id: mongoose.Types.ObjectId, datas: unknown) => {
	return UserModel.updateOne({ _id }, datas);
};
