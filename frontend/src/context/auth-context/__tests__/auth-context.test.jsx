import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook, act, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { AuthProvider, useUser } from '../index.jsx';
import { DEFAULT_LANGUAGE } from '@/context/language-context';
import { buildPathForLocale } from '@/utils/routes';

vi.mock('@/utils/axios', () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
    put: vi.fn(),
  },
}));

vi.mock('@/utils/alert', () => ({
  default: vi.fn(),
}));

vi.mock('@/utils/format-error', () => ({
  default: vi.fn(() => 'Formatted error'),
}));

const navigateMock = vi.fn();

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => navigateMock,
  };
});

import axios from '@/utils/axios';
import showAlert from '@/utils/alert';
import formatError from '@/utils/format-error';

const wrapper = ({ children }) => (
  <MemoryRouter>
    <AuthProvider>{children}</AuthProvider>
  </MemoryRouter>
);

describe('AuthContext', () => {
beforeEach(() => {
  vi.clearAllMocks();
  localStorage.clear();
});

  it('signUpUser shows a success alert when the backend returns 201', async () => {
    axios.post.mockResolvedValueOnce({ status: 201, data: {} });
    const { result } = renderHook(() => useUser(), { wrapper });

    let signUpResult;
    await act(async () => {
      signUpResult = await result.current.signUpUser({
        email: 'test@example.com',
        password: 'secret',
      });
    });

    expect(signUpResult).toBe(false);
    expect(showAlert).toHaveBeenCalledWith(
      'success',
      'Almost there!',
      'Please check your email to confirm your account.',
    );
  });

  it('loginUser surfaces server errors through showAlert', async () => {
    axios.post.mockResolvedValueOnce({
      status: 500,
      data: { message: 'Bad credentials' },
    });
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.loginUser({ email: 'x', password: 'y' });
    });

    expect(showAlert).toHaveBeenCalledWith(
      'error',
      'Login Failed',
      'Bad credentials',
    );
  });

  it('requestPasswordReset displays success messages and handles errors', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: 'Check your inbox' },
    });
    const { result } = renderHook(() => useUser(), { wrapper });

    let success;
    await act(async () => {
      success = await result.current.requestPasswordReset('user@example.com');
    });

    expect(success).toBe(true);
    expect(showAlert).toHaveBeenCalledWith(
      'success',
      null,
      'Check your inbox',
    );

    axios.post.mockRejectedValueOnce(new Error('network'));
    formatError.mockReturnValueOnce('Formatted error');
    await act(async () => {
      success = await result.current.requestPasswordReset('user@example.com');
    });
    expect(success).toBe(false);
    expect(showAlert).toHaveBeenCalledWith(
      'error',
      'Password Reset Failed',
      null,
      'Formatted error',
    );
  });

  it('confirmAccount updates the user and navigates on success', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { user: { _id: 'user-1', email: 'confirm@example.com' } },
    });
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.confirmAccount('token');
    });

    expect(result.current.authUser).toEqual({
      _id: 'user-1',
      email: 'confirm@example.com',
    });
    expect(navigateMock).toHaveBeenCalledWith(
      buildPathForLocale(DEFAULT_LANGUAGE, 'account')
    );
  });

  it('updateUser shows success toast and updates authUser', async () => {
    axios.put.mockResolvedValueOnce({
      status: 200,
      data: { user: { _id: 'user-1', firstName: 'Updated' } },
    });
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      await result.current.updateUser({ firstName: 'Updated' });
    });

    expect(result.current.authUser).toEqual({
      _id: 'user-1',
      firstName: 'Updated',
    });
    expect(showAlert).toHaveBeenCalledWith(
      'success',
      null,
      'Your account has been updated!',
    );
  });

  it('resetPassword relays API responses via alerts', async () => {
    axios.post.mockResolvedValueOnce({
      status: 200,
      data: { message: 'Password updated successfully' },
    });
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(async () => {
      const success = await result.current.resetPassword({
        token: 'abc',
        password: 'new-pass',
      });
      expect(success).toBe(true);
    });

    axios.post.mockRejectedValueOnce(new Error('network'));
    formatError.mockReturnValueOnce('Formatted error');
    await act(async () => {
      const success = await result.current.resetPassword({
        token: 'abc',
        password: 'new-pass',
      });
      expect(success).toBe(false);
    });
  });

  it('handleLogout clears the session and shows confirmation', async () => {
    axios.post.mockResolvedValueOnce({ status: 200 });
    const { result } = renderHook(() => useUser(), { wrapper });

    await act(() => {
      result.current.setAuthUser({ _id: 'user-1', email: 'user@example.com' });
      localStorage.setItem(
        'userSession',
        JSON.stringify({ _id: 'user-1', expiresAt: Date.now() + 60000 }),
      );
    });

    await act(async () => {
      await result.current.handleLogout();
    });

    await waitFor(() => expect(result.current.authUser).toBeNull());
    expect(localStorage.getItem('userSession')).toBeNull();
    expect(showAlert).toHaveBeenCalledWith(
      'success',
      null,
      'You have been logged out!',
    );
  });
});
