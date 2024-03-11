import { render, screen } from '@testing-library/react';
import TableContainer from './TableContainer';

test('Renders the table', () => {
  render(<TableContainer />);
  const tableContainer = screen.getByTestId('table-container-id');
  
  expect(tableContainer).toBeVisible();
});