import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Headliners from '../Sections/Headliners';

describe('Headliners', () => {
  it('renders without crashing', () => {
    const { container } = render(<Headliners />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct text', () => {
    render(<Headliners />);
    expect(screen.getByText('Shorten your links and add if you want to expiry!')).toBeInTheDocument();
    expect(screen.getByText('Also shortlist of your shortened links is on development!')).toBeInTheDocument();
  });
});
