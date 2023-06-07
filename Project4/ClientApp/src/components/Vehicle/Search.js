import React, { useState, useEffect, useCallback } from "react";
import "./search.css";
import Pagination from '../Pagination';
import axios from "axios";
import SearchResult from './SearchResult';
import { toast } from "react-toastify";


import { useNavigate } from "react-router-dom";
const VEHICLE_API_URL = "https://localhost:7075/api/Vehicles";



const Search = () => {
    const [data, setData] = useState([]);
    const [searchText, setSearchText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [date, setDate] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage,] = useState(10);
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
        if (searchText.length > 0 || date.length > 0) {
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
    return (
        <>
            <section class="hero1">
                <div class="container">
                    <h1 class="hero-title">Rent the Car of Your Dreams Today</h1>
                    <p class="hero-description">Find the perfect car for your trip</p>
                    <div class="hero d-flex align-items-center">
                        <div class="card mx-auto w-75 mt-0 p-3 p-md-5 text-center">
                            <h2 class="mb-4">Search for Your Dream Car</h2>
                            <form>
                                <div class="input-group">
                                    <input
                                        type="search"
                                        class="form-control rounded"
                                        id="search"
                                        placeholder="Search cars..."
                                        aria-label="Search"
                                        aria-describedby="search-addon"
                                        onChange={(e) => setSearchText(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        class="form-control rounded"
                                        placeholder="Pickup Date"
                                        aria-label="Pickup Date"
                                        aria-describedby="search-addon"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <input
                                        type="date"
                                        class="form-control rounded"
                                        placeholder="Return Date"
                                        aria-label="Return Date"
                                        aria-describedby="search-addon"
                                        onChange={(e) => setDate(e.target.value)}
                                    />
                                    <button
                                        class="btn btn-primary rounded"
                                        type="button"
                                        onClick={handleSearch}
                                    >
                                        Search
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </section>


            
            <SearchResult/>
            


        </>
    );
};

export default Search;
