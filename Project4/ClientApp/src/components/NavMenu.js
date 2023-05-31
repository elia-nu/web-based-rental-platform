import React, { Component } from 'react';
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
          className="navbar-expand-sm navbar-toggleable-sm ng-white border-bottom box-shadow mb-3"
          container
          light
        >
          <NavbarBrand tag={Link} to="/search">
            ZUES
          </NavbarBrand>
          <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
          <NavbarBrand className="sizenav">
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                {links.map((link) => (
                  <NavItem key={link.link}>
                    <NavLink tag={Link} className="text-dark" to={link.link}>
                      {link.label}
                    </NavLink>
                  </NavItem>
                ))}
              </ul>
            </Collapse>
          </NavbarBrand>
          {shouldShowLogout && (
            <Collapse
              className="d-sm-inline-flex flex-sm-row-reverse"
              isOpen={!this.state.collapsed}
              navbar
            >
              <ul className="navbar-nav flex-grow">
                <NavItem>
                  <NavLink tag={Link} to="/profile" className="text-dark">{username}</NavLink>
                </NavItem>
                <NavItem>
                  <NavLink
                    tag={Link}
                    className="text-dark"
                    to="/search"
                    onClick={logout}
                  >
                    Logout
                  </NavLink>
                </NavItem>
              </ul>
            </Collapse>
          )}
        </Navbar>
      </header>
    );
  }
}