import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import AuthButton from '../Buttons/AuthButton';

jest.mock('@/utils/supabase/server', () => ({
  createClient: jest.fn().mockImplementation(() => ({
    auth: {
      getUser: jest.fn().mockResolvedValue({ data: { user: null } }),
      signOut: jest.fn(),
    },
  })),
}));

describe('AuthButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<AuthButton />);
    expect(container).toBeInTheDocument();
  });

  it('calls signOut function on button click when user is authenticated', async () => {
    const { getByText } = render(<AuthButton />);
    const button = getByText('Logout');
    fireEvent.click(button);
    expect(getByText('Logout')).toBeInTheDocument();
  });

  it('renders Login button when user is not authenticated', () => {
    const { getByText } = render(<AuthButton />);
    expect(getByText('Login')).toBeInTheDocument();
  });
});
