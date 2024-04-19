import React, { useState } from "react";
import Navbar from '../components/navbar/Navbar';

import { Outlet } from "react-router-dom";

export default function Layout() {
  

    return (
        <>
          
                <Navbar />
           
          
                <Outlet />
          
            <footer></footer>
        </>
    );
}
