import React, { Component, Fragment } from 'react';

import { Collapse, Navbar, NavbarBrand, NavbarToggler, NavItem, NavLink } from 'reactstrap';
import { Link } from 'react-router-dom';
import './NavMenu.css';

export class NavMenu extends Component {
  static displayName = NavMenu.name;
 
  constructor (props) {
    super(props);
    this.toggleNavbar = this.toggleNavbar.bind(this);
    this.state = {
      collapsed: true
    };    
  }

  toggleNavbar () {
    this.setState({
      collapsed: !this.state.collapsed
    });
  }
 
  render() {
    const role = JSON.parse(localStorage.getItem('role'));
    const username = JSON.parse(localStorage.getItem('username'));
    const navLinks = {
      Admin: [
        { label: 'Home', link: '/search' },
        { label: 'Booking', link: '/viewbooking' },
        { label: 'Bookingemp', link: '/viewforemp' },
        { label: 'Addemployee', link: '/addemployee' },
        { label: 'Employee', link: '/employeeview' },
        { label: 'Customer', link: '/customerview' },
            { label: 'Owner', link: '/ownerview' },
            { label: 'Footer', link: '/footer' },
            { label: 'vlist', link: '/vlist' },
            { label: 'AddVehicle', link: '/addvehicle' },
            { label: 'Vehicle', link: '/view' },
            { label: 'ViewBookedVehicle', link: '/viewbookedvehicle' },
            { label: 'Vi', link: '/app1' },
      ],
      Employee: [
        { label: 'Home', link: '/search' },
        { label: 'Booking', link: '/viewbooking' },
        { label: 'Bookingemp', link: '/viewforemp' },
        { label: 'Customer', link: '/customerview' },
        { label: 'Owner', link: '/ownerview' },
      ],
      Customer: [
        { label: 'Home', link: '/search' },
        { label: 'ViewPersonal', link: '/viewpersonal' },
      ],
      Owner: [
        { label: 'Home', link: '/search' },
        { label: 'Vehicle', link: '/view' },
        { label: 'AddVehicle', link: '/addvehicle' },
        { label: 'ViewBookedVehicle', link: '/viewbookedvehicle' },
      ],
      default: [
        { label: 'Home', link: '/search' },
        { label: 'Registration', link: '/registration' },
        { label: 'Login', link: '/login' },
      ],
    };
    const links = navLinks[role] || navLinks.default;
    const shouldShowLogout = role && role !== 'default';
  
    const logout = () => {
      localStorage.clear();
      alert("Logout Successfully");  
      window.location.reload(true);
      Link.push('/search');
    };
  
    return (
        <header>
            <Navbar
                className="navbar-expand-md navbar-light bg-light fixed-top border-bottom"
                expand="md"
            >
                <NavbarBrand tag={Link} to="/search">
                    ZUES
                </NavbarBrand>
                <NavbarToggler onClick={this.toggleNavbar} />
                <Collapse isOpen={!this.state.collapsed} navbar>
                    <ul className="navbar-nav ml-auto">
                        {links.map((link) => (
                            <NavItem key={link.link}>
                                <NavLink tag={Link} className="nav-link text-dark" to={link.link}>
                                    {link.label}
                                </NavLink>
                            </NavItem>
                        ))}
                        {shouldShowLogout && (
                            <Fragment>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/profile"
                                        className="nav-link text-dark"
                                    >
                                        {username}
                                    </NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink
                                        tag={Link}
                                        to="/search"
                                        className="nav-link text-dark"
                                        onClick={logout}
                                    >
                                        Logout
                                    </NavLink>
                                </NavItem>
                            </Fragment>
                        )}
                    </ul>
                </Collapse>
            </Navbar>
        </header>
    );
  }
}