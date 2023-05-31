import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
const ViewBookedVehicle = () => {
  const [data, setData] = useState([]);
  const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
  const navigator=useNavigate();
  const item = JSON.parse(localStorage.getItem('userid'));
  useEffect(() => {
    if(loginstatus == "null")
    {
       navigator("/login");
     }
      Load()
  },[]);
  const Load = () => {
      axios.get(`https://localhost:7075/api/BookingLogs/Ownid/${item}`)
      .then(res => setData(res.data))
      .catch(err => console.log(err));

  };
  function DeleteBooking(id) {
      axios.delete("https://localhost:7075/api/BookingLogs/" + id)
      .then(res => {
          alert("Booking deleted Successfully");
          Load();
      }).catch(err => console.log(err)); 
          }

          return (
            <Fragment>
                 <MDBTable>
                <MDBTableHead>
                    <tr>
                        <th>ID</th>
                        <th>Vehid</th>
                        <th>Cusid</th>
                        <th>Ownid</th>
                        <th>Dateofrent</th>
                        <th>Dateofreturn</th>
                        <th>Price</th>
                        <th>Transaction</th>
                        <th>Confirm</th>
                    </tr>
                </MDBTableHead>
                <MDBTableBody>
                    {
                        data.map((data, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td>{data.vehid}</td>
                                <td>{data.cusid}</td>
                                <td>{data.ownid}</td>
                                <td>{data.dateofrent}</td>
                                <td>{data.dateofreturn}</td>
                                <td>{data.price}</td>
                                <td>{data.transaction}</td>
                                <td>{data.confirm}</td>
                             
                                <td>
                                    <input type="submit" value="Cancel" onClick={()=> DeleteBooking(data.bid)}/>
                                
                                </td>
                            </tr>
                        ))
                    }
                </MDBTableBody>
                 </MDBTable>
    
            </Fragment>
           
        );
}

export default ViewBookedVehicle