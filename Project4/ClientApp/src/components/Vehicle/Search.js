import React, { useState, useEffect, useCallback } from "react";
import Footer from "../Footer";
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

    const paginate = pageNumber => setCurrentPage(pageNumber);
    return (
        <>
        
        <div className="hero">

            <div className="card mx-auto w-75 mt-0 p-5">
                <div className="card-body">
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
                        <input
                            className="btn btn-primary"
                            type="button"
                            value="Search"
                            onClick={handleSearch}
                        />
                    </div>
                </div>
            </div>

        </div>
        <div className="container">
           

            <div className="row">
                <div className="col-md-12">
                        <h2>Cars</h2>

                        <Pagination
                            postsPerPage={postsPerPage}
                            totalPosts={data.length}
                            paginate={paginate}
                        />
                    
                        
                    {isLoading ? (
                        <div>Loading...</div>
                        ) : (
                        <div className="card-columns row-cols-4">
                            {data.map((item) => (
                                <div key={item.id} className="card">
                                    <img src="img/{item.type}" className="card-img-top" alt={""} />
                                    <div className="card-body">
                                        <h5 className="card-title text-primary">{item.type}</h5>
                                        <h5 className="card-title text-primary">{item.brand}</h5>
                                        <p className="card-text">{item.year}</p>
                                        <p className="card-text">{item.color}</p>
                                        <p className="card-text">
                                            <span className="price text-danger">${item.price}</span>
                                        </p>
                                        <p className="card-text">{item.availabilityDate}</p>
                                        <p className="card-text">{item.plateno}</p>
                                        <p className="card-text">{item.ownerid}</p>
                                        <p className="card-text">{item.status}</p>
                                        <p className="card-text">
                                            <a href="/detail">
                                                <img
                                                    src={CAR_IMAGE_URL}
                                                    alt="View Details"
                                                    onClick={() => handleData(item.vid)}
                                                />
                                            </a>
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>


                    )}
                </div>
            </div>


            <div className="container">
                <div className="vo">
                    <h1>Features & Benefits</h1>
                    <h1>____________________</h1>


                    <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-3">
                        <div class="col">
                            <h1> Featuers </h1>
                            <p> * Easy access  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                        </div>

                        <div class="col">
                            <h1> Benfits </h1>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                            <p> * aegsegsrbgsgsgsrgsgsgsgggagaga  </p>
                        </div>

                        <div className="col">
                                <img src="https://mdbcdn.b-cdn.net/img/new/standard/city/043.webp" alt="Los Angeles Skyscrapers" >
                                </img>
                                <img src="../../b" alt="" >
                            </img>
                        </div>
                    </div>
                </div>
            </div>


        </div>
        </>
      

  );
};

export default Search;
