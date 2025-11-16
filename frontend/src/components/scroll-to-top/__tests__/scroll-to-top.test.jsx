import { describe, it, expect, vi } from 'vitest';
import { render, act } from '@testing-library/react';
import ScrollToTopButton from '../index.jsx';

describe('ScrollToTopButton', () => {
  it('renders only after the user scrolls beyond the threshold', () => {
    const { queryByRole } = render(<ScrollToTopButton />);

    expect(queryByRole('link')).toBeNull();

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 200, writable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(queryByRole('link')).toBeInTheDocument();
  });
});
