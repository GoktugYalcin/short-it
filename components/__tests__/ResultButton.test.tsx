import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import ResultButton from '../Buttons/ResultButton';

const mockData = {
  hashed_url: 'test_hashed_url',
};

describe('ResultButton', () => {
  it('renders without crashing', () => {
    const { container } = render(<ResultButton data={mockData} />);
    expect(container).toBeInTheDocument();
  });

  it('renders the correct input value', () => {
    const { getByDisplayValue } = render(<ResultButton data={mockData} />);
    const input = getByDisplayValue(`short.gokyalc.in/h/${mockData.hashed_url}`);
    expect(input).toBeInTheDocument();
  });

  it('calls clipboard writeText function on CopyIcon click', () => {
    const writeTextMock = jest.fn();
    global.navigator.clipboard = { writeText: writeTextMock };
    const { getByRole } = render(<ResultButton data={mockData} />);
    const copyIcon = getByRole('button');
    fireEvent.click(copyIcon);
    expect(writeTextMock).toHaveBeenCalledWith(`https://short.gokyalc.in/h/${mockData.hashed_url}`);
  });
});
