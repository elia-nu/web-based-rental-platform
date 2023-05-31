import React, { useState, useEffect, Fragment, useMemo,useCallback} from 'react'
import axios from 'axios'
import { MDBTable, MDBTableBody, MDBTableHead } from 'mdb-react-ui-kit';
import EditVehicle from "./EditVehicle";
import { useNavigate } from 'react-router-dom';
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
        <MDBTable>
          <MDBTableHead>
            <tr>
              <th>ID</th>
              <th>Year</th>
              <th>Type</th>
              <th>Brand</th>
              <th>Color</th>
              <th>Price</th>
              <th>AvailabilityDate</th>
              <th>Plateno</th>
              <th>Ownerid</th>
              <th>Status</th>
              <th>VeliclePhoto</th>
            </tr>
          </MDBTableHead>
          <MDBTableBody>
            {
              <tr key={data.id}>
                <td>{1}</td>
                <td>{data.year}</td>
                <td>{data.type}</td>
                <td>{data.brand}</td>
                <td>{data.color}</td>
                <td>{data.price}</td>
                <td>{data.availabilityDate}</td>
                <td>{data.plateno}</td>
                <td>{data.ownerid}</td>
                <td>{data.status}</td>
                <td>{data.veliclePhoto}</td>
                <td>
                  <a href="/editvehicle">
                    <input
                      type="submit"
                      value="Edit"
                      onClick={() =>
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
                        )
                      }
                    />
                  </a>
                  <a href="/addbooking">
                    <input
                      type="submit"
                      value="Book"
                      onClick={() => handleDataBook(data.vid, data.price)}
                    />
                  </a>
                </td>
              </tr>
            }
          </MDBTableBody>
        </MDBTable>
      </Fragment>
  ); 
};     
export default Detail;