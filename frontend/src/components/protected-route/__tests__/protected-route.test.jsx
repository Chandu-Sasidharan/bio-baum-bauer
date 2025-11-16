import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import ProtectedRoute from '../index.jsx';

vi.mock('@/context/auth-context', () => ({
  useUser: vi.fn(),
}));

import { useUser } from '@/context/auth-context';

const renderWithRoutes = () =>
  render(
    <MemoryRouter initialEntries={['/account']}>
      <Routes>
        <Route path='/' element={<div>Home</div>} />
        <Route
          path='/account'
          element={
            <ProtectedRoute>
              <div>Private</div>
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>,
  );

describe('ProtectedRoute', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('renders nothing until the session is ready', () => {
    useUser.mockReturnValue({ isAuthenticated: false, isSessionReady: false });

    const { container } = renderWithRoutes();

    expect(container.innerHTML).toBe('');
  });

  it('redirects to home when the user is not authenticated', () => {
    useUser.mockReturnValue({ isAuthenticated: false, isSessionReady: true });

    renderWithRoutes();

    expect(screen.getByText('Home')).toBeInTheDocument();
  });

  it('renders the protected content when authenticated', () => {
    useUser.mockReturnValue({ isAuthenticated: true, isSessionReady: true });

    renderWithRoutes();

    expect(screen.getByText('Private')).toBeInTheDocument();
  });
});
