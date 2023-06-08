import React, { Component, useState} from 'react'
import axios from 'axios'
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from 'react-router-dom';
// Define a functional component called Registration
const Registration = () => {

  // Define three different state variables using the useState hook
  const [newUser, setNewUser] = useState({});
  const [data, setData] = useState([]);
  const [agreed, setAgreed] = useState(false);
const navigator = useNavigate();
  // Define a function to handle input changes, which will be called each time an input field is updated
  const handleInputChange = event => {
      // Destructure the name and value from the event target
      const { name, value } = event.target;
      // Update the newUser state by spreading the existing object and overwriting the value of the input that was changed
      setNewUser({ ...newUser, [name]: value });
    };

    // Define a function to toggle the agreed state, which will be called when the "I agree" checkbox is clicked
    const handleAgreeChange = () => {
      // Toggle the agreed state
      setAgreed(!agreed);
    };

    // Define a function to handle form submission, which will be called when the "Register" button is clicked
    const handleSubmit = event => {
      // Prevent the default form submission behavior
      event.preventDefault();
      // Check if the user has agreed to the terms and conditions
      if (agreed) {
        // Calculate the user's age based on their birthdate
        const birthDate = new Date(newUser.dateofbirth);
        const now = new Date();
        const age = now.getFullYear() - birthDate.getFullYear();
        const monthDiff = now.getMonth() - birthDate.getMonth();

        // If the user is 18 or older, send a POST request to the API to add the new user
        if (age >= 18) {
          const formData = new FormData()
          formData.append("email",newUser.email);
          formData.append("password",newUser.password);
          formData.append("firstname",newUser.firstname);
          formData.append("lastname",newUser.lastname);
          formData.append("phonenumber",newUser.phonenumber);
          formData.append("dateofbirth",newUser.dateofbirth);
          formData.append("gender",newUser.gender);
          formData.append("driverlicense",newUser.driverlicense)
          formData.append("role",newUser.role);
          formData.append("username",newUser.username);
          formData.append("driverlicenses",newUser.driverlicenses);
          formData.append("status","InActive");

          axios.post('https://localhost:7075/api/Users', formData)
            .then(res => {
              // Update the data state by spreading the existing array and adding the new user object to the end
              setData([...data, res.data]);
              // Show a success message using the toast library
              toast.success("User added successfully!");
              navigator("/search")
            })
            .catch(err => {
              // Log any errors to the console
              console.log(err);
              // Show an error message using the toast library
              toast.error("Error adding user.");
            });
        } else {
          // If the user is under 18, show an error message using the toast library
          toast.error('You must be at least 18 years old to register.');
        }
      } else {
        // If the user hasn't agreed to the terms and conditions, show an error message using the toast library
        toast.error('Please agree to the terms and conditions');
      }
    }; 
    const showPreview = e => {
      if (e.target.files && e.target.files[0]) {
          let driverlicenses = e.target.files[0];
          const reader = new FileReader();
          reader.onload = x => {
            setNewUser({
                  ...newUser,
                  driverlicenses,
                  
              })
          }
          reader.readAsDataURL(driverlicenses)
      }
      else {
        setNewUser({
              ...newUser,
              driverlicenses: null,
          
          })
      }
    }
  // Return the JSX for the Registration component
  return (
    <>
      {/* Render the toast container */}
      <ToastContainer/>
      {/* Render the registration form */}
      <div className="card mx-auto">
      <div className="card-body">
      <h5 className="card-title">Sign Up</h5>
      
       
                <div className="form-group">
                  <div className="form-floating mb-3">
                     <input type="text" className="form-control" id="floatingInput"  name="username" placeholder="Username" onChange={handleInputChange} />
                     <label htmlFor="floatingInput">Username</label>
                  </div>
                </div>
       
      
      <div className="row">
           <div className="col-md-6">
                <div className="form-group">
                   <div className="form-floating mb-3">
                      <input type="email" className="form-control" id="floatingInputEmail"  name="email" placeholder="Email address" onChange={handleInputChange} />
                      <label htmlFor="floatingInputEmail">Email address</label>
                    </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                     <div className="form-floating mb-3">
                         <input type="password" className="form-control" id="floatingInputPassword"  name="password" placeholder="Password" onChange={handleInputChange} />
                         <label htmlFor="floatingInputPassword">Password</label>
                     </div>
                </div>
            </div>
      </div>
      <div className="row">
           <div className="col-md-6">
                <div className="form-group">    
                     <div className="form-floating mb-3">
                         <input type="text" className="form-control" id="floatingInputFirstname"  name="firstname" placeholder="Firstname" onChange={handleInputChange} />
                         <label htmlFor="floatingInputFirstname">Firstname</label>
                     </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group">
                     <div className="form-floating mb-3">
                        <input type="text" className="form-control" id="floatingInputLastname"  name="lastname" placeholder="Lastname" onChange={handleInputChange} />
                        <label htmlFor="floatingInputLastname">Lastname</label>
                     </div>
                  </div>
            </div>
      </div>
      <div className="row">
           <div className="col-md-6">
                <div className="form-group"> 
                    <div className="form-floating mb-3">
                         <input type="text" className="form-control" id="floatingInputPhonenumber"  name="phonenumber" placeholder="Phonenumber" onChange={handleInputChange} />
                         <label htmlFor="floatingInputPhonenumber">Phonenumber</label>
                    </div>
                </div>
            </div>
           <div className="col-md-6">
                <div className="form-group"> 
                     <div className="form-floating mb-3">
                         <input type="date" className="form-control" id="floatingInputDateofbirth"  name="dateofbirth" placeholder="Dateofbirth" onChange={handleInputChange} />
                         <label htmlFor="floatingInputDateofbirth">Dateofbirth</label>
                     </div>
                </div>
            </div>
      </div>
      <div className="row">
           <div className="col-md-6">
                <div className="form-group"> 
                     <div className="form-floating mb-3">
                       <form>
                         <label className='pr-5'>Gender</label>
                           <input type="radio" id='male' name='gender' value={'Male'} onChange={handleInputChange} />
                           <label htmlFor='male'>Male</label>
                           <input type="radio" id='female' name='gender' value={'Female'} onChange={handleInputChange} />
                           <label htmlFor='female'>Female</label>
                       </form>
                     </div>
                </div>
            </div>
            <div className="col-md-6">
                <div className="form-group"> 
                   <div className="form-floating mb-3">
                      <form>
                         <label className='pr-5'>Role</label>
                         <input type="radio" id='owner' name='role' value={'Owner'} onChange={handleInputChange} />
                         <label htmlFor='owner' >Owner</label>
                         <input type="radio" id='customer' name='role' value={'Customer'} onChange={handleInputChange} />
                         <label htmlFor='customer'>Customer</label>
                      </form>
                   </div>
                 </div>
             </div>
        </div>
        <div className="col-md-6">
            <div className="form-group">
              <div className="form-floating mb-3">
                <input
                  type="file"
                  id="photo"
                  name="photo"
                  accept="image/*"
                  required
                  onChange={showPreview}
                />
                <label htmlFor="photo">Photo</label>
              </div>
            </div>
          </div>
        <input type="checkbox" id="agreement" name="agreement" checked={agreed} onChange={handleAgreeChange} />
        <label htmlFor="agreement">I agree to the terms and conditions</label>
      <div className="d-grid">
      <input className="btn btn-primary btn-login text-uppercase fw-bold" type="submit" value="Register" onClick={handleSubmit} />
      </div>
      </div>
      </div>
    </>

    );
  
};

export default Registration