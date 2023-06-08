import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./searc.css";
const EmployeeView =() => {
  const [data, setData] = useState([]);

  
  const navigator = useNavigate();
  useEffect(() => {
      Load()
  },[]);
  const Load = () => {
      axios.get(`https://localhost:7075/api/Users/Confirm/${"Employee"}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));

  };
  function DeleteBooking(id) {
      axios.delete("https://localhost:7075/api/Users/" + id)
      .then(res => {
          alert("User deleted Successfully");
          navigator("/search");
          localStorage.clear();
          window.location.reload(true); 
      }).catch(err => console.log(err)); 
          }

          return (
              <Fragment>
                  {data.map((data, index) => (

                      <div className="qo">
                          <div key={index} class=" card" >
                              <div class="row no-gutters">
                                  <div class="col-sm-3">
                                      <h5 class="card-title"> user: {data.username}</h5>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h5 class="card-title"> Email: {data.email}</h5>

                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h6 class="card-text"> FirstName:{data.firstname}</h6>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h6 class="card-text"> LastName:{data.lastname}</h6>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <h5 class="card-title"> Gender: {data.gender}</h5>

                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h5 class="card-title"> Date of Birth: {data.dateofbirth}</h5>

                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h6 class="card-text"> Phone Number: {data.phonenumber}</h6>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <h6 class="card-text"> Role: {data.role}</h6>
                                      </div>
                                  </div>

                              </div>
                              <div class="card-footer">
                                  <a href="/profile">Forgot password?</a>
                              </div>
                          </div>
                      </div>





                  ))}


              </Fragment>
           
        );
}

export default EmployeeView