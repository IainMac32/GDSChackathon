import Logo from "../assets/react.svg"
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {
  CDBNavbar,
  CDBContainer,
  CDBNavBrand,
  CDBNavToggle,
  CDBCollapse,
  CDBNavbarNav,
  CDBNavItem,
  CDBNavLink,
  CDBIcon,
  CDBBtn,
  CDBDropDown,
  CDBDropDownToggle,
  CDBDropDownMenu,
   
} from 'cdbreact';
import { NavLink } from 'react-router-dom';


const Navbar = () => {

    const bgBlack = { backgroundColor: '#000000', color: '#f4f4f4' };
  
    return (
      <CDBNavbar style={bgBlack} dark expand="md" scrolling>
        <CDBNavbarNav left>
            <strong>Project Name</strong>
        </CDBNavbarNav>

        <CDBNavbarNav right>
            <p>cooler</p>
        </CDBNavbarNav>

      </CDBNavbar>
    );

};

export default Navbar;