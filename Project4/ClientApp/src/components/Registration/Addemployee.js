import React, { Component, useEffect, useState} from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Addemployee = () => {
  const [newUser, setNewUser] = useState({});
  const [data, setData] = useState([]);
  const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
  const navigator = useNavigate();

  const checkLoginStatus = () => {
    if(loginstatus === "null") {
      navigator("/login");
    }
  }

  useEffect(() => {
    console.log(loginstatus);
    checkLoginStatus();
  })

  const handleInputChange = event => {
    const { name, value } = event.target;
    setNewUser({ ...newUser, [name]: value });
  };

  const handleSubmit = event => {
    event.preventDefault();
    const birthDate = new Date(newUser.dateofbirth);
    const now = new Date();
    const age = now.getFullYear() - birthDate.getFullYear();
    const monthDiff = now.getMonth() - birthDate.getMonth();
    if (age >= 18) {
    const API_URL = 'https://localhost:7075/api/Users';
    axios.post(API_URL, newUser)
      .then(res => {
        setData([...data, res.data])
        toast.success("User added successfully!");
      })
      .catch(err => {
        console.log(err)
        toast.error("Error adding user.")
      });
    } else {
      toast.error('You must be at least 18 years old to register.');
    }
  };

  return (
    <div className="card">
      <ToastContainer/>
      <div className="card-body">
        <h5 className="card-title">Sign Up</h5>
        <form>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="username" name="username" placeholder='Enter username' onChange={handleInputChange} />
              <label htmlFor="username">Username</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="email" className="form-control" id="email" name="email" placeholder='Enter email' onChange={handleInputChange} />
              <label htmlFor="email">Email</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="password" className="form-control" id="password" name="password" placeholder='Enter password' onChange={handleInputChange} />
              <label htmlFor="password">Password</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="firstname" name="firstname" placeholder='Enter first name' onChange={handleInputChange} />
              <label htmlFor="firstname">First Name</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="lastname" name="lastname" placeholder='Enter last name' onChange={handleInputChange} />
              <label htmlFor="lastname">Last Name</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="text" className="form-control" id="phonenumber" name="phonenumber" placeholder='Enter phone number' onChange={handleInputChange} />
              <label htmlFor="phonenumber">Phone Number</label>
            </div>
          </div>
          <div className="form-group">
            <div className="form-floating mb-3">
              <input type="date" className="form-control" id="dateofbirth" name="dateofbirth" placeholder='Enter date of birth' onChange={handleInputChange} />
              <label htmlFor="dateofbirth">Date of Birth</label>
            </div>
          </div>
          <div className="form-group">
            <label>Gender</label>
            <input type="radio" id="male" name="gender" value="Male" onChange={handleInputChange} />
            <label htmlFor="male">Male</label>
            <input type="radio" id="female" name="gender" value="Female" onChange={handleInputChange} />
            <label htmlFor="female">Female</label>
          </div>
          <div className="form-group">
            <label>Role</label>
            <input type="radio" id="employee" name="role" value="Employee" onChange={handleInputChange} />
            <label htmlFor="employee">Employee</label>
          </div>
          <button type="submit" className="btn btn-primary" onClick={handleSubmit}>Save</button>
        </form>
      </div>
    </div>
  )
}

export default Addemployee;