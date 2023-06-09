import React, { useState, useEffect, Fragment } from 'react'
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
                <div key={index} className="card mb-3">
                    <div className="row no-gutters">
                        <div className="col-md-4">
                            <img
                                src={`./Image/${vehicle.vpath}`}
                                className="card-img-top"
                                alt={`Car ${vehicle.vid}`}
                            />
                        </div>
                        <div className="col-md-4">
                            <div className="card-body">
                                <h5 className="card-title">Brand: {vehicle.brand} {vehicle.type}</h5>
                                <p className="card-text">Color: {vehicle.year}</p>
                            </div>
                        </div>
                            <div className="col-md-2">
                                <div className="card-body">
                                    <p className="card-text">Price: {vehicle.price}</p>
                                    <p className="card-text">Plate: {vehicle.plateNo}</p>
                                  
                                </div>
                        </div>
                        <div className="col-md-2">
                            <div className="card-footer">
                                <button className="btn " onClick={() => handleData(vehicle)}>Edit</button>
                                <button className="btn " onClick={() => deleteVehicle(vehicle.id)}>Delete</button>
                            </div>
                        </div>
                     
                       
                        
                    </div>
                 
                </div>
            ))}
        </Fragment>



    );
};

export default View;