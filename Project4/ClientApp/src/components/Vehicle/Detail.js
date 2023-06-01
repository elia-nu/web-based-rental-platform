import React, { useState, useEffect, Fragment, useMemo,useCallback} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import EditVehicle from "./EditVehicle";
import { useNavigate } from 'react-router-dom';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
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
      <Fragment>
  
         
   

            <Card className="car-details">
                <Card.Img variant="top" src="/img/sun.jpg" alt={`${data.type} ${data.type}`} />
                <Card.Body>
                    <Card.Title>{data.type} {data.brand}</Card.Title>
                    <Card.Text>
                        <ul>
                            <li><strong>Year:</strong> {data.color}</li>
                            <li><strong>Price:</strong> ${data.year}</li>
                            <li><strong>Color:</strong> {data.availabilityDate}</li>
                            <li><strong>Mileage:</strong> {data.price} miles</li>
                            <li><strong>Description:</strong> {data.plateno}</li>
                        </ul>
                    </Card.Text>
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
                </Card.Body>
            </Card>

      </Fragment>
  ); 
};     
export default Detail;