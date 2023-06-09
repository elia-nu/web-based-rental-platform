import React, { useState, useEffect, useCallback } from "react";
import "./search.css";
import Pagination from '../Pagination';
import axios from "axios";
import { toast } from "react-toastify";
import image from "./download.jpg"
import { Container, Card, InputGroup, FormControl, Button } from 'react-bootstrap';
import { useNavigate } from "react-router-dom";
const VEHICLE_API_URL = "https://localhost:7075/api/Vehicles";
const CAR_IMAGE_URL = "/Images/download232817692.jpg";




 


const Search = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,] = useState(10);
    const [vehicleType, setVehicleType] = useState('');
    const navigate = useNavigate();
    useEffect(() => {
        Load();
    }, []);

    const Load = useCallback(() => {
        setIsLoading(true);
        axios
            .get(`${VEHICLE_API_URL}/Available`)
            .then((result) => {
                setData(result.data);
                console.log(result.data);
            })
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                setIsLoading(false);
            });
    }, []);
    const handleSearch = useCallback(() => {
        if (searchText.length > 0 || date.length > 0 || vehicleType.length > 0 ) {
            setIsLoading(true);
            localStorage.setItem("searchtext", JSON.stringify(searchText));
            localStorage.setItem("Searchdate", JSON.stringify(date));
         
            navigate('/searchresult');
        } else {
            Load();
        }
    }, [searchText, date, Load]);


    const handleData = useCallback((id) => {
        localStorage.setItem("data", JSON.stringify(id));
    }, []);

    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = data.slice(indexOfFirstPost, indexOfLastPost);

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber);
    };
    const handleVehicleTypeChange = useCallback((event) => {
        setVehicleType(event.target.value);
    }, []);

    const handleCategorySearch = useCallback(
        (type) => {
            setIsLoading(true);
            axios
                .get(`${VEHICLE_API_URL}/Catagory`, {
                    params: {
                        type: type,
                    },
                })
                .then((result) => {
                    setData(result.data);
                })
                .catch((err) => {
                    console.log(err);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        },
        [setData]
    );

    return (
        <>
            <a
                href="/detail"
                className="btn"
                onClick={() => handleCategorySearch(SUV)}
            >
                SUV
            </a><a
                href="/detail"
                className="btn"
                onClick={() => handleCategorySearch(Truck)}
            >
                TRUCK
            </a><a
                href="/detail"
                className="btn"
                onClick={() => handleCategorySearch(mini - cuop)}
            >
                cuop
            </a><a
                href="/detail"
                className="btn"
                onClick={() => handleCategorySearch(minivan)}
            >
                MINIVAN
            </a>
            <a
                href="/detail"
                className="btn"
                onClick={() => handleCategorySearch(van)}
            >
                VAN
            </a>
  
            
                <InputGroup className="mb-3">
                    <FormControl
                        placeholder="Search vehicle by name"
                        aria-label="Search vehicle by name"
                        aria-describedby="basic-addon2"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <FormControl
                        type="date"
                        placeholder="Pickup date"
                        aria-label="Pickup date"
                        aria-describedby="basic-addon2"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                   
                    <Button
                        variant="outline-secondary"
                        id="button-addon2"
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </InputGroup>

            <div className="container py-5">
                <h2 className="text-center mb-4">Browse Our Selection of Cars</h2>
                {isLoading ? (
                    <div>Loading...</div>
                ) : (
                        <div className="card-grid">
                            {currentPosts.map((item) => (
                                <div key={item.id} className="card">
                                    <img
                                        src={`./Image/${item.vpath}`}
                                        className="card-img-top"
                                        alt={`Car ${item.vid}`}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{item.brand} {item.type}</h5>
                                        <p className="card-text"><strong>Year:</strong> {item.year}</p>
                                        <p className="card-text">
                                            <strong>Price:</strong> <span className="price">${item.price}</span>
                                        </p>
                                        <p className="card-text"><strong>Availability:</strong> {item.availabilityDate}</p>
                                        <div className="card-footer">
                                            <a
                                                href="/detail"
                                                className="btn"
                                                onClick={() => handleData(item.vid)}
                                            >
                                                Details
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                )}

                <Pagination
                    postsPerPage={postsPerPage}
                    totalPosts={data.length}
                    paginate={paginate}
                />
            </div>
        

        
        </>

        
    );
};

export default Search;
