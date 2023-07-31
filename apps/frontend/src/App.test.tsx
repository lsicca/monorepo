import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { App } from './App';

test('renders my user', () => {
	render(<App />);

	expect(screen.getByText('Hello First')).toBeInTheDocument();
});
