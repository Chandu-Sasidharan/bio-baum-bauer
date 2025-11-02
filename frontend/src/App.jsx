import { BrowserRouter, Route, Routes } from 'react-router-dom';
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

const queryClient = createQueryClient();

function App() {
  return (
    <BrowserRouter>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <CartProvider>
            <Routes>
              <Route path='/' element={<Layout />}>
                <Route index element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/signup' element={<Signup />} />
                <Route path='/confirm-account' element={<ConfirmAccount />} />
                <Route path='/about' element={<About />} />
                <Route path='/trees' element={<Trees />} />
                <Route path='/trees/:id' element={<TreePage />} />
                <Route path='/impressions' element={<Impressions />} />
                <Route path='/contact' element={<Contact />} />
                <Route path='/privacy' element={<Privacy />} />
                <Route path='/faqs' element={<Faqs />} />
                <Route path='/terms' element={<Terms />} />
                <Route path='/news' element={<News />} />
                <Route path='/cart' element={<Cart />} />
                <Route path='/checkout' element={<CheckoutForm />} />
                <Route path='/payment-status' element={<PaymentStatus />} />
                <Route
                  path='/account'
                  element={
                    <ProtectedRoute>
                      <AccountLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<Profile />} />
                  <Route path='sponsorships' element={<Sponsorship />} />
                </Route>
                <Route path='*' element={<NotFound />} />
              </Route>
            </Routes>
          </CartProvider>
        </AuthProvider>
      </QueryClientProvider>
    </BrowserRouter>
  );
}

export default App;
