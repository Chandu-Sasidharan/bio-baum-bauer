import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';

export const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
      mutations: {
        retry: false,
      },
    },
    logger: {
      log: () => {},
      warn: () => {},
      error: () => {},
    },
  });

export const createQueryClientWrapper = () => {
  const queryClient = createTestQueryClient();
  return ({ children }) => (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export const renderWithRouter = (ui, { initialEntries = ['/'] } = {}) => {
  const Wrapper = ({ children }) => (
    <HelmetProvider>
      <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
    </HelmetProvider>
  );

  return render(ui, { wrapper: Wrapper });
};
