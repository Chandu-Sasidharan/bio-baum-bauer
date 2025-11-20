import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NotFound from '@/pages/not-found';
import { renderWithRouter } from '@/test-utils';

const mockNavigate = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('NotFound page', () => {
  beforeEach(() => {
    mockNavigate.mockReset();
  });

  it('explains that the requested page is missing', () => {
    renderWithRouter(<NotFound />, { initialEntries: ['/missing'] });

    expect(screen.getByText(/404/i)).toBeInTheDocument();
    expect(screen.getByText('Die gesuchte Seite existiert nicht.')).toBeInTheDocument();
  });

  it('lets visitors go back to the previous page', async () => {
    const user = userEvent.setup();
    renderWithRouter(<NotFound />, { initialEntries: ['/missing'] });

    await user.click(screen.getByRole('button', { name: /zurück/i }));

    expect(mockNavigate).toHaveBeenCalledWith(-1);
  });
});
