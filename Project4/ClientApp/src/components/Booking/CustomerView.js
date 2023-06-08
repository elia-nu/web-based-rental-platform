import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead ,MDBCard,MDBCardBody,MDBCardTitle,MDBCardText,MDBBtn} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
const CustomerView =() => {
  const [data, setData] = useState([]);


  const navigator = useNavigate();
  useEffect(() => {
      Load()
  },[]);
  const Load = () => {
      axios.get(`https://localhost:7075/api/Users/Confirm/${"Customer"}`)
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
                <MDBCard key={index} className="mb-3">
                  <MDBCardBody>
                    <MDBCardTitle>{data.username}</MDBCardTitle>
                    <MDBCardText>
                      <p> Email: {data.email}</p>
                      <p> First Name: {data.firstname}</p>
                      <p> Last Name: {data.lastname}</p>
                      <p> Phone Number: {data.phonenumber}</p>
                      <p> Date of Birth: {data.dateofbirth}</p>
                      <p> Gender: {data.gender}</p>
                     
                      <p> Role: {data.role}</p>
                    </MDBCardText>
                    <MDBBtn color="danger" onClick={() => DeleteBooking(data.bid)}>
                      Cancel
                    </MDBBtn>
                  </MDBCardBody>
                </MDBCard>
              ))}
            </Fragment>
          );
}

export default CustomerView