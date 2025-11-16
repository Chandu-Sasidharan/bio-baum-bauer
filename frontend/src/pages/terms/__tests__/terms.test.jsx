import { screen } from '@testing-library/react';
import Terms from '@/pages/terms';
import { renderWithRouter } from '@/test-utils';

describe('Terms page', () => {
  it('summarizes the policies visitors must agree to', () => {
    renderWithRouter(<Terms />, { initialEntries: ['/terms'] });

    expect(
      screen.getByRole('heading', { name: /welcome to bio baum bauer/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /cookies/i })
    ).toBeInTheDocument();

    expect(
      screen.getByRole('heading', { name: /license/i })
    ).toBeInTheDocument();
  });
});
