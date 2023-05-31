import React, { Component, useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import 'bootstrap/dist/css/bootstrap.min.css';
const Registration = () => {

    const [newUser, setNewUser] = useState({});
    const [data, setData] = useState([]);
    const [agreed, setAgreed] = useState(false);
   
    const handleInputChange = event => {
        const { name, value } = event.target;
        setNewUser({ ...newUser, [name]: value });
      };
      const handleAgreeChange = () => {
        setAgreed(!agreed);
      };
      const handleSubmit = event => {
        event.preventDefault();
        if (agreed) {
          const birthDate = new Date(newUser.dateofbirth);
          const now = new Date();
          const age = now.getFullYear() - birthDate.getFullYear();
          const monthDiff = now.getMonth() - birthDate.getMonth();
         
          if (age >= 18) {
            axios.post('https://localhost:7075/api/Users', newUser)
              .then(res => {
                setData([...data, res.data]);
                toast.success("User added successfully!");
              })
              .catch(err => {
                console.log(err);
                toast.error("Error adding user.");
              });
          } else {
            toast.error('You must be at least 18 years old to register.');
          }
        } else {
          toast.error('Please agree to the terms and conditions');
        }
      }; 
    
      
    return (
      <div className="container">
        <ToastContainer/>
      <div className="row">
      <div className="col-sm-9 col-md-6  mx-auto">
      <div className="card border-0 shadow rounded-3 my-5">
      <div className="card-body p-4 p-sm-5">
      <h5 className="card-title text-center mb-5 fw-light fs-5">Sign Up</h5>
      <form>
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInput"  name="username" placeholder="Username" onChange={handleInputChange} />
      <label htmlFor="floatingInput">Username</label>
      </div>
      <div className="d-flex">
      <div className="form-floating mb-3">
      <input type="email" className="form-control" id="floatingInputEmail"  name="email" placeholder="Email address" onChange={handleInputChange} />
      <label htmlFor="floatingInputEmail">Email address</label>
      </div>
      <div className="form-floating mb-3">
      <input type="password" className="form-control" id="floatingInputPassword"  name="password" placeholder="Password" onChange={handleInputChange} />
      <label htmlFor="floatingInputPassword">Password</label>
      </div>
      </div>
      <div className="d-flex">
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInputFirstname"  name="firstname" placeholder="Firstname" onChange={handleInputChange} />
      <label htmlFor="floatingInputFirstname">Firstname</label>
      </div>
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInputLastname"  name="lastname" placeholder="Lastname" onChange={handleInputChange} />
      <label htmlFor="floatingInputLastname">Lastname</label>
      </div>
      </div>
      <div className="d-flex">
      <div className="form-floating mb-3">
      <input type="text" className="form-control" id="floatingInputPhonenumber"  name="phonenumber" placeholder="Phonenumber" onChange={handleInputChange} />
      <label htmlFor="floatingInputPhonenumber">Phonenumber</label>
      </div>
      <div className="form-floating mb-3">
      <input type="date" className="form-control" id="floatingInputDateofbirth"  name="dateofbirth" placeholder="Dateofbirth" onChange={handleInputChange} />
      <label htmlFor="floatingInputDateofbirth">Dateofbirth</label>
      </div>
      </div>
      <div className="d-flex">
      <div className="form-floating mb-3">
      <form>
      <label>Gender</label>
      <input type="radio" id='male' name='gender' value={'Male'} onChange={handleInputChange} />
      <label htmlFor='male'>Male</label>
      <input type="radio" id='female' name='gender' value={'Female'} onChange={handleInputChange} />
      <label htmlFor='female'>Female</label>
      </form>
      </div>
      <div className="form-floating mb-3">
      <form>
      <label>Role</label>
      <input type="radio" id='owner' name='role' value={'Owner'} onChange={handleInputChange} />
      <label htmlFor='owner' >Owner</label>
      <input type="radio" id='customer' name='role' value={'Customer'} onChange={handleInputChange} />
      <label htmlFor='customer'>Customer</label>
      </form>
      </div>
      </div>
      <div>
        <input type="checkbox" id="agreement" name="agreement" checked={agreed} onChange={handleAgreeChange} />
        <label htmlFor="agreement">I agree to the terms and conditions</label>
      </div>
      <div className="d-grid">
      <input className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" value="Register" onClick={handleSubmit} />
      </div>
      </form>
        </div>
      </div>
    </div>
  </div>
</div>

  
    );
  
};

export default Registration