import { FC } from 'react';
import { User } from '@lux/types';

export const MyUser: FC<User> = ({ firstName }) => {
	return <div>Hello {firstName}</div>;
};
