import type { Meta, StoryObj } from '@storybook/react';
import { User } from '@lux/types';

import { MyUser } from '.';

const meta: Meta<typeof MyUser> = {
	title: 'My user component',
	component: MyUser,
};

export default meta;

type Story = StoryObj<User>;

export const myUser: Story = {
	args: {
		firstName: 'first',
		lastName: 'user',
	},
	render: (args) => <MyUser {...args} />,
};
