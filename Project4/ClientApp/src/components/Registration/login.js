import 'react-toastify/dist/ReactToastify.css';
import React, { useState, useEffect } from "react";
import axios from "axios";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import {useNavigate} from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


// This is a functional component named Login
const Login = () => {
  // These are state variables that will be used to store the user input
  const [userData, setUserData] = useState([]);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // Added state for email input validation
  const [passwordError, setPasswordError] = useState(false); // Added state for password input validation

  const navigate = useNavigate(); // This is a hook from the react-router-dom package

  // This function removes all items from local storage
  const clearLocalStorage = () => {
    localStorage.removeItem('email');
    localStorage.removeItem('userId');
    localStorage.removeItem('role');
    localStorage.removeItem('username');
    localStorage.removeItem('logStatus');
  };

  // This hook runs once when the component mounts and calls the clearLocalStorage function 
  useEffect(() => {
    clearLocalStorage();
  }, []);

  // These functions update the state variables email and password when user input changes
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

  // This function sends the user's email and password to the server for authentication
  const handleLogin = () => {
    if (emailError || passwordError) {
      return; // Don't submit form if there are input validation errors
    }
    // Use axios to make a post request to the server
    axios.post('https://localhost:7075/api/Users/Login', { email, password })
      .then((res) => {
        if (res.data == 0) {
          toast.error('Login Failed Check Your Email or PassWord'); // Show error message if login failed
        } else {
          setUserData(res.data); // Update the userData state variable with the response from the server
          userData.map((userData) => { 
            const currentDate = new Date();
            const suspendDate = new Date(userData.suspendDate);
            if (suspendDate < currentDate) {
              if(userData.status == "Active"){
              toast.success('Login Successful'); // Show success message
              localStorage.setItem('email', JSON.stringify(userData.email));
              localStorage.setItem('userid', JSON.stringify(userData.userid));
              localStorage.setItem('role', JSON.stringify(userData.role));
              localStorage.setItem('username', JSON.stringify(userData.username));
              localStorage.setItem('logstatus', JSON.stringify('true')); 
              
                navigate('/search');
                window.location.reload(true);
              }
              else{
                navigate('/login')
                toast.error("Your account is not yet Active")
              }
            }
            else{
              navigate('/login')
              toast.error("You have been Suspended");
            }
          });
        }
      })
      .catch((err) => {
        if (err.response.status === 401) {
          toast.error('Wrong data'); // Show error message if there are server errors
        } else {
          console.log(err); // Log any other errors to the console
        }
      });
  };

  // This function assigns user data to local storage
// This function assigns user data to local storage
const dataAssign = () => {
  userData.forEach((user) => { 
    const currentDate = new Date();
    const suspendDate = new Date(user.suspendDate);
    if (suspendDate < currentDate) {
      localStorage.setItem('email', JSON.stringify(user.email));
      localStorage.setItem('userid', JSON.stringify(user.userid));
      localStorage.setItem('role', JSON.stringify(user.role));
      localStorage.setItem('username', JSON.stringify(user.username));
      localStorage.setItem('logstatus', JSON.stringify('true')); 
      toast.success('Login Successful'); // Show success message
      navigate('/search'); // Navigate to the '/search' page
      window.location.reload(true); // Reload the page
    } else {
      navigate('/login');
      toast.error('You have been Suspended');
    }
  });
};


  return (
    <>
    <ToastContainer /> 




          <section class="vh-100">
              <div class="container-fluid h-custom">
                  <div class="row d-flex justify-content-center align-items-center h-100">
                      <div class="col-md-9 col-lg-6 col-xl-5">
                          <img src="./image/8357614.jpg"
                              class="img-fluid" alt="Sample image"></img>
                      </div>
                      <div class="col-md-8 col-lg-6 col-xl-4 offset-xl-1">
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

          </section>




      </>







);
}

export default Login;