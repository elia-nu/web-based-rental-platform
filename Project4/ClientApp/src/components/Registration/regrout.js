import React from "react";
import Search from "../Vehicle/Search";
import Registration from "../Registration/registration";
import Login from "../Registration/login";
const Regrout =[
    {
        path: "/search",
        element: <Search/> 
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/registration',
        element: <Registration />
    }
];
export default Regrout