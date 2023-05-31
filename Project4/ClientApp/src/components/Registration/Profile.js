import React, { useState, useEffect, Fragment,useReducer} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const Profile =() => {
  const [data, setData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const loginstatus = JSON.parse(localStorage.getItem("logstatus"));
  const item = JSON.parse(localStorage.getItem('userid'));
  const navigator = useNavigate();

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
  useEffect(() => {
    if(loginstatus == "null")
    {
       navigator("/login");
     }
      Load()
  },[]);
  const Load = () => {
      axios.get(`https://localhost:7075/api/Users/${item}`)
      .then(res => dispatch(res.data))
      .catch(err => console.log(err));

  };
  const handleEdit = () => {
    console.log(state)
    axios
      .put('https://localhost:7075/api/Users/' + item, {
        userid: item,
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
  const handleInputChange = (e) => {
    dispatch({ [e.target.name]: e.target.value });
  };
  function DeleteBooking() {
      axios.delete("https://localhost:7075/api/Users/" + data.id)
      .then(res => {
          alert("User deleted Successfully");
          navigator("/search");
          localStorage.clear();
          window.location.reload(true); 
      }).catch(err => console.log(err)); 
          }

          return (
<div class="card bg-light border border-primary">
<ToastContainer/>
  <div class="card-header">
    <h5 class="card-title text-primary">User Profile</h5>
  </div>
  <div class="card-body">
    <div class="row">
      <div class="col-md-4">
        <img src="#" class="img-fluid rounded-circle" alt="Profile photo"/>
      </div>
      <div class="col-md-8">
      <label for="username" class="text-primary">User Name</label>
          <input type="text" class="form-control" id="username" name='username' placeholder={state.username}  disabled={!isEditing} onChange={(handleInputChange)} />
          <label for="email" class="text-primary">Email</label>
          <input type="email" class="form-control" id="email" name='email' placeholder={state.email}  disabled={!isEditing} onChange={handleInputChange}/>   
          
          <label for="password" class="text-primary">Password</label>
          <input type="password" class="form-control" id="password" name='password' placeholder={state.password}  disabled={!isEditing} onChange={handleInputChange}/>
        
        
          <label for="firstName" class="text-primary">First Name</label>
          <input type="text" class="form-control" id="firstName" name="firstname" placeholder={state.firstname} disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="lastName" class="text-primary">Last Name</label>
          <input type="text" class="form-control" id="lastName" name="lastname" placeholder={state.lastname}  disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="phoneNumber" class="text-primary">Phone Number</label>
          <input type="text" class="form-control" id="phoneNumber" name="phonenumber" placeholder={state.phonenumber}  disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="dateOfBirth" class="text-primary">Date of Birth</label>
          <input type={isEditing ? "date" : "text"} class="form-control" id="dateOfBirth"  name="dateofbirth" placeholder={state.dateofbirth}   disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="gender" class="text-primary">Gender</label>
          <input type="text" class="form-control" id="gender" name='gender' placeholder={state.gender}  disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="driverLicense" class="text-primary">Driver's License</label>
          <input type="text" class="form-control" id="driverLicense" name="driverlicense"placeholder={state.driverlicense}  disabled={!isEditing} onChange={handleInputChange}/>
          
        
          <label for="role" class="text-primary">Role</label>
          <input type="text" class="form-control" id="role" placeholder={state.role}  disabled onChange={handleInputChange}/>
          
        
        <div className="form-check mt-2">
             <input
                className="form-check-input"
                type="checkbox"
                value=""
                id="flexCheckDefault"
                onChange={() => setIsEditing(!isEditing)}
              />
              <label className="form-check-label" htmlFor="flexCheckDefault">
                Edit User Data
              </label>
        </div>

      </div>
    </div>
    <div class="card-footer">
        <input type="submit" value="Edit" class="btn btn-primary" onClick={handleEdit}/>
      <input type="submit" value="Cancel" class="btn btn-secondary" onClick={DeleteBooking}/>
    </div>
  </div>
</div>


        );
}

export default Profile

function handleEdit() {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.disabled = false;
  });
}
