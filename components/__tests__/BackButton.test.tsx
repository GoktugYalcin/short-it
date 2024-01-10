import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import { useRouter } from 'next/navigation';
import BackButton from '../Buttons/BackButton';

jest.mock('next/navigation', () => ({
  useRouter: () => ({
    back: jest.fn(),
  }),
}));

describe('BackButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<BackButton />);
    expect(container).toBeInTheDocument();
  });

  it('calls router.back function on button click', () => {
    const { getByText } = render(<BackButton />);
    const button = getByText('Back');
    fireEvent.click(button);
    expect(useRouter().back).toHaveBeenCalled();
  });
});
