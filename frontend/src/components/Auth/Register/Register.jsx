import React from 'react'
import { useState ,useEffect,CSSProperties   } from 'react'
import './Register.css'
import { Link, useNavigate } from "react-router-dom";

import Swal from 'sweetalert2'
import axios from 'axios';
import { Api, register } from '../../../Api/api';
import Londing from '../../Global_Style/londing/londing';
import Loading from '../../Global_Style/londing/londing';

export default function Register() {
    const [firstName, setFirstName] = useState('') // useState to store First Name
    const [email, setEmail] = useState('') // useState to store Email address of the user
    const [password, setPassword] = useState('') // useState to store Password
    const [Phone, setPhone] = useState('') 
    const [Image, setImage] = useState('') 
    const [passwordConfirmation, setpasswordConfirmation] = useState('') 
    const [errors, setErrors] = useState('') 
    const [validation, setValidation] = useState('') 
    let [loading, setLoading] = useState(false) ;


    const navigate = useNavigate();


    useEffect(() => {
      if ( localStorage.getItem('access_token')) {
          
          navigate('/Home')
        }
     }, []);

    const handleSubmit = (e) => {
      e.preventDefault();
      setLoading(true);
      let errorsObject = {};
      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


      if (password !== passwordConfirmation) {
          errorsObject.passwordConfirmation = 'Passwords do not match';
          setLoading(false);
      }
      if (firstName.trim() === '') {
          errorsObject.firstName = 'First Name is required';
          setLoading(false);
      }
      if (Phone.trim() === '') {
          errorsObject.Phone = 'Phone is required';
          setLoading(false);
      }else if (Phone.length <= 9){
        errorsObject.Phone = 'Phone min length 10';
          setLoading(false);
      }

      if (email.trim() === '') {
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
              axios.post(`${Api}/${register}`, {
                name: firstName,
                email: email,
                password: password,
                phone: Phone,
                image: Image,
              })
              .then(function (response) {
                console.log(response);
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
  

    return (
    
      <>
      {loading ? <Loading /> : ''}
  {/* Start Breadcrumbs */}
  
  <div className="breadcrumbs">
    <div className="container">
      <div className="row align-items-center">
        <div className="col-lg-6 col-md-6 col-12">
          <div className="breadcrumbs-content">
            <h1 className="page-title">Registration</h1>
          </div>
        </div>
        <div className="col-lg-6 col-md-6 col-12">
          <ul className="breadcrumb-nav">
            <li>
              <a href="index.html">Home</a>
            </li>
            <li>Registration</li>
          </ul>
        </div>
      </div>
    </div>
  </div>

  {/* End Breadcrumbs */}
  {/* start Registration section */}
  <section className="login registration section">
    <div className="container">
      <div className="row">
        <div className="col-lg-6 offset-lg-3 col-md-8 offset-md-2 col-12">
          <div className="form-head">
            <h4 className="title">Registration</h4>
            <form onSubmit={handleSubmit} >
              {validation && (<p className=' text-danger '>{validation}</p>)}
             
              <div className="form-group">
                <label>Name</label>
                <input name="password" type="text" onChange={(e) => setFirstName(e.target.value)}/>
                {errors.firstName && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.firstName}</div>

                )}
              </div>
              <div className="form-group">
                <label>Email</label>
                <input name="email" type="email" onChange={(e) => setEmail(e.target.value)}/>
                {errors.email && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.email}</div>

                )}
              </div>
              <div className="form-group">
                <label>Phone</label>
                <input name="Phone" type='number' onChange={(e) => setPhone(e.target.value)}/>
                {errors.Phone && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.Phone}</div>

                )}
              </div>
              <div className="form-group">
                <label>image</label>
                <input name="image" type='file' onChange={(e) => setImage(e.target.value)}/>
                {errors.image && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.image}</div>

                )}
              </div>
              <div className="form-group">
                <label>Password</label>
                <input name="password" type="password" onChange={(e) => setPassword(e.target.value)}/>
                {errors.password && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.password}</div>

                )}
              </div>
              <div className="form-group">
                <label>Confirm Password</label>
                <input name="password" type="password"  onChange={(e) => setpasswordConfirmation(e.target.value)}/>
                {errors.passwordConfirmation && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.passwordConfirmation}</div>

                )}
              </div>
            
              <div className="button">
                <button type="submit" className="btn">
                  Registration
                </button>
              </div>
              <p className="outer-link">
                Already have an account?  <Link  to="/login">Login Now</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  </section>
  {/* End Registration section */}
</>

  


       
      )
}
