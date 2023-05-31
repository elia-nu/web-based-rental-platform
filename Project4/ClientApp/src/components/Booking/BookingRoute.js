import React from 'react'
import AddBooking from './AddBooking'
import View from './View'
import ViewForEmp from './ViewForEmp'
import ViewPersonal from './ViewPersonal'
import AddBooking2 from './AddBooking2'
import ViewBookedVehicle from './ViewBookedVehicle'

const BookingRoute = [
    {
        path: '/addbooking',
        element: <AddBooking/>
    },
    {
        path: '/viewbooking',
        element: <View/>
    },
    {
        path: '/viewforemp',
        element: <ViewForEmp/>
    },
    {
        path: '/viewpersonal',
        element: <ViewPersonal/>
    },
    {
        path: '/addbooking2',
        element: <AddBooking2/>
    },
    {
        path: '/viewbookedvehicle',
        element: <ViewBookedVehicle/>
    }
]

export default BookingRoute