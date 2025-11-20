import { screen } from '@testing-library/react';
import Sponsorship from '@/pages/account/sponsorship';
import { renderWithRouter } from '@/test-utils';
import useSponsorships from '@/hooks/use-sponsorships';

vi.mock('@/hooks/use-sponsorships', () => ({
  default: vi.fn(),
}));

vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));

vi.mock('@/pages/account/sponsorship/sponsorship-card', () => ({
  default: ({ sponsorship }) => (
    <div data-testid='sponsorship-card'>{sponsorship.id}</div>
  ),
}));

vi.mock('@/pages/account/sponsorship/sponsorship-empty-state', () => ({
  default: () => <div data-testid='empty-state'>No sponsorships</div>,
}));

const mockUseSponsorships = useSponsorships;

describe('Sponsorship page', () => {
  it('shows a spinner while loading', () => {
    mockUseSponsorships.mockReturnValue({
      sponsorships: [],
      isLoading: true,
      isError: false,
    });

    renderWithRouter(<Sponsorship />);

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('displays an error message when loading fails', () => {
    mockUseSponsorships.mockReturnValue({
      sponsorships: [],
      isLoading: false,
      isError: true,
    });

    renderWithRouter(<Sponsorship />);

    expect(
      screen.getByText(/wir konnten deine patenschaften/i)
    ).toBeInTheDocument();
  });

  it('renders an empty state when no data is returned', () => {
    mockUseSponsorships.mockReturnValue({
      sponsorships: [],
      isLoading: false,
      isError: false,
    });

    renderWithRouter(<Sponsorship />);

    expect(screen.getByTestId('empty-state')).toBeInTheDocument();
  });

  it('lists each sponsorship when data exists', () => {
    mockUseSponsorships.mockReturnValue({
      sponsorships: [{ id: 'sp1' }, { id: 'sp2' }],
      isLoading: false,
      isError: false,
    });

    renderWithRouter(<Sponsorship />);

    expect(screen.getAllByTestId('sponsorship-card')).toHaveLength(2);
  });
});
