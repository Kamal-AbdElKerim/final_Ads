import React, { useEffect, useRef, useState } from "react";
import './AddAds.css'
import axios from "axios";
import { Api, getAllAds, getTagsByCategory, storeAds, user } from "../../../Api/api";
import Swal from 'sweetalert2'

export default function AddAds() {
      // const [title, setTitle] = useState('');
  const [NextStep1, setNextStep1] = useState(false);
  const [NextStep2, setNextStep2] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setError] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [imageUrls, setImageUrls] = useState([]);
  const [Auth, setAuth] = useState([]);

  const [cards, setCards] = useState([]);
  const [isCity, setIsCity] = useState([]);
  const [num_ADS, setnum_ADS] = useState([]);
  const [num_categories, setnum_categories] = useState([]);
  const [num_users, setnum_users] = useState([]);
  const [Tags, setTags] = useState([]);
  const [Years, setYears] = useState([]);

  const getTags = ()=> {
            axios.get(`${Api}/${getTagsByCategory}/${Category.current.value}`)
            .then(function (response) {
            // handle success
            // console.log('ads',response.data);
            setTags(response.data)
      
            })
            .catch(function (error) {
            // handle error
            console.log(error);
            })
            .finally(function () {
            // always executed
            });
  }
  const getAuthUser = ()=>{
        axios.get(`${Api}/${user}`,
        {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
              },
          })
        .then(function (response) {
          // handle success
          console.log('user',response.data );
          setAuth(response.data);
     
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
  }
  const getAds = ()=>{
        axios.get(`${Api}/${getAllAds}`)
        .then(function (response) {
          // handle success
        //   console.log(response);
          setCards(response.data.ads)
          setIsCity(response.data.citys)
          setnum_ADS(response.data.num_ADS)
          setnum_categories(response.data.num_categories)
          setnum_users(response.data.num_users)
          setYears(response.data.years.years )
          console.log('years',response.data.years)
        })
        .catch(function (error) {
          // handle error
          console.log(error);
        })
        .finally(function () {
          // always executed
        });
  }



  useEffect(() => {
    getAuthUser()
    getAds()
  }, []);

  const someAsyncOperation = () => {
    return new Promise((resolve) => {
      
      setTimeout(() => {
        resolve();
      }, 2000); 
    });
  };

  const title = useRef();
  const Category = useRef();
  const price = useRef();
  const Type_price = useRef();
  const Description = useRef();
  const Condition = useRef();
  const Model = useRef();
  const Puissance = useRef();
  const Carburant = useRef();
  const fileInputRef = useRef(null); 
  const City = useRef(); 
  const Address = useRef(); 

  const handleFileChange = (event) => {
    const files = event.target.files;

    console.log("files:", files);
    const newImageUrls = [...imageUrls];

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const url = URL.createObjectURL(file);
      newImageUrls.push({ file, url });
    }

    setSelectedFiles([...selectedFiles, ...files]);
    console.log('selectedFiles',selectedFiles)

    setImageUrls(newImageUrls);

  
  };

  useEffect(() => {
    
    if (Model.current) {
      Model.current.value = 2012;
  }
    if (Puissance.current) {
      Puissance.current.value = '5 CV';
  }
    if (Carburant.current) {
      Puissance.current.value = 'Diesel';
  }




  }, []);

  const removeImage = (index) => {
    const newImageUrls = [...imageUrls];
    const removedFile = newImageUrls[index].file;

    // Remove the corresponding file from selectedFiles
    const newSelectedFiles = selectedFiles.filter((file) => file !== removedFile);

    // Update state to remove the image URL and corresponding file
    newImageUrls.splice(index, 1);
    setImageUrls(newImageUrls);
    setSelectedFiles(newSelectedFiles);
  };

  const step1 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an asynchronous operation (e.g., API call or setTimeout)
    await someAsyncOperation(); // Replace this with your actual asynchronous logic

    setIsLoading(false);
    let errorsObject = {};

    if (title.current.value === "") {
        errorsObject.title = 'title is required'; 
    }
    if (Category.current.value === "") {
        errorsObject.Category = 'Category is required'; 
    }
    if (title.current.value !== "" && Category.current.value !== "") {
      setNextStep1(true);
      getTags()
    }

    setError(errorsObject)

 

  };

  const step2 = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate an asynchronous operation (e.g., API call or setTimeout)
    await someAsyncOperation(); // Replace this with your actual asynchronous logic

    setIsLoading(false);
    let errorsObject = {};

    if (price.current.value === "") {
        errorsObject.price = 'price is required'; 
    }
    if (Type_price.current.value === "") {
        errorsObject.Type_price = 'Type_price is required'; 
    }
    if (Description.current.value === "") {
        errorsObject.Description = 'Description is required'; 
    }
    if (Condition.current.value === "") {
        errorsObject.Condition = 'Condition is required'; 
    }
    if (Model.current && Model.current.value === "") {
        errorsObject.Model = 'Model is required'; 
    }
    if (Model.current && Puissance.current.value === "") {
        errorsObject.Puissance = 'Puissance is required'; 
    }
    if (Model.current && Carburant.current.value === "") {
        errorsObject.Carburant = 'Carburant is required'; 
    }

    
 
  
    console.log(errorsObject)
    if (Object.keys(errorsObject).length == 0) {
      setNextStep2(true);
      window.scrollTo({
        top: 300,
        behavior: "smooth" 
    });
      getTags()
    }

    setError(errorsObject)

 

  };

  const backtoStep = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setNextStep1(false);
    }, 1000);
           
        }

  const backtoStep2 = () => {
    setIsLoading(true);
    setTimeout(() => {
        setIsLoading(false);
        setNextStep2(false);
       
    }, 1000);
           
        }

        const clearInputs = () => {
            title.current.value = '';
            price.current.value = '';
            Type_price.current.value = '';
            Description.current.value = '';
        
            Address.current.value = '';
          };

        const SubmitAds = async () => {
            setIsLoading(true);

            let errorsObject = {};

            if (City.current.value === "") {
                errorsObject.City = 'City is required'; 
            }
            if (Address.current.value === "") {
                errorsObject.Address = 'Address is required'; 
            }
            setError(errorsObject)
            setTimeout(() => {
                setIsLoading(false);
               
            }, 1000);

           if (City.current.value !== "" && Address.current.value !== "") {

            const formData = new FormData();
            formData.append('title', title.current.value);
            formData.append('Category', Category.current.value);
            formData.append('price', price.current.value);
            formData.append('Type_price', Type_price.current.value);
            formData.append('Description', Description.current.value);
            formData.append('Condition', Condition.current.value);
            formData.append('Model', Model.current?.value);
            formData.append('Puissance', Puissance.current?.value);
            formData.append('TypeCar', Carburant.current?.value);
            formData.append('City', City.current.value);
            formData.append('Location', Address.current.value);
        
            // Append all selected files to formData
            for (let i = 0; i < selectedFiles.length; i++) {
              formData.append(`photos[]`, selectedFiles[i]);
            }
        
            try {
              const response = await axios.post(`${Api}/${storeAds}`, formData, {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('access_token')}`,
                  'Content-Type': 'multipart/form-data', // Important for file uploads
                },
              });
        
              console.log('new_response', response);
              clearInputs()
              setNextStep1(false)
              setNextStep2(false)
              setError('')
              setSelectedFiles('')
              setImageUrls('')

              Swal.fire({
                title: "You must wait for the admin  to accept your Ad. This will be done in 30 minutes",
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

        
            } catch (error) {
              console.error('Error submitting ad:', error);
              // Handle error (e.g., show error message to user)
            }
           }
          };
          

  return (
    <div className="col-lg-9 col-md-8 col-12">
    <div className="main-content">
      {/* Start Post Ad Block Area */}
      <div className="dashboard-block mt-0">
        <h3 className="block-title">Post Ad</h3>
        <div className="inner-block">
          {/* Start Post Ad Tab */}
          <div className="post-ad-tab">
            <nav>
              <div
                className="nav nav-tabs"
                id="nav-tab"
                role="tablist"
              >
                <button
                  className={`nav-link ${
                    NextStep1 ? "active" : "active"
                  }  `}
                  id="nav-item-info-tab"
                  // data-bs-toggle="tab"
                  // data-bs-target="#nav-item-info"
                  type="button"
                  // role="tab"
                  // aria-controls="nav-item-info"
                  // aria-selected="true"
                >
                  <span className="serial">01</span>
                  Step
                  <span className="sub-title">Ad Information</span>
                </button>
                <button
                  className={`nav-link ${
                    NextStep1 ? "active" : ""
                  }  `}
                  id="nav-item-details-tab"
                  // data-bs-toggle="tab"
                  // data-bs-target="#nav-item-details"
                  type="button"
                  // role="tab"
                  // aria-controls="nav-item-details"
                  // aria-selected="false"
                >
                  <span className="serial">02</span>
                  Step
                  <span className="sub-title">Ad Details</span>
                </button>

                <button
                   className={`nav-link ${
                    NextStep2 ? "active" : ""
                  }  `}
                  id="nav-user-info-tab"
                  // data-bs-toggle="tab"
                  // data-bs-target="#nav-user-info"
                  type="button"
                  // role="tab"
                  // aria-controls="nav-user-info"
                  // aria-selected="false"
                >
                  <span className="serial">03</span>
                  Step
                  <span className="sub-title">
                    User Information
                  </span>
                </button>
              </div>
            </nav>
            <div className="tab-content" id="nav-tabContent">
              <div
                className={`tab-pane fade ${
                  NextStep1 ? "" : "show active"
                }  `}
                id="nav-item-info"
                role="tabpanel"
                aria-labelledby="nav-item-info-tab"
              >
                {/* Start Post Ad Step One Content */}
                <div className="step-one-content">
                  <form
                    onSubmit={step1}
                    className="default-form-style"
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Add Title*</label>
                          <input
                            name="title"
                            ref={title}
                            type="text"
                            placeholder="Enter Title"
                          />
                            {errors.title && (
                    
                    <div id="emailHelp" className="form-text text-danger">{errors.title}</div>

                )}
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Category*</label>
                          <div className="selector-head">
                            <span className="arrow">
                              <i className="lni lni-chevron-down" />
                            </span>
                            <select
                              className="user-chosen-select"
                              name="Category"
                              ref={Category}
                            >
                             {num_categories && num_categories.map(category => (
                                <option key={category.id} value={category.id}>
                                    {category.Name}
                                </option>
                            ))}

                            </select>
                            {errors.Category && (<div id="emailHelp" className="form-text text-danger">{errors.Category}</div>)}
                          </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button mb-0">
                          <button
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
                              "Next Step"
                            )}
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Start Post Ad Step One Content */}
              </div>
              <div
                className={`tab-pane fade ${
                  (NextStep1 && !NextStep2) ? "show active" : ""
                }  `}
                id="nav-item-details"
                role="tabpanel"
                aria-labelledby="nav-item-details-tab"
              >
                {/* Start Post Ad Step Two Content */}
                <div className="step-two-content">
                <div className="form-group  mb-0 mt-3 ">

                <button
                        disabled={isLoading}  
                        onClick={backtoStep}   
                        type="button"          
                        className="btn alt-btn btn-secondary"
                        >
                        {isLoading ? (
                            // Render loading indicator when isLoading is true
                            <>
                            <span>Loading...</span>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>
                        ) : (
                            // Render content when isLoading is false
                            <>
                            <i className="fa-solid fa-angles-left"></i> Previous
                            </>
                        )}
                        </button>


                </div>
                  <form
                    className="default-form-style"
                    action="#"
                  >
                    <div className="row">
                      <div className="col-12">
                        <div className="form-group">
                          <label>Add Price*</label>
                          <input
                            name="price"
                            ref={price}
                            type="text"
                            placeholder="Enter Price"
                          />
                         {errors.price && (<div id="emailHelp" className="form-text text-danger">{errors.price}</div>)}

                        </div>
                      </div>
                    
                      <div className="col-12">
                        <div className="form-group">
                          <label>Select Currency*</label>
                          <div className="selector-head">
                            <span className="arrow">
                              <i className="lni lni-chevron-down" />
                            </span>
                            <select className="user-chosen-select"  ref={Type_price}>
                             
                              <option selected value="Dollar">Dollar</option>
                              <option value="Euro">Euro</option>
                              <option value="Rupee">Rupee</option>
                            </select>
                            {errors.Type_price && (<div id="emailHelp" className="form-text text-danger">{errors.Type_price}</div>)}
                          </div>
                        </div>
                      </div>
                       {/* start uplode images */}
                      <div className="col-lg-12 col-12">
                        <div className="upload-input">
                          <input
                            type="file"
                            id="upload"
                            name="upload"
                            onChange={handleFileChange}
                            multiple
                            ref={fileInputRef}
                          />
                          <label className="text-center content d-flex  justify-content-start">
                            <span className="text">
                              <span className="d-block mb-15">
                                Drop files anywhere to Upload
                              </span>
                              <label
                                className="button_uplode mb-15 plus-icon"
                                for="upload"
                              >
                                <i className="lni lni-plus"></i>
                              </label>

                              <span className="main-btn d-block btn-hover">
                                Select File
                              </span>
                              <span className="d-block">
                                Maximum upload file size 10Mb
                              </span>
                            </span>
                            {/* Display uploaded image previews */}
                            {imageUrls.length > 0 && (
                              <div>
                                <div
                                  style={{
                                    display: "flex",
                                    flexWrap: "wrap",
                                    
                                  }}
                                >
                                  {imageUrls.map((image, index) => (
                                    <div
                                      key={index}
                                      style={{
                                        marginRight: "10px",
                                        marginBottom: "10px",
                                        display: "flex",
                                        justifyContent: "center ",
                                        position:'relative',
                                      }}
                                    >
                                      <img
                                        src={image.url}
                                        alt={`Uploaded ${index}`}
                                        className=" me-2 ms-2"
                                        style={{
                                          maxWidth: "80px",
                                          maxHeight: "80px",
                                        }}
                                      />
                                      <p
                                        className=" bg-danger  button_close px-1  text-white "
                                        style={{
                                          position: "absolute",
                                          top: "0px",
                                          right: "0px",
                                        }}
                                        onClick={() =>
                                          removeImage(index)
                                        }
                                      >
                                        <i className="fa-solid fa-x"></i>
                                      </p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </label>
                        </div>
                      </div>
                       {/* end uplode images */}

                      <div className="col-12">
                        <div className="form-group mt-30">
                          <label>Ad Description*</label>
                          <textarea  ref={Description}
                            name="message"
                            placeholder="Input ad description"
                            
                          />
                          {errors.Description && (<div id="emailHelp" className="form-text text-danger">{errors.Description}</div>)}
                        </div>
                      </div>
                    
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>Item Condition*</label>
                          <div className="selector-head">
                            <span className="arrow">
                              <i className="lni lni-chevron-down" />
                            </span>
                            <select className="user-chosen-select" ref={Condition}>
                           
                              <option selected value="Used">Used</option>
                              <option value="New">
                                Brand New
                              </option>
                            </select>
                            {errors.Condition && (<div id="emailHelp" className="form-text text-danger">{errors.Condition}</div>)}
                          </div>
                        </div>
                      </div>
                      {Category.current && Category.current.value == 1 && (                           
                      
                                <div className="row">
          
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Modèle*</label>
                                    <div className="selector-head">
                                      <span className="arrow"><i className="lni lni-chevron-down"></i></span>
                                      <select
                                        className="user-chosen-select"
                                        
                                        ref={Model}
                                      >
                                        {Years.map((year) => (
                                          <option key={year.id} value={year}>
                                            {year}
                                          </option>
                                        ))}
                                      </select>
                                      {/* <div className="text-danger">{errors.Model}</div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Puissance*</label>
                                    <div className="selector-head">
                                      <span className="arrow"><i className="lni lni-chevron-down"></i></span>
                                      <select
                                        className="user-chosen-select"
                                        ref={Puissance}
                                       
                                       
                                      >
                                        <option value="5 CV">5 CV</option>
                                        <option value="6 CV">6 CV</option>
                                        <option value="7 CV">7 CV</option>
                                        <option value="8 CV">8 CV</option>
                                        <option value="12 CV">12 CV</option>
                                      </select>
                                      {/* <div className="text-danger">{errors.Puissance}</div> */}
                                    </div>
                                  </div>
                                </div>
                                <div className="col-lg-6 col-12">
                                  <div className="form-group">
                                    <label>Type de carburant*</label>
                                    <div className="selector-head">
                                      <span className="arrow"><i className="lni lni-chevron-down"></i></span>
                                      <select
                                        className="user-chosen-select"
                                        ref={Carburant}
                                       
                                      >
                                        <option value="Diesel">Diesel</option>
                                        <option value="Essence">Essence</option>
                                        <option value="Hybride">Hybride</option>
                                      </select>
                                      {/* <div className="text-danger">{errors.TypeCar}</div> */}
                                    </div>
                                  </div>
                                </div>
                                                </div>
                                
                                
                            )}
                   
   
                      <div className="col-12">
                        <div className="form-group">
                          <label className="tag-label">
                            Tags* <span>Comma(,) separated</span>
                          </label>
                          <div className="row ">
                          {Tags && Tags.map(tag => (
                                <div key={tag.id} className="ms-2 col-6 col-md-4 col-lg-3">
                                    <input
                                        type="checkbox"
                                        className="btn-check"
                                        id={`btncheck${tag.TagName}`}
                                        autoComplete="off"
                                        value={tag.id}

                                    />
                                    <label
                                        htmlFor={`btncheck${tag.TagName}`}
                                        className="btn btn-outline-primary"
                                        style={{ borderRadius: '30px' }}
                                    >
                                        {tag.TagName}
                                    </label>
                                </div>
                            ))}

                                                      
                                                      
                                                         
                                                            {/* <div className="text-danger">@error("tags_selected") {{ $message }} @enderror</div> */}

                         </div>
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group button mb-0">
                       
                        

                          <button
                          onClick={step2}
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
                              "Next Step"
                            )}
                          </button>

                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* Start Post Ad Step Two Content */}
              </div>
              <div
               className={`tab-pane fade ${
                NextStep2 ? "show active" : ""
              }  `}
                id="nav-user-info"
                role="tabpanel"
                aria-labelledby="nav-user-info-tab"
              >
                {/* Start Post Ad Step Three Content */}
                <div className="step-three-content">
                       <button
                        disabled={isLoading}  
                        onClick={backtoStep2}   
                        type="button"          
                        className="btn alt-btn btn-secondary mt-3"
                        >
                        {isLoading ? (
                            <>
                            <span>Loading...</span>
                            <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                            </>
                        ) : (
                            <>
                            <i className="fa-solid fa-angles-left"></i> Previous
                            </>
                        )}
                        </button>
                  <form
                    className="default-form-style"
                  
                    action="#"
                  >
                    <div className="row">
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>Name*</label>
                          <input
                            name="name"
                            type="text"
                            placeholder="Enter your name"
                            value={Auth.name}
                            disabled
                            className="input_disabled"
                          />

                        </div>
                      </div>
                      <div className="col-lg-6 col-12">
                        <div className="form-group">
                          <label>Mobile Numbe*</label>
                          <input
                            name="number"
                            type="text"
                            placeholder="Enter mobile number"
                            value={Auth.phone}
                            disabled
                            className="input_disabled"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-group">
                          <label>Select City*</label>
                          <div className="selector-head">
                            <span className="arrow">
                              <i className="lni lni-chevron-down" />
                            </span>
                            <select className="user-chosen-select" ref={City}>
                                {isCity && isCity.map(city => (
                                    <option value={city}>
                                    {city}
                                    </option>
                                ))}
                             
                           
                            </select>
                            {errors.City && (<div id="emailHelp" className="form-text text-danger">{errors.City}</div>)}

                          </div>
                        </div>
                      </div>
                   
                      <div className="col-12">
                        <div className="form-group">
                          <label>Address*</label>
                          <input
                            name="address"
                            type="text"
                            placeholder="Enter a location"
                            ref={Address}
                          />
                        {errors.Address && (<div id="emailHelp" className="form-text text-danger">{errors.Address}</div>)}

                        </div>
                      </div>
                    
                      <div className="col-12">
                     
                        <div className="form-group button mt-3">

                        </div>
                      </div>
                    </div>
                  </form>
                  <div className="form-group button mb-0">
                  <button
                          onClick={SubmitAds}
                            className="btn  "
                            type="button"
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
                              "Submit Ad"
                            )}
                 </button>
                 </div>
                </div>
                {/* Start Post Ad Step Three Content */}
              </div>
            </div>
          </div>
          {/* End Post Ad Tab */}
        </div>
      </div>
      {/* End Post Ad Block Area */}
    </div>
  </div>
  )
}
