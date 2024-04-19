import axios from 'axios';
import React, { useRef, useEffect, useState } from 'react';
import Swal from 'sweetalert2';
import { Api, update_Ads } from '../../../Api/api';

export default function UpdateAds({setIsLoading,setSinglPage,id, Title, Price, TypePrice, Description, Condition, Username, Phone, Location ,isLoading}) {

    const [Error, setError] = useState('');


    const titleInputRef = useRef(null);
    const priceInputRef = useRef(null);
    const typePriceSelectRef = useRef(null);
    const descriptionInputRef = useRef(null);
    const conditionSelectRef = useRef(null);
    const usernameInputRef = useRef(null);
    const phoneInputRef = useRef(null);
    const locationInputRef = useRef(null);

    // Sync input field values with props using useEffect
    useEffect(() => {
        if (titleInputRef.current) {
            titleInputRef.current.value = Title;
        }
        if (priceInputRef.current) {
            priceInputRef.current.value = Price;
        }
        if (typePriceSelectRef.current) {
            typePriceSelectRef.current.value = TypePrice;
        }
        if (descriptionInputRef.current) {
            descriptionInputRef.current.value = Description;
        }
        if (conditionSelectRef.current) {
            conditionSelectRef.current.value = Condition;
        }
        if (usernameInputRef.current) {
            usernameInputRef.current.value = Username;
        }
        if (phoneInputRef.current) {
            phoneInputRef.current.value = Phone;
        }
        if (locationInputRef.current) {
            locationInputRef.current.value = Location;
        }
    }, [Title, Price, TypePrice, Description, Condition, Username, Phone, Location]);

    const updateAds = async() => {
        setIsLoading(true);
        let errors = {};
        if (titleInputRef.current.value === '') {
            errors.titleInputRef = 'title is required'
            setIsLoading(false);
        }
        if (priceInputRef.current.value === '') {
            errors.priceInputRef = 'price is required'
            setIsLoading(false);
        }
        if (typePriceSelectRef.current.value === '') {
            errors.typePriceSelectRef = 'typePrice is required'
            setIsLoading(false);
        }
        if (descriptionInputRef.current.value === '') {
            errors.descriptionInputRef = 'description is required'
            setIsLoading(false);
        }
        if (conditionSelectRef.current.value === '') {
            errors.conditionSelectRef = 'condition is required'
            setIsLoading(false);
        }
        if (locationInputRef.current.value === '') {
            errors.locationInputRef = 'location is required'
            setIsLoading(false);
        }
        setError(errors);
        
        if (Object.keys(errors).length === 0) {

            const formData = new FormData();
            formData.append('Title', titleInputRef.current.value);
            formData.append('Price', priceInputRef.current.value);
            formData.append('TypePrice', typePriceSelectRef.current.value);
            formData.append('Description', descriptionInputRef.current.value);
            formData.append('Condition', conditionSelectRef.current.value);
            formData.append('Location', locationInputRef.current.value);
        
         
        
            try {
              const response = await axios.post(`${Api}/${update_Ads}/${id}`, formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'multipart/form-data', // Important for file uploads
                },
              });
        
              console.log('new_response', response);
             
              setIsLoading(false);

              Swal.fire({
                title: "Ad updated successfully ,You must wait for the admin  to accept your Ad. This will be done in 30 minutes",
                showClass: {
                  popup: `
                    animate__animated
                    animate__fadeInUp
                    animate__faster
                  `
                },
                hideClass: {
                  popup: `
                    animate__animated
                    animate__fadeOutDown
                    animate__faster
                  `
                }
              });

              setSinglPage('');

            } catch (error) {
              console.error('Error submitting ad:', error);
              // Handle error (e.g., show error message to user)
            }
           }
          

    }
    return (
        <div className="dashboard-block mt-0">
            <h3 className="block-title">Update Ad</h3>
            <div className="inner-block">
                <div className="post-ad-tab" id="stepp">
                    {/* Your tab navigation and content here */}
                    <div className="step-one-content">
                        <form className="default-form-style">
                            <div className="row">
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Add Title*</label>
                                        <input
                                            type="text"
                                            ref={titleInputRef}
                                            placeholder="Enter Title"
                                        />
                                        <div className="text-danger">{Error.titleInputRef && Error.titleInputRef}</div>
                                    </div>
                                </div>
                                {/* Other form fields go here */}
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Add Price*</label>
                                        <input
                                            type="text"
                                            ref={priceInputRef}
                                            placeholder="Enter Price"
                                        />
                                        <div className="text-danger">{Error.priceInputRef && Error.priceInputRef}</div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Select Currency*</label>
                                        <select
                                            ref={typePriceSelectRef}
                                            className="user-chosen-select"
                                        >
                                            <option value="Dollar">Dollar</option>
                                            <option value="Euro">Euro</option>
                                            <option value="Rupee">Rupee</option>
                                        </select>
                                        <div className="text-danger">{Error.typePriceSelectRef && Error.typePriceSelectRef}</div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Ad Description*</label>
                                        <textarea
                                            ref={descriptionInputRef}
                                            placeholder="Input ad description"
                                        />
                                        <div className="text-danger">{Error.descriptionInputRef && Error.descriptionInputRef}</div>
                                    </div>
                                </div>
                                {/* Additional form fields */}
                              
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                        <label>Name*</label>
                                        <input
                                            type="text"
                                            ref={usernameInputRef}
                                            readOnly
                                            placeholder="Enter your name"
                                            style={{ backgroundColor: '#e3e3e3', cursor: 'not-allowed' }}
                                        />
                                        <div className="text-danger">{/* Display error message if needed */}</div>
                                    </div>
                                </div>
                              
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                        <label>Mobile Number*</label>
                                        <input
                                            type="text"
                                            ref={phoneInputRef}
                                            readOnly
                                            placeholder="Enter mobile number"
                                            style={{ backgroundColor: '#e3e3e3', cursor: 'not-allowed' }}
                                        />
                                        <div className="text-danger">{/* Display error message if needed */}</div>
                                    </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                    <div className="form-group">
                                        <label>Item Condition*</label>
                                        <select
                                            ref={conditionSelectRef}
                                            className="user-chosen-select"
                                        >
                                            <option value="Brand New">Brand New</option>
                                            <option value="Used">Used</option>
                                        </select>
                                        <div className="text-danger">{Error.conditionSelectRef && Error.conditionSelectRef}</div>
                                    </div>
                                </div>
                                <div className="col-12">
                                    <div className="form-group">
                                        <label>Address*</label>
                                        <input
                                            type="text"
                                            ref={locationInputRef}
                                            placeholder="Enter a location"
                                        />
                                        <div className="text-danger">{Error.locationInputRef && Error.locationInputRef}</div>
                                    </div>
                                </div>
                            </div>
                      
                        </form>
                        <div className="col-12">

                                <div className="form-group button mb-0">
                                <button onClick={updateAds}
                                className="btn"
                                type="submit"
                                disabled={isLoading}
                                >
                                {isLoading ? (
                                <>
                                <span>Loading...</span>
                                <span
                                className="spinner-border spinner-border-sm"
                                role="status"
                                aria-hidden="true"
                                ></span>
                                </>
                                ) : (
                                "Updated Ad"
                                )}
                                </button>
                                </div>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
