import React from 'react';
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ErrorComponent from '../Sections/ErrorComponent';

describe('ErrorComponent', () => {
  it('renders without crashing', () => {
    const { container } = render(<ErrorComponent message={<span>Test Message</span>} />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct message', () => {
    const { getByText } = render(<ErrorComponent message={<span>Test Message</span>} />);
    expect(getByText('Test Message')).toBeInTheDocument();
  });
});
