import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultSection from '../Sections/ResultSection';

describe('ResultSection', () => {
  it('renders without crashing', () => {
    const { container } = render(<ResultSection response={{}} errors={{}} />);
    expect(container).toBeInTheDocument();
  });

  it('renders ResultButton when response has hashed_url', () => {
    const { getByRole } = render(<ResultSection response={{ hashed_url: 'test_hashed_url' }} errors={{}} />);
    expect(getByRole('button')).toBeInTheDocument();
  });

  it('renders ErrorComponent with correct message when there are url errors', () => {
    const { getByText } = render(<ResultSection response={{}} errors={{ url: 'error' }} />);
    expect(getByText('Please give a proper url!')).toBeInTheDocument();
  });

  it('renders ErrorComponent with correct message when response has an error', () => {
    const { getByText } = render(<ResultSection response={{ error: 1 }} errors={{}} />);
    expect(getByText('An error occured.')).toBeInTheDocument();
  });
});
