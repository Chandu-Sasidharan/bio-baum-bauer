import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import TreePage from '@/pages/trees/tree-page';
import { renderWithRouter } from '@/test-utils';
import useOneTree from '@/hooks/use-one-tree';
import { useCart } from '@/context/cart-context';

vi.mock('@/hooks/use-one-tree');
vi.mock('@/context/cart-context');
vi.mock('@/components/breadcrumbs', () => ({
  default: () => <div data-testid='breadcrumbs' />,
}));
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useParams: () => ({ id: 'abc' }),
  };
});

const mockUseOneTree = useOneTree;
const mockUseCart = useCart;

describe('TreePage', () => {
  const renderTreePage = () => renderWithRouter(<TreePage />);

  beforeEach(() => {
    mockUseCart.mockReturnValue({ addTreeToCart: vi.fn() });
  });

  it('shows loading and error states during fetch', () => {
    mockUseOneTree.mockReturnValue({ tree: null, isLoading: true, isError: false });
    renderTreePage();
    expect(screen.getByText(/loading/i)).toBeInTheDocument();

    mockUseOneTree.mockReturnValue({ tree: null, isLoading: false, isError: true });
    renderTreePage();
    expect(screen.getByText(/something went wrong/i)).toBeInTheDocument();
  });

  it('renders the tree details and allows adding the tree to the cart', async () => {
    const user = userEvent.setup();
    const mockTree = {
      _id: 'abc',
      name: 'Blue Spruce',
      price: { $numberDecimal: '55' },
      category: 'Evergreen',
      availableQuantity: 7,
      imageUrl: '/spruce.jpg',
      description: '<p>Deep roots, vibrant needles.</p>',
    };
    const addTreeToCart = vi.fn();
    mockUseCart.mockReturnValue({ addTreeToCart });
    mockUseOneTree.mockReturnValue({
      tree: mockTree,
      isLoading: false,
      isError: false,
    });

    renderTreePage();

    expect(screen.getByTestId('breadcrumbs')).toBeInTheDocument();
    expect(
      screen.getByRole('heading', { level: 1, name: /blue spruce/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/evergreen/i)).toBeInTheDocument();
    const detailRow = screen.getByText(/category:/i).closest('div');
    const stockLabel = within(detailRow).getByText(/stock:/i);
    expect(stockLabel.nextSibling).toHaveTextContent('7');
    expect(
      screen.getByRole('heading', { name: /about blue spruce/i })
    ).toBeInTheDocument();
    expect(screen.getByText(/deep roots/i)).toBeInTheDocument();

    const addButtons = screen.getAllByRole('button', { name: /add to cart/i });
    await user.click(addButtons[0]);
    expect(addTreeToCart).toHaveBeenCalledWith(mockTree);
  });
});
