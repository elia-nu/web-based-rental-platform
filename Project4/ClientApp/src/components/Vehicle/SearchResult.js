import React, { useState, useEffect, useCallback } from "react";
import "./search.css";
import Pagination from '../Pagination';
import axios from "axios";
const VEHICLE_API_URL = "https://localhost:7075/api/Vehicles";
const CAR_IMAGE_URL = "https://i.imgur.com/555555.png";


const SearchResult = (props) => {
  const [data, setData] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [date, setDate] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage,] = useState(10);

  const searchtext= JSON.parse(localStorage.getItem("searchtext"));
  const searchdate= JSON.parse(localStorage.getItem("Searchdate"));
  useEffect(() => {

    handleLoadSearch();
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

  const handleLoadSearch = useCallback(() => {
      setIsLoading(true);
      axios
        .get(`${VEHICLE_API_URL}/Search?search=${searchtext}&date=${searchdate}`)
        .then((res) => setData(res.data))
        .catch((err) => console.log(err))
        .finally(() => {
          setIsLoading(false);
        });
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
            <div className="container-fluid px-0">
                <div className="hero d-flex align-items-center">
                    <div className="card mx-auto w-75 mt-0 p-3 p-md-5 text-center">
                        <h1 className="mb-4">Find Your Dream Car Today</h1>
                        <p className="lead mb-5">
                            Search our inventory of high-quality, pre-owned cars and find the perfect
                            vehicle for your needs and budget.
                        </p>
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

            </div>
        </>
    );
};

export default SearchResult;