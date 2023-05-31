import React, { useState, useEffect, Fragment} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import "./searc.css";

const View = () => {
    const [vehicles, setVehicles] = useState([]);
    const userId = JSON.parse(localStorage.getItem('userid'));
    const loginStatus = JSON.stringify(localStorage.getItem('logstatus'));
    const navigator = useNavigate();
  
    useEffect(() => {
      if (loginStatus === 'null') {
        navigator('/login');
      }
      loadVehicles();
    }, []);
  
    function loadVehicles() {
      axios
        .get(`https://localhost:7075/api/Vehicles/${userId}`)
        .then((result) => {
          setVehicles(result.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    function deleteVehicle(id) {
      axios
        .delete(`https://localhost:7075/api/Vehicles/${id}`)
        .then(() => {
          alert('Vehicle deleted successfully');
          loadVehicles();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    function handleData(vehicle) {
      const {
        id,
        year,
        type,
        brand,
        color,
        price,
        availabilityDate,
        ownerId,
        plateNo,
        status,
        vehiclePhoto,
      } = vehicle;
  
      localStorage.setItem('data', JSON.stringify(id));
      localStorage.setItem('year', JSON.stringify(year));
      localStorage.setItem('type', JSON.stringify(type));
      localStorage.setItem('brand', JSON.stringify(brand));
      localStorage.setItem('color', JSON.stringify(color));
      localStorage.setItem('price', JSON.stringify(price));
      localStorage.setItem('availabilitydate', JSON.stringify(availabilityDate));
      localStorage.setItem('ownerid', JSON.stringify(ownerId));
      localStorage.setItem('plateno', JSON.stringify(plateNo));
      localStorage.setItem('status', JSON.stringify(status));
      localStorage.setItem('veliclephoto', JSON.stringify(vehiclePhoto));
    }
  
    return (

        <Fragment>
            {vehicles.map((vehicle, index) => (

                <div className="qo">
                    <div key={index} class=" card" >
                        <div class="row no-gutters">
                            <div class="col-sm-3">
                                <h5 class="card-title"> Year:{vehicle.year}</h5>
                            </div>
                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h5 class="card-title"> Type: {vehicle.type}</h5>

                                </div>
                            </div>
                           

                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h6 class="card-text"> Brand:{vehicle.brand}</h6>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h6 class="card-text"> Color:{vehicle.color}</h6>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <h5 class="card-title"> Price: {vehicle.price}</h5>

                            </div>
                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h5 class="card-title"> Plate: {vehicle.plateNo}</h5>

                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h6 class="card-text"> Status: {vehicle.status}</h6>
                                </div>
                            </div>
                            <div class="col-sm-3">
                                <div class="card-body">

                                    <h6 class="card-text"> AvailabilityDate {vehicle.availabilityDate}</h6>
                                </div>
                            </div>

                        </div>
                        <div class="card-footer">
                            <a href="/editvehicle">
                                <input
                                    type="submit"
                                    value="Edit"
                                    onClick={() => handleData(vehicle)}
                                />
                            </a>
                            <input
                                type="submit"
                                value="Delete"
                                onClick={() => deleteVehicle(vehicle.id)}
                            />
                        </div>
                    </div>
                </div>





            ))}


        </Fragment>



    );
  };
  
export default View;