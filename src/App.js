import './App.css';
import Navbar from './Components/Navbar/Navbar';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'; // Import Navigate from react-router-dom
import ShopCategory from './Pages/ShopCategory';
import Product from './Pages/Product';
import LoginSignup from './Pages/LoginSignup';
import Shop from './Pages/Shop';
import Cart from './Pages/Cart';
import Footer from './Components/Footer/Footer';
import men_banner from './Components/Assets/banner_mens.png'
import women_banner from './Components/Assets/banner_women.png'
import kid_banner from './Components/Assets/banner_kids.png'

function App() {
  const isLoggedIn = !!localStorage.getItem('auth-token'); // Check if user is logged in

  return (
    <div>
      <BrowserRouter>
        <Navbar />
        {/* // now this navbar will be available in the all the Components */}
        <Routes>
          <Route path='/' element={<Shop />} />
          <Route path='/mens' element={<ShopCategory banner={men_banner} category="men" />} />
          <Route path='/womens' element={<ShopCategory banner={women_banner} category="women" />} />
          <Route path='/kids' element={<ShopCategory banner={kid_banner} category="kid" />} />
          <Route path="/product" element={<Product />}>
            <Route path=":productId" element={<Product />} />
          </Route>
          {/* Protect the /cart route by checking the authentication status */}
          <Route path='/cart' element={isLoggedIn ? <Cart /> : <Navigate to="/login" />} />
          <Route path='/login' element={<LoginSignup />} />
        </Routes>

        <Footer/>
      </BrowserRouter>
    </div>
  );
}

export default App;
