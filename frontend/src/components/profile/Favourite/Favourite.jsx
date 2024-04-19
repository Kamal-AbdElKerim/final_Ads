import React, { useEffect, useState } from 'react'
import { Api, list_favorite, remove_favorite } from '../../../Api/api';
import axios from 'axios';
import Pagination from '../../Pagination/Pagination';
import Loading from '../../londing/londing';
import { Link } from 'react-router-dom';

export default function Favourite() {
  const [isLoading, setIsLoading] = useState(true);
  const [favorite, setfavorite] = useState('');
  let [links, setLinks] = useState([]) ;
  const [Page, setPage] = useState(1);




  const favouriteAds = () => {
    
    axios.get(`${Api}/${list_favorite}?page=${Page}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    })
    .then(function (response) {
    
      setfavorite(response.data.data)
      setLinks(response.data.links)
    
      console.log('Ad favorited successfully!', response.data.data);
      setIsLoading(false)
    })
    .catch(function (error) {
      setIsLoading(false)
      console.log('Error favoriting ad:', error);
    });
  };

  useEffect(() => {
    favouriteAds()
   
  }, [isLoading]);

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
    <div className="col-lg-9 col-md-12 col-12">
        {isLoading && <Loading />}
    <div className="main-content">
      <div className="dashboard-block mt-0">
        <h3 className="block-title">My Favorites</h3>
        <nav className="list-nav">
          <ul>
            <li className="active">
              <a href="javascript:void(0)">
               
                <span>
                 55
                </span>
              </a>
            </li>
          </ul>
        </nav>
        {/* Start Items Area */}
        <div className="my-items">
          {/* Start List Title */}
          <div className="item-list-title">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-12">
                <p>Job Title</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Category</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Condition</p>
              </div>
              <div className="col-lg-3 col-md-3 col-12 align-right">
                <p>Action</p>
              </div>
            </div>
          </div>
          {/* Start Single List */}
          {favorite && favorite.map((fav) => (

          <div className="single-item-list">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-12">
                <div className="item-image">
                  <img
                    src={`http://127.0.0.1:8000/${fav.ads.images[0].ImageURL}`}
                    alt="#"
                  />
                  <div className="content">
                    <h3 className="title">
                      <a href="javascript:void(0)">
                      {fav.ads.Title}
                      </a>
                    </h3>
                    <span className="price text-success  ">
                    {fav.ads.Price} MAD
                    </span>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>
                {fav.ads.categories.Name}
                </p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>
                {fav.ads.Condition}
                </p>
              </div>
              <div className="col-lg-3 col-md-3 col-12 align-right">
                <ul className="action-btn">
                  <li>
                  <Link to={`/SinglePage/${fav.ads.id}`}><i className="lni lni-eye" /></Link>
                  </li>
                  <li>
                  <a  onClick={() =>  DisiblefavouriteAds(fav.ads.id)} href="javascript:void(0)">
                                <i class="fa-solid fa-heart-circle-check fa-xl" style={{ color: '#c90d0d' }}></i>
                                </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
          ))}
        </div>
        <div className=" d-flex  justify-content-center mt-5 ">

        <Pagination links={links}  setPage={setPage} setLoading={setIsLoading}/>

        {/* End Items Area */}
      </div>
      </div>
    </div>
  </div>
  
  )
}
