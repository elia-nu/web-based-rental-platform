import React from "react";
import View from "./View";
import Search from "./Search";
import AddVehicle from "./AddVehicle";
import EditVehicle from "./EditVehicle";
import Detail from "./Detail";
const ViewRoute =[
    {
        path:'/view',
        element:<View/>
    },
    {
        path: '/search',
        element: <Search/> 
    },
    {
        path: '/addvehicle',
        element: <AddVehicle/>
    },
    {
        path: '/editvehicle',
        element: <EditVehicle/>
    },
    {
        path: '/detail',
        element: <Detail/>
    }
];
export default ViewRoute