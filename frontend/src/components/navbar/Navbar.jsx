import React from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css'

export default function Navbar() {
  const navigate = useNavigate();

  const handleLogout = () => {
      localStorage.removeItem('access_token');
      navigate('/login');
  };
  return (
  








<header className="header navbar-area">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-12">
            <div className="nav-inner">
              <nav className="navbar navbar-expand-lg">
                <a className="navbar-brand" href="index.html">
                  <img src="assets/images/logo/logo.svg" alt="Logo" />
                </a>
                <button
                  className="navbar-toggler mobile-menu-btn"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarSupportedContent"
                  aria-controls="navbarSupportedContent"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                  <span className="toggler-icon" />
                </button>
                <div
                  className="collapse navbar-collapse sub-menu-bar"
                  id="navbarSupportedContent"
                >
                  <ul id="nav" className="navbar-nav ms-auto">
                    <li className="nav-item">
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } to="/home">Home</NavLink>

                  
                    </li>
                    <li className="nav-item">
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } to="/pageAds">Ads</NavLink>


                    </li>

                    <li className="nav-item">
                    <NavLink className={({ isActive, isPending }) => isPending ? "pending" : isActive ? "active" : "" } to="/Dashboard/user">Profile</NavLink>


                    </li>
                   
                  </ul>
                </div>{" "}
                {/* navbar collapse */}
                <div className="login-button">
                  <ul>
                  {localStorage.getItem('access_token') ? (
                            <li>
                                
                                <a href='javascript:void(0)' onClick={handleLogout}><i className="lni lni-enter"></i> Logout</a>

                            </li>
                        ) : (
                          <>
                             <li>
                     
                      <Link  to="/login"><i className="lni lni-enter" /> Login</Link>

                    </li>
                    <li>
                     
                      <Link  to="/register"> <i className="lni lni-user" /> Register</Link>

                    </li>
                          </>

                        )}
                 
                  </ul>
                </div>
                <div className="button header-button">
                  <Link to="/AddAds" className="btn">Post an Ad</Link>
                 
                </div>
              </nav>
              {/* navbar */}
            </div>
          </div>
        </div>{" "}
        {/* row */}
      </div>
      {/* container */}
    </header>










  )
}
