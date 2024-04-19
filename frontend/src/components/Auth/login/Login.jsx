import React from 'react'
import { useState , useEffect } from 'react';
import Swal from 'sweetalert2'
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { Api, login } from '../../../Api/api';
import './login.css'
import Loading from '../../Global_Style/londing/londing';



export default function Login() {
    const [email, setEmail] = useState('') 
    const [password, setPassword] = useState('') 
    const [errors, setErrors] = useState('') 
    const [validation, setValidation] = useState([]) 
    let [loading, setLoading] = useState(false) ;

    const navigate = useNavigate();
   
      
   useEffect(() => {
    if ( localStorage.getItem('access_token')) {
        
        navigate('/home')
      }
   }, []);
  
    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      let errorsObject = {};
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if (email.trim() === '' ) {

          errorsObject.email = 'Email is required';
          setLoading(false);

      }else if (!emailPattern.test(email)) {

        errorsObject.email = 'Invalid email format';
        setLoading(false);


      }
      if (password.trim() === '') {
          errorsObject.password = 'Password is required';
          setLoading(false);
      }

      setErrors(errorsObject);

            if (Object.keys(errorsObject).length === 0) {
              axios.post(`${Api}/${login}`, {
                email: email,
                password: password
              })
              .then(function (response) {
                // console.log(response);
                localStorage.setItem('access_token', response.data.access_token);
                setLoading(false);
                navigate("/home");
              })
              .catch(function (error) {
                // console.log(error.response.data.errors);
                setValidation(error.response.data.errors);
                setLoading(false);
              });

      }
  
  };
  
    console.log(errors)

    return (
  

      <>
  {loading ? <Loading /> : ''}

  {/* Start Breadcrumbs */}
  <div className="breadcrumbs">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="breadcrumbs-content">
            <h1 className="page-title">Login</h1>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <ul className="breadcrumb-nav">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>Login</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
  {/* End Breadcrumbs */}
  {/* start login section */}
  <section className="login section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
          <div className="form-head">
            <h4 className="title">Login</h4>
            <form onSubmit={handleSubmit} >
            {validation && (<p className=' text-danger '>{validation}</p>)}

              <div className="form-group">
                <label>Username or email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.email}</div>

                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.password}</div>

                )}
              </div>
            
              <div className="button">
                <button type="submit" className="btn">
                  Login Now
                </button>
              </div>
            
              <p className="outer-link">
                Don't have an account?
                <Link  to="/register">register Now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
 



   
</>

      

    )


}
