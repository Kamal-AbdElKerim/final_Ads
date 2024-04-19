import axios from 'axios';
import React, { Children, useEffect, useRef, useState } from 'react'
import { Ads, Api, Citys, favorite, remove_favorite, user } from '../../Api/api';
import './pageAds.css'
import Loading from '../londing/londing';
import Pagination from '../Pagination/Pagination'
import { Link, useNavigate } from 'react-router-dom';


export default function PageAds() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  let [links, setLinks] = useState([]) ;
  const [Page, setPage] = useState(1);
  const [DATAPagin, setDATAPagin] = useState('');


  const [ AllAds, setAds] = useState('');
  const [ Allcategories, setCategories] = useState('');
  const [ AllCity, setAllCity] = useState([]);
  const [ keyword, setkeyword] = useState('');
  const [ Category, setCategory] = useState('');
  const searchQuery = useRef()
  const [ city, setcity] = useState('');
  const [priceValue, setPriceValue] = useState(7000); 
  const [price, setPrice] = useState(7000); 
  const [Auth, setAuth] = useState(''); 


  const getAuthUser = ()=>{
    axios.get(`${Api}/${user}`,
    {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
          },
      })
    .then(function (response) {
      // handle success
      // console.log('user',response.data );
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

  const getCity = () =>{
    axios.get(`${Api}/${Citys}`)
    .then(function (response) {
      // handle success
    //   console.log(response);

      // console.log('Category',response)
      setAllCity(response.data)
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
    axios.get(`${Api}/${Ads}?page=${Page}&Category=${Category}&keyword=${keyword}&city=${city}&price=${price}`)
    .then(function (response) {
    

      console.log('data',response.data.ads.data)
      setAds(response.data.ads.data)
    
      setCategories(response.data.Category);
      setLinks(response.data.ads.links);
      setDATAPagin(response.data.ads)

       
       
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
  getCity()
  getAds()
  getAuthUser()

 
}, [city,Category,keyword,Page,price,isLoading]);

const filterCity = (event) => {
  setIsLoading(true)
  setPage(1)
  setcity(event.target.value)
  setTimeout(() => {
    setIsLoading(false)
   }, 1000);
};

const SearchParCategorie = ($id) => {
  setIsLoading(true)
  setPage(1)
 
  setCategory($id)
 setTimeout(() => {
  setIsLoading(false)
 }, 1000);
}

const SearchParTitle = (event) => {
  setIsLoading(true)
  event.preventDefault()
  setkeyword(searchQuery.current.value)
  setPage(1)
  setTimeout(() => {
    setIsLoading(false)
   }, 1000);


}


  const handlePriceChange = (event) => {
  
    const newValue = parseInt(event.target.value); 
  
    setPriceValue(newValue)
  };

  const SubmitPriceChange = (e) => {
    e.preventDefault()  
    setIsLoading(true)
    setPrice(priceValue)
    setPage(1)
    setTimeout(() => {
      setIsLoading(false)
 
    }, 1000);
  }

  const favouriteAds = (id) => {
    console.log(id)
    axios.get(`${Api}/${favorite}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(function (response) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false)
   
      }, 1000);
      console.log('Ad favorited successfully!', response);
    })
    .catch(function (error) {
      navigate('/login')
      console.log('Error favoriting ad:', error);
    });
  };

  const DisiblefavouriteAds = (id) => {
    console.log(id)
    axios.get(`${Api}/${remove_favorite}/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(function (response) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false)
   
      }, 1000);
      console.log('Ad favorited successfully!', response);
    })
    .catch(function (error) {

      console.log('Error favoriting ad:', error);
    });
  };


  return (
    <>
    {isLoading && <Loading />}
    
    {/* Start Breadcrumbs */}
    <div className="breadcrumbs">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="breadcrumbs-content">
              <h1 className="page-title">Category</h1>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <ul className="breadcrumb-nav">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>category</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* End Breadcrumbs */}
    {/* Start Category */}
    <section className="category-page section">
      <div className="container">
        <div className="row">
          <div className="col-lg-3 col-md-4 col-12">
            <div className="category-sidebar">
              {/* Start Single Widget */}
              <div className="single-widget search">
                <h3>Search Ads</h3>
                <form onSubmit={SearchParTitle} >
                  <input   ref={searchQuery} type="text" placeholder="Search Here..." />
                  <button type="submit"><i className="lni lni-search-alt"></i></button>

                  
                </form>
              </div>
              {/* End Single Widget */}
              {/* Start Single Widget */}
              <div className="single-widget">
                <h3>All Categories</h3>
                <ul className="list">
                <li>
             <a  className={`Category_hover ${Category === '' ? 'Category_active' : ''} `} onClick={()=>{SearchParCategorie('')}} href="javascript:void(0)"><i className="fa-solid fa-globe text-primary ms-1 me-3"></i> All<span>{DATAPagin && DATAPagin.total}</span></a>
                </li>
                  {Allcategories && Allcategories.map((categorie)=>(

                  <li>
                    <a className={`Category_hover ${Category === categorie.id ? 'Category_active' : ''} `} onClick={()=>{SearchParCategorie(categorie.id)}} href="javascript:void(0)">
                    <img className="me-2" src={`http://127.0.0.1:8000/${categorie.icon}`} width="23px" height="23px"
                                            alt=""/> {categorie.Name}
                      <span>{categorie.ads_count}</span>
                    </a>
                  </li>
                  ))}
             
                </ul>
              </div>
              {/* End Single Widget */}

              {/* Start City */}
              <div className="single-widget range">
                <h3>Search par City</h3>
                <select className="form-select" aria-label="Default select example" onChange={filterCity}>
                  <option value={''} selected>All</option>
                  {AllCity && AllCity.map((city) => (

                  <option value={city}>{city}</option>
                  ))}
               
                </select>
              </div>
              {/* End City */}

              {/* Start Single Widget */}
              <div className="single-widget range search">
                <h3>Price Range</h3>
              
               <form >
                <input
                  type="range"
                  className="form-range"
                  name="range"
                  step={1}
                  min={50}
                  max={7000}
                  value={priceValue}
                  onChange={handlePriceChange}
                />
                 <button onClick={SubmitPriceChange} ><i className="lni lni-search-alt"></i></button>
                 </form>
                <div className="range-inner">
                  <input
                    type="text"
                    id="rangePrimary"
                    value={`${priceValue} MAD`}
                    onChange={handlePriceChange} // Update priceValue when input changes
                    // placeholder={`${priceValue} MAD`} // Display current priceValue as placeholder
                  />
                {/* <label></label> */}

                </div>
              </div>
              {/* End Single Widget */}

          
            
            </div>
          </div>
          <div className="col-lg-9 col-md-8 col-12">
            <div className="category-grid-list">
              <div className="row">
                <div className="col-12">
                  <div className="category-grid-topbar">
                    <div className="row align-items-center">
                      <div className="col-lg-6 col-md-6 col-12">
                        <h3 className="title">Showing {DATAPagin && DATAPagin.from}-{DATAPagin && DATAPagin.last_page} of {DATAPagin && DATAPagin.total} ads found</h3>
                      </div>
                      <div className="col-lg-6 col-md-6 col-12">
                        <nav>
                          <div
                            className="nav nav-tabs"
                            id="nav-tab"
                            role="tablist"
                          >
                            <button
                              className="nav-link active"
                              id="nav-grid-tab"
                              data-bs-toggle="tab"
                              data-bs-target="#nav-grid"
                              type="button"
                              role="tab"
                              aria-controls="nav-grid"
                              aria-selected="true"
                            >
                              <i className="lni lni-grid-alt" />
                            </button>
                         
                          </div>
                        </nav>
                      </div>
                    </div>
                  </div>
                  <div className="tab-content" id="nav-tabContent">
                    <div
                      className="tab-pane fade show active"
                      id="nav-grid"
                      role="tabpanel"
                      aria-labelledby="nav-grid-tab"
                    >
                      <div className="row">
                        {AllAds.length > 0 ? AllAds.map(ads => (

                        <div className="col-lg-4 col-md-6 col-12">
                          {/* Start Single Item */}
                          <div className="single-item-grid">
                            <div className="image">
                             
                              <Link to={`/SinglePage/${ads.id}`}>
                              <img
                                  src={`http://127.0.0.1:8000/${ads.images[0].ImageURL}`}
                                  alt="#"  className='image_io'
                                />
                              </Link>
                              <i className=" cross-badge lni lni-bolt" />
                              <span className="flat-badge sale">Sale</span>
                            </div>
                            <div className="content">
                              <a href="javascript:void(0)" className="tag">
                                {ads.categories.Name }
                              </a>
                              <h3 className="title">
                              <Link to={`/SinglePage/${ads.id}`}>
                              {ads.Title }
                              </Link>
                                
                              </h3>
                              <p className="location">
                                <a href="javascript:void(0)">
                                  <i className="lni lni-map-marker"></i>{ads.City }
                                </a>
                              </p>
                              <ul className="info d-flex  justify-content-between ">
                                <li className="price">{ads.Price } MAD</li>
                                {ads.favorites.some(
                                 (favorite) => favorite.UserID === Auth.id && favorite.AdID === ads.id
                                     ) ? 
                                
                                <li  className="">
                                <a  onClick={() =>  DisiblefavouriteAds(ads.id)} href="javascript:void(0)">
                                <i class="fa-solid fa-heart-circle-check fa-2xl" style={{ color: '#c90d0d' }}></i>
                                </a>
                                

                                </li>
                                
                                
                                :
                                
                                <li  className="">
                                <a   onClick={() => favouriteAds(ads.id)} href="javascript:void(0)">
                                <i class="fa-regular fa-heart fa-2xl" style={{ color: '#c90d0d' }}></i>
                                </a>
                                

                                </li>
                                
                                
                                
                                }
                              
                              </ul>
                            </div>
                          </div>
                          {/* End Single Item */}
                        </div>
                        )) : 
                        <div className="col-lg-12 col-md-12 col-12">
                        {/* Start Single Item */}
                        <div className="single-item-grid text-center ">
                            <img src="page_not_found/notFound.png" alt="" />
                          </div>
                          </div>
                        
                        
                        
                        }
                   
                      </div>
                      <div className="row">
                        <div className="col-12">
                          {/* Pagination */}
                          <div className=" d-flex  justify-content-center mt-5 ">
                        <Pagination links={links}  setPage={setPage} setLoading={setIsLoading}/>
                        </div>
                          {/*/ End Pagination */}
                        </div>
                      </div>
                    </div>
                  
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Category */}
  </>
  
  )
}
