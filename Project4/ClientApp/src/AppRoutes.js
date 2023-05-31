import BookingRoute from "./components/Booking/BookingRoute";
import { Counter } from "./components/Counter";
import { FetchData } from "./components/FetchData";
import { Home } from "./components/Home";
import ViewRoute from "./components/Vehicle/ViewRoute";
import Registration from "./components/Registration/registration";
import Login from "./components/Registration/login";
import Search from "./components/Vehicle/Search";
import Profile from "./components/Registration/Profile";
import Addemployee from "./components/Registration/Addemployee";
import CustomerView from "./components/Administration/CustomerView";
import EmployeeView from "./components/Administration/EmployeeView";
import OwnerView from "./components/Administration/OwnerView";
import EditProfile from "./components/Registration/editProfile";
import Confermation from "./components/Registration/confermation";
import ResetPassword from "./components/Registration/resetpassword";

import vlist from "./components/Vehicle/vlist";

const AppRoutes = [
    {
        path: "/",
        element: <Search />
    },
    {
        path: '/counter',
        element: <Counter />
    },
    {
        path: '/fetch-data',
        element: <FetchData />
    },
   
    ...ViewRoute,
    ...BookingRoute,
    {
        path: '/registration',
        element: <Registration />
    },
    {
        path: '/login',
        element: <Login />
    },
    {
        path: '/profile',
        element: <Profile />
    },
    {
        path: '/addemployee',
        element: <Addemployee />
    },
    {
        path: '/customerview',
        element: <CustomerView />
    },
    {
        path: '/employeeview',
        element: <EmployeeView />
    },
    {
        path: '/ownerview',
        element: <OwnerView />
    },
    {
        path: '/editprofile',
        element: <EditProfile />
    },
    {
        path: 'forgetpassword',
        element: <Confermation />
    },
    {
        path: 'resetpassword',
        element: <ResetPassword />
    }

];

export default AppRoutes;
