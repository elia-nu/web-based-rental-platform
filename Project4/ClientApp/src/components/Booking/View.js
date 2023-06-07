import React, { Component , useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
const View = () => {
  const [data, setData] = useState([]);
  const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
  const navigator=useNavigate();
    
  useEffect(() => {
    if(loginstatus == "null")
    {
       navigator("/login");
     }
      Load()
  },[]);
   function Load() {
    axios.get(`https://localhost:7075/api/BookingLogs/Confirm/${"Yes"}`)
      .then((result) => {
          setData(result.data);
          console.log(result.data);
      }).catch((err) => {
          console.log(err);
      })
    }
  function DeleteBooking(id) {
      axios.delete("https://localhost:7045/api/BookingLogs/" + id)
      .then(res => {
          alert("Booking deleted Successfully");
          Load();
      }).catch(err => console.log(err)); 
          }
    const handleData = (id) => {
        localStorage.setItem("data",JSON.stringify(id));
    }
      return (
          <Fragment>
              <div class="container">
                  <div class="row">
                      {data.map((data, index) => (
                          <div class="col-lg-4 col-md-6 mb-4" key={index}>
                              <div class="card h-100">
                                  <div class="card-header">
                                      <h5 class="card-title">{data.vehid}</h5>
                                  </div>
                                  <div class="card-body">
                                      <p class="card-text"><strong>Customer ID:</strong> {data.cusid}</p>
                                      <p class="card-text"><strong>Owner ID:</strong> {data.ownid}</p>
                                      <p class="card-text"><strong>Date of Rental:</strong> {data.dateofrent}</p>
                                      <p class="card-text"><strong>Date of Return:</strong> {data.dateofreturn}</p>
                                      <p class="card-text"><strong>Price:</strong> {data.price}</p>
                                      <p class="card-text"><strong>Transaction:</strong> {data.transaction}</p>
                                      <p class="card-text"><strong>Confirmation Status:</strong> {data.confirm}</p>
                                  </div>
                                  <div class="card-footer">
                                      <button class="btn btn-danger" onClick={() => DeleteBooking(data.bid)}>Delete</button>
                                  </div>
                              </div>
                          </div>
                      ))}
                  </div>
              </div>
  
          </Fragment>
         
      );
}

export default View