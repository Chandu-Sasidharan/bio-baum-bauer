import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Faqs from '@/pages/faqs';
import { renderWithRouter } from '@/test-utils';
import useFaqs from '@/hooks/use-faqs';

vi.mock('@/hooks/use-faqs');

describe('Faqs page', () => {
  it('shows a loading indicator while FAQs are being fetched', () => {
    useFaqs.mockReturnValue({ faqs: [], isLoading: true, isError: false });

    renderWithRouter(<Faqs />, { initialEntries: ['/faqs'] });

    expect(screen.getByText(/lade faqs/i)).toBeInTheDocument();
  });

  it('displays an error message when the FAQ query fails', () => {
    useFaqs.mockReturnValue({ faqs: [], isLoading: false, isError: true });

    renderWithRouter(<Faqs />, { initialEntries: ['/faqs'] });

    expect(
      screen.getByText(/faqs konnten nicht geladen werden/i)
    ).toBeInTheDocument();
  });

  it('lets visitors read the answers to individual questions', async () => {
    const user = userEvent.setup();
    const faqs = [
      {
        question: 'How do I sponsor a tree?',
        answer: 'Choose your tree and head to the cart.',
      },
      {
        question: 'Where is the farm located?',
        answer: 'In the heart of Southern Germany.',
      },
    ];
    useFaqs.mockReturnValue({ faqs, isLoading: false, isError: false });

    renderWithRouter(<Faqs />, { initialEntries: ['/faqs'] });

    expect(
      screen.getByRole('heading', { name: /häufig gestellte fragen/i })
    ).toBeInTheDocument();

    // First item is open by default
    expect(
      screen.getByText(/Choose your tree and head to the cart./i)
    ).toBeVisible();

    const secondQuestionButton = screen.getByRole('button', {
      name: /where is the farm located/i,
    });
    await user.click(secondQuestionButton);

    expect(
      screen.getByText(/in the heart of southern germany/i)
    ).toBeVisible();
  });
});
