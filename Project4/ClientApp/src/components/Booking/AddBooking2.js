import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { event } from 'jquery';
import { useNavigate } from 'react-router-dom';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddBooking2 = () => {
    const [newbooking, setNewBooking] = useState({});
    const [data, setData] = useState([]);

    const [vid,setVId] = useState('');
    const [Cusid,setCusId] = useState('');
    const [ownerid,setOwnerId] = useState('');
    const [  dateofrent,setDateOfRent]=useState('');
    const [  dateofreturn,setDAteOfReturn]=useState('');
    const [  transaction,setTransaction]=useState('');

    const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
 const navigator=useNavigate();
    const totalprice = JSON.parse(localStorage.getItem("price")) * JSON.parse(localStorage.getItem("days"));
    useEffect(() => {
      if(loginstatus == "null")
      {
         navigator("/login");
       }
     setVId(localStorage.getItem("Vehid"));
     setCusId(localStorage.getItem("Cusid"));
     setOwnerId(JSON.parse(localStorage.getItem("Ownid")));
     setDateOfRent(localStorage.getItem("dateofrent"));
     setDAteOfReturn(localStorage.getItem("dateofreturn"));
         }, []);
        
    
      const handleSubmit = event => {
        event.preventDefault();
        axios.post('https://localhost:7075/api/BookingLogs', {
          vehid:vid,
          cusid:Cusid,
          ownid:ownerid,
          dateofrent:dateofrent,
          dateofreturn:dateofreturn,
          price:totalprice,
          transaction:transaction,
          confirm:"No",

        })
          .then(res => {
            setData([...data, res.data]);
            toast.success("Booking added successfully!");
          })
          
          .catch(err =>{
            console.log(err);
            toast.error("Error adding booking.");
          });
      };
    return (
        <div>
          <ToastContainer/>
            <label>Bank account Number 1000187653824</label>
            <label>Name: Roswa Rental</label>
            <div>
            <label>Price</label>
                <input type="number" name='Price' placeholder={totalprice} disabled value={totalprice} />  
                </div>
                <div>
                <label>Transaction</label>
                <input type="text" name='Transaction' placeholder='Please Enter Transaction Number' onChange={(e)=> setTransaction(e.target.value)} />
                <div>
                <button onClick={handleSubmit}>Save</button>
                </div>
                </div>
      </div>
    )
  
}

export default AddBooking2