import { screen } from '@testing-library/react';
import Impressum from '@/pages/impressum';
import { renderWithRouter } from '@/test-utils';

describe('Impressum page', () => {
  it('details the legal disclosures visitors expect', () => {
    renderWithRouter(<Impressum />, { initialEntries: ['/impressum'] });

    expect(screen.getByRole('heading', { name: /impressum/i })).toBeInTheDocument();
    expect(
      screen.getByRole('heading', {
        name: /verantwortlich für den inhalt nach § 18 abs\. 2 mstv/i,
      })
    ).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { name: /haftung für inhalte/i })
    ).toBeInTheDocument();
  });
});
