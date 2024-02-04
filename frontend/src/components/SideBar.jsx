
import Logo from "../assets/react.svg"
import React from 'react';
import "bootstrap-icons/font/bootstrap-icons.css"
import 'bootstrap/dist/css/bootstrap.min.css';
import { useEffect, useState } from 'react';
import {
  CDBSidebar,
  CDBSidebarContent,
  CDBSidebarFooter,
  CDBSidebarHeader,
  CDBSidebarMenu,
  CDBSidebarMenuItem,
  CDBNavbar, 
} from 'cdbreact';
import { NavLink } from 'react-router-dom';

const Sidebar = () => {

  return (<div style={{ display: 'flex', height: '37vh', overflow: 'scroll initial' }}>
  <CDBSidebar textColor="#000" backgroundColor="#f0f0f0">
    <CDBSidebarHeader prefix={<i className="fa fa-bars fa-large"></i>}>
    <img src={Logo} className='mx-2' style={{width: 30, height: 30}} alt="React Logo" />
      <a href="/" className="text-decoration-none" style={{ color: 'inherit' }} >
         Slides Generator
      </a>
     
    </CDBSidebarHeader>

    <CDBSidebarContent className="sidebar-content d-flex justify-content-start" >
      <CDBSidebarMenu >
        <NavLink  to="/" >
          <CDBSidebarMenuItem icon="search">Create</CDBSidebarMenuItem>
        </NavLink>
        <NavLink  to="/about" >
          <CDBSidebarMenuItem icon="map">About</CDBSidebarMenuItem>
        </NavLink>
       

      </CDBSidebarMenu>
    </CDBSidebarContent>

  </CDBSidebar>
  
  
</div>)
};

export default Sidebar;