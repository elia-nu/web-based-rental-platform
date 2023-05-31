import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EditVehicle = () => {
  const [vehicle, setVehicle] = useState({
    year: '',
    type: '',
    brand: '',
    color: '',
    price: '',
    availabilityDate: '',
    ownerId: '',
    plateNo: '',
    status: '',
    vehiclePhoto: '',
    id: '',
  });

  const navigate = useNavigate();

  useEffect(() => {
    const loginStatus = localStorage.getItem('logstatus');

    if (loginStatus === null) {
      navigate('/login');
    } else {
      setVehicle({
        year: localStorage.getItem('year'),
        type: localStorage.getItem('type'),
        brand: localStorage.getItem('brand'),
        color: localStorage.getItem('color'),
        price: localStorage.getItem('price'),
        availabilityDate: localStorage.getItem('availabilitydate'),
        ownerId: localStorage.getItem('ownerid'),
        plateNo: localStorage.getItem('plateno'),
        status: localStorage.getItem('status'),
        vehiclePhoto: localStorage.getItem('vehiclephoto'),
        id: localStorage.getItem('id'),
      });
    }
  }, []);

  const handleEdit = () => {
    axios
      .put(`https://localhost:7075/api/Vehicles/${vehicle.id}`, {
        ...vehicle,
        vid: vehicle.id,
        ownerid: vehicle.ownerId,
        availabilitydate: vehicle.availabilityDate,
        plateno: vehicle.plateNo,
      })
      .then(() =>  toast.success('Vehicle updated'))
      .catch((err) =>{
        toast.error('Error updating vehicle');
        console.log(err);
      } );
  };

  return (
    <div>
       <ToastContainer />
      <label>Year</label>
      <input
        type="text"
        name="year"
        value={vehicle.year}
        onChange={(e) =>
          setVehicle({ ...vehicle, year: e.target.value })
        }
      />

      <label>Type</label>
      <input
        type="text"
        name="type"
        value={vehicle.type}
        onChange={(e) =>
          setVehicle({ ...vehicle, type: e.target.value })
        }
      />

      <label>Brand</label>
      <input
        type="text"
        name="brand"
        value={vehicle.brand}
        onChange={(e) =>
          setVehicle({ ...vehicle, brand: e.target.value })
        }
      />

      <label>Color</label>
      <input
        type="text"
        name="color"
        value={vehicle.color}
        onChange={(e) =>
          setVehicle({ ...vehicle, color: e.target.value })
        }
      />

      <label>Price</label>
      <input
        type="number"
        name="price"
        value={vehicle.price}
        onChange={(e) =>
          setVehicle({ ...vehicle, price: e.target.value })
        }
      />

      <label>Availability Date</label>
      <input
        type="date"
        name="availabilityDate"
        value={vehicle.availabilityDate}
        onChange={(e) =>
          setVehicle({ ...vehicle, availabilityDate: e.target.value })
        }
      />

      <label>Plate Number</label>
      <input
        type="text"
        name="plateNo"
        value={vehicle.plateNo}
        onChange={(e) =>
          setVehicle({ ...vehicle, plateNo: e.target.value })
        }
      />

      <label>Status</label>
      <input
        type="text"
        name="status"
        value={vehicle.status}
        onChange={(e) =>
          setVehicle({ ...vehicle, status: e.target.value })
        }
      />

      <div>
        <button onClick={handleEdit}>Submit</button>
      </div>
    </div>
  );
};


export default EditVehicle