import { screen } from '@testing-library/react';
import Privacy from '@/pages/privacy';
import { renderWithRouter } from '@/test-utils';

describe('Privacy page', () => {
  it('walks through the privacy protections Bio Baum Bauer offers', () => {
    renderWithRouter(<Privacy />, { initialEntries: ['/privacy'] });

    expect(
      screen.getByRole('heading', { name: /datenschutzerklärung von/i })
    ).toBeInTheDocument();

    expect(
      screen.getByText(/ccpa-datenschutzrechte/i)
    ).toBeInTheDocument();
    expect(screen.getByText(/dsgvo-rechte/i)).toBeInTheDocument();
  });
});
