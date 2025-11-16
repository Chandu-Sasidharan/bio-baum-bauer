import { screen } from '@testing-library/react';
import Privacy from '@/pages/privacy';
import { renderWithRouter } from '@/test-utils';

describe('Privacy page', () => {
  it('walks through the privacy protections Bio Baum Bauer offers', () => {
    renderWithRouter(<Privacy />, { initialEntries: ['/privacy'] });

    expect(
      screen.getByRole('heading', { name: /privacy policy of biobaumbauer/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/ccpa privacy rights/i)).toBeInTheDocument();
    expect(screen.getByText(/gdpr data protection rights/i)).toBeInTheDocument();
  });
});
