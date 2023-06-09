import React, { useReducer, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const EditEmployee = () => {
  const [state, dispatch] = useReducer(
    (prevState, action) => ({ ...prevState, ...action }),
    {
      id: '',
      email: '',
      password: '',
      firstname: '',
      lastname: '',
      phonenumber: '',
      dateofbirth: '',
      gender: '',
      driverlicense: '',
      role: '',
      username: '',
    }
  );

  const loginstatus = JSON.stringify(localStorage.getItem('logstatus'));
  const navigator = useNavigate();

  useEffect(() => {
    if (loginstatus === 'null') {
      navigator('/login');
    }
    dispatch({
      id: JSON.parse(localStorage.getItem('id')),
      email: JSON.parse(localStorage.getItem('email')),
      password: JSON.parse(localStorage.getItem('password')),
      firstname: JSON.parse(localStorage.getItem('firstname')),
      lastname: JSON.parse(localStorage.getItem('lastname')),
      phonenumber: JSON.parse(localStorage.getItem('phonenumber')),
      dateofbirth: JSON.parse(localStorage.getItem('dateofbirth')),
      gender: JSON.parse(localStorage.getItem('gender')),
      driverlicense: JSON.parse(localStorage.getItem('driverlicense')),
      role: JSON.parse(localStorage.getItem('role')),
      username: JSON.parse(localStorage.getItem('username')),
    });
  }, []);

  const handleEdit = () => {
    axios
      .put('https://localhost:7075/api/Users/' + state.id, {
        userid: state.id,
        email: state.email,
        password: state.password,
        firstname: state.firstname,
        lastname: state.lastname,
        phonenumber: state.phonenumber,
        dateofbirth: state.dateofbirth,
        gender: state.gender,
        driverlicense: state.driverlicense,
        role: state.role,
        username: state.username,
      })
      .then((res) => {
        console.log(res.data);
        toast.success("User updated successfully!");
      })
      .catch((err) => {
        console.log(err);
        toast.error("Error updating user.");
      });
  };

  const handleChange = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };

  return (
    <div>
       <ToastContainer/>
      <label>Username</label>
      <input
        type="text"
        name="username"
        onChange={handleChange}
        value={state.username}
      />
      <label>Email</label>
      <input
        type="text"
        name="email"
        onChange={handleChange}
        value={state.email}
      />
      <label>Password</label>
      <input
        type="text"
        name="password"
        onChange={handleChange}
        value={state.password}
      />
      <label>Firstname</label>
      <input
        type="text"
        name="firstname"
        onChange={handleChange}
        value={state.firstname}
      />
      <label>Lastname</label>
      <input
        type="text"
        name="lastname"
        onChange={handleChange}
        value={state.lastname}
      />
      <label>Phone</label>
      <input
        type="text"
        name="phonenumber"
        onChange={handleChange}
        value={state.phonenumber}
      />
      <label>Dateofbirth</label>
      <input
        type="date"
        name="dateofbirth"
        onChange={handleChange}
        value={state.dateofbirth}
      />
      <form>
        <label>Gender</label>
        <input
          type="radio"
          id="male"
          name="gender"
          value="Male"
          onChange={handleChange}
          checked={state.gender === 'Male'}
        />
        <label htmlFor="male">Male</label>
        <input
          type="radio"
          id="female"
          name="gender"
          value="Female"
          onChange={handleChange}
          checked={state.gender === 'Female'}
        />
        <label htmlFor="female">Female</label>
      </form>
      <label>Driverlicense</label>
      <input
        type="text"
        name="driverlicense"
        onChange={handleChange}
        value={state.driverlicense}
      />

      <div>
        <button onClick={handleEdit}>Save</button>
      </div>
    </div>
  );
};


export default EditEmployee