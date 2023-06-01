import React, { useState, useEffect, useCallback } from "react";
import "./search.css";
import Pagination from '../Pagination';
import axios from "axios";
const VEHICLE_API_URL = "https://localhost:7075/api/Vehicles";
const CAR_IMAGE_URL = "https://i.imgur.com/555555.png";


const Search = () => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,] = useState(10);
  
  useEffect(() => {
    Load();
  }, []);

  const Load = useCallback(() => {
    setIsLoading(true);
    axios
      .get(VEHICLE_API_URL)
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
    if (searchText.length > 0 || date.length > 0) {
      setIsLoading(true);
      axios
        .get(`${VEHICLE_API_URL}/Search?search=${searchText}&date=${date}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
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
    return (
        <>
            <section class="hero1">
                <div class="container">
                    <h1 class="hero-title">Welcome to Zeus Car Rental</h1>
                    <p class="hero-description">Rent the car of your dreams today!</p>
                    <div className="hero d-flex align-items-center">
                        <div className="card mx-auto w-75 mt-0 p-3 p-md-5 text-center">
                            <h1 className="mb-4">Find Your Dream Car Today</h1>
                         
                            <div className="input-group">
                                <input
                                    type="search"
                                    className="form-control rounded"
                                    id="search"
                                    placeholder="Search cars..."
                                    aria-label="Search"
                                    aria-describedby="search-addon"
                                    onChange={(e) => setSearchText(e.target.value)}
                                />
                                <input
                                    type="date"
                                    className="form-control rounded"
                                    placeholder="Date"
                                    aria-label="Date"
                                    aria-describedby="search-addon"
                                    onChange={(e) => setDate(e.target.value)}
                                />
                                <button
                                    className="btn btn-primary rounded"
                                    type="button"
                                    onClick={handleSearch}
                                >
                                    Search
                                </button>
                            </div>
                        </div>
                    </div>

                
                </div>
            </section>

            <div className="vo1 py-5">
                <div className="container">
                    <h1 className="text-center">Features &amp; Benefits</h1>
                    <hr className="mb-5" />

                    <div className="row gx-4 gx-md-5">
                        <div className="col-12 col-md-6 col-lg-4">
                            <h2 className="text-center">Convenient and</h2>
                            <h3 className="text-center">Affordable</h3>
                            <ul>

                                Our platform offers customers
                                convenient and affordable car
                                rental options, with a variety of
                                cars to choose from at
                                competitive prices.
                            </ul>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4">
                            <h2 className="text-center">Easy to List</h2>
                            <h3 className="text-center">Cars</h3>
                            <ul>

                                Our platform makes it easy
                                for car owners to list their
                                cars and manage their
                                availability, pricing, and other
                                details.

                            </ul>
                        </div>

                        <div className="col-12 col-md-6 col-lg-4 bg-suc">
                            <h2 className="text-center">Additional Income </h2>
                            <ul>

                                Car owners can earn extra
                                income by renting their cars
                                on our platform, making their
                                cars more profitable and
                                useful.

                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            <div className="container-fluid px-0">

                
               
                <div className="container py-5">
                    <h2 className="text-center mb-4">Cars</h2>
                    {isLoading ? (
                        <div>Loading...</div>
                    ) : (
                        <div className="row row-cols-1 row-cols-md-2 g-4">
                                {currentPosts.map((item) => (
                                <div key={item.id} className="col-12 col-md-6 col-lg-4">
                                    <div className="card mb-4">
                                        <img
                                            src={`./img/${item.vpath}`}
                                            className="card-img-top"
                                            alt={`Car ${item.vid}`}
                                        />
                                        <div className="card-body">
                                            <h5 className="card-title text-primary">{item.type}</h5>
                                            <h5 className="card-title text-primary">{item.brand}</h5>
                                            <p className="card-text">{item.year}</p>
                                            <p className="card-text">{item.color}</p>
                                            <p className="card-text">
                                                <span className="price text-danger">${item.price}</span>
                                            </p>
                                            <p className="card-text">{item.availabilityDate}</p>
                                            <div className="card-footer">
                                                <a
                                                    href="/detail"
                                                    className="btn btn-dark"
                                                    onClick={() => handleData(item.vid)}
                                                >
                                                    Detail
                                                </a>
                                            </div>
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
                <section class="about-us py-5">
                    <div class="container">
                        <h2 class="section-title">About Zeus Car Rental</h2>
                        <div class="row">
                            <div class="col-md-6">
                                <p>Zeus Car Rental is a leading car rental company that offers a wide range of vehicles for rent. We have been in the business for over 10 years and have built a reputation for providing exceptional service and quality vehicles.</p>
                                <p>Our mission is to provide our customers with the best car rental experience possible. We offer competitive prices, flexible rental options, and a variety of vehicle types to choose from.</p>
                            </div>
                            <div class="col-md-6">
                                <img src="img/about.jpg" alt="Zeus Car Rental" class="img-fluid"></img>
                            </div>
                        </div>
                    </div>
                </section>
               
            </div>
        </>
    );
};

export default Search;
