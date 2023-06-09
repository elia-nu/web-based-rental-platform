import React, { useState, useEffect, Fragment, useMemo,useCallback} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import EditVehicle from "./EditVehicle";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import "./searc.css";
const Detail = () => {
    const [data, setData] = useState([]);
    const item = useMemo(() => JSON.parse(localStorage.getItem("data")), []);
    const loginstatus = useMemo(
      () => JSON.parse(localStorage.getItem("logstatus")),
      []
    );
    const navigator = useNavigate();
  
    const Load = useCallback(async () => {
      try {
        const result = await axios.get(
          `https://localhost:7075/api/Vehicles/Detail/${item}`
        );
        setData(result.data);
        console.log(result.data);
      } catch (err) {
        console.log(err);
      }
    }, [item]);
  
    useEffect(() => {
      if (loginstatus === null) {
        navigator("/login");
      }
      Load();
    }, [loginstatus, navigator, Load]);
  
    const handleDataBook = (id, price) => {
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("price", JSON.stringify(price));
    };
    const handleDataEdit = (
      id,
      year,
      type,
      brand,
      color,
      price,
      availabilityDate,
      ownerid,
      plateno,
      status,
      veliclePhoto
    ) => {
      localStorage.setItem("id", JSON.stringify(id));
      localStorage.setItem("year", JSON.stringify(year));
      localStorage.setItem("type", JSON.stringify(type));
      localStorage.setItem("brand", JSON.stringify(brand));
      localStorage.setItem("color", JSON.stringify(color));
      localStorage.setItem("price", JSON.stringify(price));
      localStorage.setItem("availabilitydate", JSON.stringify(availabilityDate));
      localStorage.setItem("ownerid", JSON.stringify(ownerid));
      localStorage.setItem("plateno", JSON.stringify(plateno));
      localStorage.setItem("status", JSON.stringify(status));
      localStorage.setItem("veliclephoto", JSON.stringify(veliclePhoto));
    };
    return (
        <Fragment className="su">
            
                <div className="vehicle-card" >
                    <div className="vehicle-card-header">
                        <img
                            src={"./image/sun.jpg"}
                            className="card-img-top"
                            alt={"ww"}
                        />
                    <h5 className="vehicle-card-title">Year: {data.year}</h5>
                    <h5 className="vehicle-card-title">Type: {data.type}</h5>
                    </div>
                    <div className="vehicle-card-body">
                    <h6 className="vehicle-card-text">Brand: {data.brand}</h6>
                    <h6 className="vehicle-card-text">Color: {data.color}</h6>
                    <h5 className="vehicle-card-title">Price: {data.price}</h5>
                    <h6 className="vehicle-card-text">Plate: {data.plateNo}</h6>
                    <h6 className="vehicle-card-text">Status: {data.status}</h6>
                    <h6 className="vehicle-card-text">Availability Date: {data.availabilityDate}</h6>
                    </div>
                    <div className="vehicle-card-footer">
                    <Button variant="primary" onClick={() =>
                        handleDataEdit(
                            data.vid,
                            data.year,
                            data.type,
                            data.brand,
                            data.color,
                            data.price,
                            data.availabilityDate,
                            data.ownerid,
                            data.plateno,
                            data.status,
                            data.veliclePhoto
                        )}>Edit
                    </Button>
                    <Button variant="primary" onClick={() => handleDataBook(data.vid, data.price)}>Book</Button>
                    </div>
                </div>
            ))


        </Fragment>
  ); 
};     
export default Detail;