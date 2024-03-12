import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import CartItem from '../Components/DescriptionBox/CartItems/CartItem';

const Cart = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status
  const navigate = useNavigate(); // Get navigate function for programmatic navigation

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      setIsLoggedIn(true); // Update isLoggedIn state if user is logged in
    } else {
      // Redirect to login page if not logged in
      navigate('/login');
    }
  }, [navigate]);

  return (
    <div>
      {isLoggedIn && <CartItem />}
      {/* No need to display any message, user will be redirected to login page */}
    </div>
  );
};

export default Cart;
