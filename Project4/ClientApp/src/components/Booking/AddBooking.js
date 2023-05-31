import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { event } from 'jquery';
import { useNavigate } from 'react-router-dom';
const AddBooking = () => {
    const [newbooking, setNewBooking] = useState({});
    const [data, setData] = useState([]);
    const [price, setPrice] = useState([]);
    const [vid,setVId] = useState('');
    const [Cusid,setCusId] = useState('');
    const [ownerid,setOwnerId] = useState('');
    const [  dateofrent,setDateOfRent]=useState('');
    const [  dateofreturn,setDateOfReturn]=useState('');
    const [  transaction,setTransaction]=useState('');
    const [  confirm,setConfirm]=useState('');
    const userid = JSON.parse(localStorage.getItem("userid"));
    const vehid = JSON.parse(localStorage.getItem("id"));
    const loginstatus = JSON.stringify(localStorage.getItem("logstatus"));
 const navigator=useNavigate();
    useEffect(() => {
      if(loginstatus == "null")
      {
         navigator("/login");
       }
      setPrice(JSON.parse(localStorage.getItem("price")));
        axios.get(`https://localhost:7075/api/Vehicles/Detail/${vehid}`)
        .then((result) => {
            setData(result.data);
            console.log(result.data);
        }).catch((err) => {
            console.log(err);
        });
       
         }, []);
        
    
      const handleSubmit = () => {
       localStorage.setItem("Vehid",JSON.stringify(vehid));
       localStorage.setItem("Cusid",JSON.stringify(userid));
       localStorage.setItem("Ownid",JSON.stringify(data.ownerid));
       localStorage.setItem("dateofrent",dateofrent);
       localStorage.setItem("dateofreturn",dateofreturn);
       localStorage.setItem("price",JSON.stringify(price));
       const now = new Date();
       const startDate = new Date(dateofrent);
       const endDate = new Date(dateofreturn);
      const diffTime = endDate.getTime() - startDate.getTime();
      const diffDays = Math.floor(diffTime / (1000 * 3600* 24));
      localStorage.setItem("days",JSON.stringify(diffDays));
      };

      
    return (
        <div>
        <div>
        
                <label>Dateofrent</label>
                <input type="date" name='Dateofrent' onChange={(e)=> setDateOfRent(e.target.value)} />
                </div>
                <div>
                <label>Dateofreturn</label>
                <input type="date" name='Dateofreturn' onChange={(e)=>setDateOfReturn(e.target.value)} />
                <label>Price</label>
                <input type="number" name='Price' placeholder={price} disabled value={price} />
                <div>
                <a href='/addbooking2'>
                  <input type="submit" value="Book" onClick={()=>handleSubmit()}/>
                </a>
                </div>
                </div>
      </div>
    )
  
}

export default AddBooking