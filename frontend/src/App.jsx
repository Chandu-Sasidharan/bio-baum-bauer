import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClientProvider } from '@tanstack/react-query';
import createQueryClient from '@/utils/create-query-client';
import { CartContextProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import Layout from '@/layout';
import Home from '@/pages/home';
import About from '@/pages/about';
import Trees from '@/pages/trees';
import SingleTreePage from './pages/SingleTreePage';
import Impressions from '@/pages/impressions';
import Contact from '@/pages/contact';
import Login from '@/pages/auth/login';
import Signup from './pages/auth/signup';
import ConfirmAccount from '@/pages/auth/confirm-account';
import AccountLayout from '@/pages/account';
import Profile from '@/pages/account/profile';
import NewsArticle from './pages/NewsArticle';
import Privacy from '@/pages/privacy';
import Terms from '@/pages/terms';
import './assets/styles/PrevNext.css';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import ProtectedRoute from '@/components/protected-route';
import { PatronProvider } from '@/context/PatronContext';
import SponsorShipDetails from './pages/user/SponsorShipDetails';
import Sponsorship from '@/pages/account/sponsorship';
import Checkout from './pages/user/Checkout';
import Order from './pages/user/Order';
import News from './pages/News';
import Faq from './pages/Faq';
import Cart from './pages/user/Cart';
import NotFound from '@/pages/not-found';

function App() {
  const queryClient = createQueryClient();

  return (
    <>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AuthProvider>
            <CartContextProvider>
              <PatronProvider>
                <Routes>
                  <Route path='/' element={<Layout />}>
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/signup' element={<Signup />} />
                    <Route
                      path='/confirm-account'
                      element={<ConfirmAccount />}
                    />
                    <Route path='/about' element={<About />} />
                    <Route path='/trees' element={<Trees />} />
                    <Route path='/trees/:id' element={<SingleTreePage />} />
                    <Route path='/impressions' element={<Impressions />} />
                    <Route path='/privacy' element={<Privacy />} />
                    <Route path='/faq' element={<Faq />} />
                    <Route path='/terms' element={<Terms />} />
                    <Route path='/contact' element={<Contact />} />
                    <Route path='/news' element={<News />} />
                    <Route path='/news/:id' element={<NewsArticle />} />
                    <Route
                      path='/cart'
                      element={
                        <ProtectedRoute>
                          <Cart />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path='/checkout'
                      element={
                        <ProtectedRoute>
                          <Checkout />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path='/order/place_order'
                      element={
                        <ProtectedRoute>
                          <Order />
                        </ProtectedRoute>
                      }
                    />
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

                    <Route
                      path='/success'
                      element={
                        <ProtectedRoute>
                          <SuccessPage />
                        </ProtectedRoute>
                      }
                    />

                    <Route
                      path='/cancel'
                      element={
                        <ProtectedRoute>
                          <CancelPage />
                        </ProtectedRoute>
                      }
                    />
                    <Route
                      path='/sponsorship-details/:id'
                      element={
                        <ProtectedRoute>
                          <SponsorShipDetails />
                        </ProtectedRoute>
                      }
                    />
                    <Route path='*' element={<NotFound />} />
                  </Route>
                </Routes>
              </PatronProvider>
            </CartContextProvider>
          </AuthProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </>
  );
}

export default App;
