import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Added state for email input validation
  const [passwordError, setPasswordError] = useState(false); // Added state for password input validation

  const navigate = useNavigate();

  const clearLocalStorage = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('logStatus');
  };

  useEffect(() => {
    clearLocalStorage();
  }, []);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    if (!e.target.value.includes('@')) {
      setEmailError(true); // Set email error state if input does not contain '@'
    } else {
      setEmailError(false);
    }
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    if (e.target.value.length < 6) {
      setPasswordError(true); // Set password error state if input length is less than 6 characters
    } else {
      setPasswordError(false);
    }
  };

  const handleLogin = () => {
    if (emailError || passwordError) {
      return; // Don't submit form if there are input validation errors
    }
    axios
      .post('https://localhost:7075/api/Users/Login', { email, password })
      .then((res) => {
        setUserData(res.data); 
        passwordCheck(); 
        toast.success('Login Successful')
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error('Wrong Password');
        } else {
          console.log(err);
        }
      });
  };

  const passwordCheck = () => {
    userData.map((userData) => { 
      localStorage.setItem('email', JSON.stringify(userData.email));
      localStorage.setItem('userid', JSON.stringify(userData.userid));
      localStorage.setItem('role', JSON.stringify(userData.role));
      localStorage.setItem('username', JSON.stringify(userData.username));
      localStorage.setItem('logstatus', JSON.stringify('true')); 
     
      toast.success('Login Successful');
      navigate('/search');
      window.location.reload(true);
    });
  };

  return (
    <>
    <ToastContainer /> 
    <div className="container">
      <div className="row">
        <div className="col-sm-9 col-md-7 col-lg-5 mx-auto">
          <div className="card border-0 shadow rounded-3 my-5">
            <div className="card-body p-4 p-sm-5">
              <h5 className="card-title text-center mb-5 fw-light fs-5">Sign In</h5>
              <form>
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className={`form-control ${emailError ? 'is-invalid' : ''}`} // Add 'is-invalid' class to input if emailError state is true
                    id="floatingInput"
                    placeholder="Email address"
                    onChange={handleEmailChange}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                  {emailError && <div className="invalid-feedback">Please enter a valid email address.</div>} {/* Show error message if emailError state is true */}
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className={`form-control ${passwordError ? 'is-invalid' : ''}`} // Add 'is-invalid' class to input if passwordError state is true
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={handlePasswordChange}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                  {passwordError && <div className="invalid-feedback"> Password must be at least 6 characters.</div>} {/* Show error message if passwordError state is true */}
                  </div>
                  <div className="form-check mb-3">
              <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
              <label className="form-check-label" htmlFor="rememberPasswordCheck">
                Remember password
              </label>
            </div>
            <div className="d-grid">
              <input className="btn btn-primary btn-login text-uppercase fw-bold" type="button" value="Login" onClick={handleLogin} />
              <a href="/forgetpassword">Forgot password?</a>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</div>
</>
);
}

export default Login;