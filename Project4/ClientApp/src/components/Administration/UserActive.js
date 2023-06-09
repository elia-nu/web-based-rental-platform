import { useEffect, useState } from 'react';
import axios from 'axios';
import { ToastContainer,toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function UpdateStatus() {
    const [userData, setUserData] = useState(null);
    const [status, setStatus] = useState("Active");
    const userId = localStorage.getItem('Sid');
  
    useEffect(() => {
      axios.get(`https://localhost:7075/api/Users/${userId}`)
        .then(response => {
            setUserData(response.data);
        })
        .catch(error => console.error(error));
    }, [userId]);
  
    const handleActive = () => {
    axios
    .put('https://localhost:7075/api/Users/' + userId, {
      userid: userId,
      email: userData.email,
      password: userData.password,
      firstname: userData.firstname,
      lastname: userData.lastname,
      phonenumber: userData.phonenumber,
      dateofbirth: userData.dateofbirth,
      gender: userData.gender,
      driverlicense: userData.driverlicense,
      role: userData.role,
      username: userData.username,
      status: "Active",
    })
    .then((res) => {
      console.log(res.data);
      toast.success("User updated successfully!");
    })
    .catch((err) => {
      console.log(err);
      toast.error("Error updating user.");
    });
  }
  return (
    <div>
      {status ? (
        <div>
            
          Status updated to {status}.
        </div>
      ) : (
        <div>Updating status...</div>
      )}
    </div>
  );
}

export default UpdateStatus;