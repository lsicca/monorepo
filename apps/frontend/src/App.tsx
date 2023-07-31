import { MyUser } from '@lux/ui';
import { User } from '@lux/types';

export const App = () => {
	const user: User = {
		firstName: 'First',
		lastName: 'User',
	};

	return <MyUser {...user} />;
};
