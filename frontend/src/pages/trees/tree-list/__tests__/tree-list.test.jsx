import { screen } from '@testing-library/react';
import Trees from '@/pages/trees/tree-list';
import { renderWithRouter } from '@/test-utils';
import useTrees from '@/hooks/use-trees';

vi.mock('@/hooks/use-trees');
vi.mock('@/components/spinner', () => ({
  default: () => <div data-testid='spinner' />,
}));
vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));
vi.mock('../sort-filter-panel', () => ({
  default: () => <div data-testid='sort-filter' />,
}));
vi.mock('../card-grid', () => ({
  default: () => <div data-testid='card-grid' />,
}));
vi.mock('../pagination-controls', () => ({
  default: ({ page }) => (
    <div data-testid='pagination-controls'>Page {page}</div>
  ),
}));
vi.mock('react-awesome-reveal', () => ({
  Fade: ({ children }) => <div data-testid='fade'>{children}</div>,
}));

const mockUseTrees = useTrees;

describe('Trees listing page', () => {
  const renderTrees = () =>
    renderWithRouter(<Trees />, { initialEntries: ['/trees'] });

  it('shows a spinner while the catalogue loads', () => {
    mockUseTrees.mockReturnValue({
      trees: [],
      total: 0,
      isLoading: true,
      error: null,
    });

    renderTrees();

    expect(screen.getByTestId('spinner')).toBeInTheDocument();
  });

  it('renders an error message when the fetch fails', () => {
    mockUseTrees.mockReturnValue({
      trees: [],
      total: 0,
      isLoading: false,
      error: new Error('boom'),
    });

    renderTrees();

    expect(screen.getByText(/Error fetching data/i)).toBeInTheDocument();
  });

  it('shows filters, breadcrumbs, and pagination controls with results', () => {
    mockUseTrees.mockReturnValue({
      trees: [{ _id: 'abc' }],
      total: 20,
      isLoading: false,
      error: null,
    });

    renderTrees();

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(screen.getByTestId('sort-filter')).toBeInTheDocument();
    expect(screen.getByTestId('card-grid')).toBeInTheDocument();
    expect(screen.getAllByTestId('pagination-controls')).toHaveLength(2);
  });
});
