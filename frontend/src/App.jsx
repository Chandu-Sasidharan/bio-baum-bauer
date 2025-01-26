import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { CartContextProvider } from '@/context/cart-context';
import { AuthProvider } from '@/context/auth-context';
import Home from '@/pages/home';
import Trees from './pages/Trees';
import Layout from '@/layout';
import News from './pages/News';
import About from './pages/About';
import Gallery from './pages/Gallery';
import Faq from './pages/Faq';
import Contact from '@/pages/contact';
import Cart from './pages/user/Cart';
import Login from '@/pages/auth/login';
import Signup from './pages/auth/signup';
import ConfirmAccount from '@/pages/auth/confirm-account';
import SingleTreePage from './pages/SingleTreePage';
import NewsArticle from './pages/NewsArticle';
import Checkout from './pages/user/Checkout';
import Order from './pages/user/Order';
import Privacy from './pages/Privacy';
import Terms from './pages/TermsConditions';
import './assets/styles/PrevNext.css';
import SuccessPage from './pages/SuccessPage';
import CancelPage from './pages/CancelPage';
import ProtectedRoute from '@/components/protected-route';
import { PatronProvider } from '@/context/PatronContext';
import SponsorShipDetails from './pages/user/SponsorShipDetails';
import AccountLayout from '@/pages/account';
import Profile from '@/pages/account/profile';
import Sponsorship from '@/pages/account/sponsorship';
import NotFound from '@/pages/not-found';

function App() {
  return (
    <>
      <BrowserRouter>
        <AuthProvider>
          <CartContextProvider>
            <PatronProvider>
              <Routes>
                <Route path='/' element={<Layout />}>
                  <Route index element={<Home />} />
                  <Route path='/trees' element={<Trees />} />
                  <Route path='/trees/:id' element={<SingleTreePage />} />
                  <Route path='/news' element={<News />} />
                  <Route path='/news/:id' element={<NewsArticle />} />
                  <Route path='/privacy' element={<Privacy />} />
                  <Route path='/Terms' element={<Terms />} />
                  <Route path='/about' element={<About />} />
                  <Route path='/gallery' element={<Gallery />} />
                  <Route path='/faq' element={<Faq />} />
                  <Route path='/contact' element={<Contact />} />
                  {/* <Route path="/contributors" element={<Contributors />} /> */}
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
                  <Route path='/login' element={<Login />} />
                  <Route path='/signup' element={<Signup />} />
                  <Route path='/confirm-account' element={<ConfirmAccount />} />
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
      </BrowserRouter>
    </>
  );
}

export default App;
