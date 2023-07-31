import mongoose, { Schema } from 'mongoose';
import { User } from './User.interfaces';

export const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		login: { type: String, required: true, unique: true },
		firstName: { type: String, required: true },
		lastName: { type: String, required: true },
		password: { type: String, required: false },
		passwd: { type: String, required: true },
		isAdmin: { type: Boolean, required: true, default: false },
		isActive: { type: Boolean, required: true, default: true },
		passwordToken: { type: String, required: false },
		lastLogin: { type: Date, required: false },
		connectionInfos: { type: String, required: false },
	},
	{ timestamps: true, strict: true },
);

export type UserDocument = User & mongoose.Document;

export default mongoose.model<UserDocument>('User', UserSchema, 'users');
