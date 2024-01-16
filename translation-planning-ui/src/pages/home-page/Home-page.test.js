import { render, screen } from '@testing-library/react';
import HomePage from './Home-page';

test('renders learn react link', () => {
  render(<HomePage />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});
