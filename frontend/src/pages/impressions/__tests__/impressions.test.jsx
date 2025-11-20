import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Impressions from '@/pages/impressions';
import { renderWithRouter } from '@/test-utils';
import useImpressions from '@/hooks/use-impressions';

vi.mock('@/hooks/use-impressions');
vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));
vi.mock('react-awesome-reveal', () => ({
  Fade: ({ children }) => <div data-testid='fade'>{children}</div>,
}));
vi.mock('../modal', () => ({
  default: ({ image, closeImage }) => (
    <div data-testid='image-modal'>
      <p>{image.title}</p>
      <button type='button' onClick={closeImage}>
        Close
      </button>
    </div>
  ),
}));

const mockUseImpressions = useImpressions;

describe('Impressions page', () => {
  const renderImpressions = () =>
    renderWithRouter(<Impressions />, { initialEntries: ['/impressions'] });

  it('shows a spinner before the gallery loads', () => {
    mockUseImpressions.mockReturnValue({
      impressions: [],
      isLoading: true,
      isError: false,
    });

    renderImpressions();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('notifies visitors when the gallery fails to load', () => {
    mockUseImpressions.mockReturnValue({
      impressions: [],
      isLoading: false,
      isError: true,
    });

    renderImpressions();

    expect(
      screen.getByText(/bilder konnten nicht geladen werden/i)
    ).toBeInTheDocument();
  });

  it('lets small-screen visitors expand the gallery and inspect a photo', async () => {
    const user = userEvent.setup();
    const impressions = Array.from({ length: 7 }).map((_, index) => ({
      title: `Image ${index + 1}`,
      imageUrl: `/image-${index + 1}.jpg`,
    }));
    mockUseImpressions.mockReturnValue({
      impressions,
      isLoading: false,
      isError: false,
    });

    window.innerWidth = 600;

    renderImpressions();

    const toggleButton = await screen.findByRole('button', {
      name: /alle bilder anzeigen/i,
    });
    expect(toggleButton).toBeInTheDocument();

    await user.click(toggleButton);
    expect(
      await screen.findByRole('button', { name: /weniger fotos anzeigen/i })
    ).toBeInTheDocument();

    await user.click(screen.getByRole('img', { name: /image 1/i }));
    expect(screen.getByTestId('image-modal')).toBeInTheDocument();
  });
});
