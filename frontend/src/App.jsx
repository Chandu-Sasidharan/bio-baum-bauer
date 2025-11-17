import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import createQueryClient from '@/utils/create-query-client';
import { CartProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import ProtectedRoute from '@/components/protected-route';
import Layout from '@/layout';
import Home from '@/pages/home';
import About from '@/pages/about';
import Trees from '@/pages/trees/tree-list';
import TreePage from '@/pages/trees/tree-page';
import Impressions from '@/pages/impressions';
import Contact from '@/pages/contact';
import Login from '@/pages/auth/login';
import Signup from './pages/auth/signup';
import ConfirmAccount from '@/pages/auth/confirm-account';
import ForgotPassword from '@/pages/auth/forgot-password';
import ResetPassword from '@/pages/auth/reset-password';
import AccountLayout from '@/pages/account';
import Profile from '@/pages/account/profile';
import Sponsorship from '@/pages/account/sponsorship';
import Privacy from '@/pages/privacy';
import Terms from '@/pages/terms';
import CheckoutForm from '@/pages/checkout';
import PaymentStatus from '@/pages/payment-status';
import News from '@/pages/news';
import Faqs from '@/pages/faqs';
import Cart from '@/pages/cart';
import NotFound from '@/pages/not-found';
import { DEFAULT_LANGUAGE } from '@/context/language-context';
import { ROUTES, SUPPORTED_LANGUAGES } from '@/utils/routes';

const queryClient = createQueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route
                index
                element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />}
              />
              {SUPPORTED_LANGUAGES.map(locale => (
                <Route
                  key={locale}
                  path={`/${locale}`}
                  element={<Layout locale={locale} />}
                >
                  <Route index element={<Home />} />
                  <Route path={ROUTES[locale].login} element={<Login />} />
                  <Route path={ROUTES[locale].signup} element={<Signup />} />
                  <Route
                    path={ROUTES[locale].confirmAccount}
                    element={<ConfirmAccount />}
                  />
                  <Route
                    path={ROUTES[locale].forgotPassword}
                    element={<ForgotPassword />}
                  />
                  <Route
                    path={ROUTES[locale].resetPassword}
                    element={<ResetPassword />}
                  />
                  <Route path={ROUTES[locale].about} element={<About />} />
                  <Route path={ROUTES[locale].trees} element={<Trees />} />
                  <Route
                    path={ROUTES[locale].treeDetails}
                    element={<TreePage />}
                  />
                  <Route
                    path={ROUTES[locale].impressions}
                    element={<Impressions />}
                  />
                  <Route path={ROUTES[locale].contact} element={<Contact />} />
                  <Route path={ROUTES[locale].privacy} element={<Privacy />} />
                  <Route path={ROUTES[locale].faqs} element={<Faqs />} />
                  <Route path={ROUTES[locale].terms} element={<Terms />} />
                  <Route path={ROUTES[locale].news} element={<News />} />
                  <Route path={ROUTES[locale].cart} element={<Cart />} />
                  <Route
                    path={ROUTES[locale].checkout}
                    element={<CheckoutForm />}
                  />
                  <Route
                    path={ROUTES[locale].paymentStatus}
                    element={<PaymentStatus />}
                  />
                  <Route
                    path={ROUTES[locale].account}
                    element={
                      <ProtectedRoute>
                        <AccountLayout />
                      </ProtectedRoute>
                    }
                  >
                    <Route index element={<Profile />} />
                    <Route
                      path={ROUTES[locale].sponsorships}
                      element={<Sponsorship />}
                    />
                  </Route>
                  <Route path='*' element={<NotFound />} />
                </Route>
              ))}
              <Route
                path='*'
                element={<Navigate to={`/${DEFAULT_LANGUAGE}`} replace />}
              />
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
