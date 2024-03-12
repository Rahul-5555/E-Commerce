// Import necessary libraries
import React, { useState, useEffect } from 'react';
import './CSS/LoginSignup.css';

// Define LoginSignup component
const LoginSignup = () => {
  const [state, setState] = useState("Login");
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    email: ""
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false); // State to track authentication status

  useEffect(() => {
    // Check if user is already authenticated
    const authToken = localStorage.getItem('auth-token');
    if (authToken) {
      setIsLoggedIn(true); // Update isLoggedIn state if user is logged in
    }
  }, []);

  const changeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  const login = async () => {
    console.log("Login Function Executed", formData);
    let responseData;
    await fetch('http://localhost:4000/login', {
      method: "POST",
      headers: {
        Accept: 'application/form-data',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => responseData = data);

    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      setIsLoggedIn(true); // Update isLoggedIn state after successful login
      window.location.replace("/");
    }
    else {
      alert(responseData.error)
    }
  }

  const signup = async () => {
    console.log("Signup Function Executed", formData);
    try {
      const response = await fetch('http://localhost:4000/signup', {
        method: "POST",
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
  
      if (!response.ok) {
        throw new Error('Failed to sign up');
      }
  
      const responseData = await response.json();
  
      if (responseData.success) {
        localStorage.setItem('auth-token', responseData.token);
        setIsLoggedIn(true); // Update isLoggedIn state after successful signup
        alert("You signed up successfully!"); // Changed message here
        window.location.replace("/");
      } else {
        alert(responseData.error || 'You Signup Succesfully');
      }
    } catch (error) {
      console.error("Signup Error:", error);
      alert("An error occurred while signing up. Please try again.");
    }
  }
  


  const addToCart = () => {
    if (!isLoggedIn) { // Check if user is logged in
      alert("Please login to add items to the cart.");
      return;
    }

    // Proceed with adding item to cart logic here
  }

  return (
    <div className='loginsignup' style={{ marginBottom: '200px' }}>
      <div className="loginsignup-container">
        <h1>{state}</h1>
        <div className="loginsingup-fields">{state === "Sign Up" ?
          <input name='username' value={formData.username} onChange={changeHandler} type="text" placeholder='Your Name' /> : <></>}
          <input name='email' value={formData.email} onChange={changeHandler} type="email" placeholder='Email Address' />
          <input name='password' value={formData.password} onChange={changeHandler} type="password" placeholder='Password' />
        </div>
        <button onClick={() => { state === "Login" ? login() : signup() }}>Continue</button>
        {state === "Sign Up" ? <p className="loginsignup-login">Already have an account? <span onClick={() => { setState("Login") }}>Login here</span></p>
          : <p className="loginsignup-login">Create an account? <span onClick={() => { setState("Sign Up") }}>Click here</span></p>}

        <div className="loginsignup-agree">
          <input type="checkbox" name='' id='' />
          <p>By continuing, I agree to the terms of use & privacy policy.</p>
        </div>
      </div>
      {/* Render cart button only if user is logged in */}
      {isLoggedIn && <button onClick={addToCart}>Add to Cart</button>}
    </div>
  );
};

export default LoginSignup;
