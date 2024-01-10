import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import CheckBox from '../Buttons/CheckBox';

jest.mock('react-hook-form', () => ({
  useForm: () => ({
    register: jest.fn(),
  }),
}));

describe('CheckBox', () => {
  it('renders without crashing', () => {
    const { container } = render(<CheckBox register={jest.fn()} />);
    expect(container).toBeInTheDocument();
  });

  it('renders checkbox input correctly', () => {
    const { getByRole } = render(<CheckBox register={jest.fn()} />);
    const checkbox = getByRole('checkbox');
    expect(checkbox).toBeInTheDocument();
  });

  it('calls register function on checkbox click', () => {
    const register = jest.fn();
    const { getByRole } = render(<CheckBox register={register} />);
    const checkbox = getByRole('checkbox');
    fireEvent.click(checkbox);
    expect(register).toHaveBeenCalled();
  });
});
