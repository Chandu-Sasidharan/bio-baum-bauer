import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Contact from '@/pages/contact';
import { renderWithRouter } from '@/test-utils';
import { DEFAULT_LANGUAGE } from '@/constants';
import { buildPathForLocale } from '@/utils/routes';

describe('Contact page', () => {
  const renderContact = () =>
    renderWithRouter(<Contact />, { initialEntries: ['/contact'] });

  it('shows the primary contact information and ways to reach the team', () => {
    renderContact();

    expect(
      screen.getByRole('heading', { name: /kontakt/i })
    ).toBeInTheDocument();

    expect(screen.getByText(/Schulgasse 9/i)).toBeVisible();
    expect(screen.getByText(/Brackenheim/i)).toBeVisible();
    expect(screen.getByText(/\+49/)).toBeVisible();

    const emailLink = screen.getByRole('link', {
      name: /hello@biobaumbauer.de/i,
    });
    expect(emailLink).toHaveAttribute(
      'href',
      'mailto:hello@biobaumbauer.de'
    );
  });

  it('offers a contact form with policy acknowledgement and the embedded map', async () => {
    const user = userEvent.setup();
    renderContact();

    expect(
      screen.getByRole('link', { name: /allgemeinen geschäftsbedingungen/i })
    ).toHaveAttribute(
      'href',
      buildPathForLocale(DEFAULT_LANGUAGE, 'terms')
    );

    const submitButton = screen.getByRole('button', {
      name: /nachricht senden/i,
    });
    expect(submitButton).toBeEnabled();

    const map = screen.getByLabelText(/google maps standort/i);
    expect(map).toBeInTheDocument();

    const agreementCheckbox = screen.getByRole('checkbox');
    await user.click(agreementCheckbox);
    expect(agreementCheckbox).toBeChecked();
  });
});
