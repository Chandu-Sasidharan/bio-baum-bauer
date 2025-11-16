import { describe, it, expect, vi } from 'vitest';
import { render } from '@testing-library/react';
import AutoScrollToTop from '../index.jsx';

vi.mock('react-router-dom', () => ({
  useLocation: vi.fn(),
}));

import { useLocation } from 'react-router-dom';

describe('AutoScrollToTop', () => {
  it('scrolls to the top whenever the pathname changes', () => {
    const scrollSpy = vi.spyOn(window, 'scrollTo').mockImplementation(() => {});

    useLocation.mockReturnValue({ pathname: '/initial' });
    const { rerender } = render(<AutoScrollToTop />);

    expect(scrollSpy).toHaveBeenCalledWith(0, 0);

    useLocation.mockReturnValue({ pathname: '/next' });
    rerender(<AutoScrollToTop />);

    expect(scrollSpy).toHaveBeenCalledTimes(2);
    scrollSpy.mockRestore();
  });
});
