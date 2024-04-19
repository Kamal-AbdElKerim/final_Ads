import React from 'react'

import Navbar from '../components/navbar/Navbar';

import { Outlet } from "react-router-dom";
import MenuSettings from '../components/Menu_settings/Menu_settings';

export default function Layout_settings() {
  return (
    <div>
          <Navbar />

          <MenuSettings />
          
           
    </div>
  )
}
