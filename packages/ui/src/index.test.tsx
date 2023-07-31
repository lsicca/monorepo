import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { MyUser } from '.';

test('renders my user', () => {
	render(<MyUser firstName="Test User" lastName="Name" />);

	expect(screen.getByText('Hello Test User')).toBeInTheDocument();
});
