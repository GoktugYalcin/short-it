import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { checkPattern } from '@/utils/UrlPattern';
import Inputs from '../Sections/Inputs';

jest.mock('axios');
jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
    formState: { errors: {} },
    handleSubmit: jest.fn((fn) => fn),
    reset: jest.fn(),
  }),
}));
jest.mock('@/utils/UrlPattern', () => ({
  checkPattern: jest.fn(),
}));

describe('Inputs', () => {
  it('renders without crashing', () => {
    const { container } = render(<Inputs />);
    expect(container).toBeInTheDocument();
  });

  it('submits form with correct data', async () => {
    const mockUrl = 'http://test.com';
    axios.post.mockResolvedValue({ data: { response: { data: {} } } });
    const { getByRole } = render(<Inputs />);
    const input = getByRole('textbox');
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: mockUrl } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith('/link', { url: mockUrl });
    });
  });

  it('handles form submission error', async () => {
    axios.post.mockRejectedValue(new Error());
    const { getByRole, getByText } = render(<Inputs />);
    const input = getByRole('textbox');
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: 'http://test.com' } });
    fireEvent.click(button);

    await waitFor(() => {
      expect(getByText('An error occured.')).toBeInTheDocument();
    });
  });

  it('handles invalid url', () => {
    checkPattern.mockReturnValue(false);
    const { getByRole, getByText } = render(<Inputs />);
    const input = getByRole('textbox');
    const button = getByRole('button');

    fireEvent.change(input, { target: { value: 'invalid_url' } });
    fireEvent.click(button);

    expect(getByText('Please give a proper url!')).toBeInTheDocument();
  });
});
