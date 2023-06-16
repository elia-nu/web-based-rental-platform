import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./searc.css";
const OwnerView =() => {
  const [data, setData] = useState([]);

  const item = JSON.parse(localStorage.getItem('Userid'));
  const navigator = useNavigate();
  useEffect(() => {
      Load()
  },[]);
  const Load = () => {
      axios.get(`https://localhost:7075/api/Users/Confirm/${"Owner"}`)
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
                                      <p className="card-text"><strong>UserName:</strong> {data.userName}</p>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <p className="card-text"><strong>Email:</strong> {data.email}</p>

                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <p className="card-text"><strong>FirstName:</strong> {data.firstName}</p>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <p className="card-text"><strong>LastName:</strong> {data.lastName}</p>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <p className="card-text"><strong>Gender:</strong> {data.gender}</p>

                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <p className="card-text"><strong>Dateofbirth:</strong> {data.dateofBirth}</p>

                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">

                                          <p className="card-text"><strong>Phonenumber:</strong> {data.phoneNumber}</p>
                                      </div>
                                  </div>
                                  <div class="col-sm-3">
                                      <div class="card-body">
                                          <p className="card-text"><strong>Role:</strong> {data.role}</p>
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

export default OwnerView