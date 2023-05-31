import React, { useState } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [isEmailSent, setIsEmailSent] = useState(false);
  const [isCredentialsValid, setIsCredentialsValid] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("https://localhost:7075/api/Users/forgotpassword", {
        username,
        email,
      });

      if (response.data.isValid) {
        setIsCredentialsValid(true);
      } else {
        // Display an error message to the user
      }
    } catch (error) {
      // Handle the error
    }
  };

  if (isCredentialsValid) {
    return navigate('/resetpassword');
  }

  if (isEmailSent) {
    return <p>Check your email for password reset instructions</p>;
  }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Enter your username:
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </label>
      <label>
        Enter your email address:
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </label>
      <button type="submit">Send password reset email</button>
    </form>
  );
}

export default ForgotPassword;
