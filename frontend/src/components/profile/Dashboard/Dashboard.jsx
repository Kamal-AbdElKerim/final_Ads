import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Api, Dashboard_user, remove_notification } from '../../../Api/api';
import Loading from '../../londing/londing';
import { Link } from 'react-router-dom';
import './Dashboard.css'

export default function Dashboard() {
  let [isLoading, setIsLoading] = useState(true);
  const [notifications, setnotifications] = useState('');
  let [ads, setads] = useState('') ;
  const [num_ads_approved, setnum_ads_approved] = useState('');
  const [num_ads_pending, setnum_ads_pending] = useState('');
  const [num_ads_sold, setnum_ads_sold] = useState('');

  const getData = ()=>{
      
    axios.get(`${Api}/${Dashboard_user}`,
    {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
          },
      })
    .then(function (response) {
      // handle success
      console.log('mydata',response.data.notifications);
      setnum_ads_approved(response.data.num_ads_approved);
      setnum_ads_pending(response.data.num_ads_pending);
      setnum_ads_sold(response.data.num_ads_sold);
      setads(response.data.ads)
      setnotifications(response.data.notifications)
   
      setIsLoading(false)

    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoading(false)
    })
    .finally(function () {
      // always executed
    });
}

  const delete_notification = (id)=>{
    setIsLoading(true)
    axios.get(`${Api}/${remove_notification}/${id}`,
    {
          headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
          },
      })
    .then(function (response) {
      // handle success
      console.log('mydata',response.data.notifications);
    
   
      setIsLoading(false)

    })
    .catch(function (error) {
      // handle error
      console.log(error);
      setIsLoading(false)
    })
    .finally(function () {
      // always executed
    });
}

useEffect(() => {
      
  getData()
}, [isLoading]);
  return (
    <div className="col-lg-9 col-md-8 col-12">
      {isLoading ? <Loading /> : ''}
    <div className="main-content">
      {/* Start Details Lists */}
      <div className="details-lists">
        <div className="row">
          <div className="col-lg-4 col-md-4 col-12">
            {/* Start Single List */}
            <div className="single-list">
              <div className="list-icon">
                <i className="lni lni-checkmark-circle" />
              </div>
              <h3>
               {num_ads_sold}
                <span>Ad Sold</span>
              </h3>
            </div>
            {/* End Single List */}
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            {/* Start Single List */}
            <div className="single-list two">
              <div className="list-icon">
                <i className="lni lni-bolt" />
              </div>
              <h3>
              {num_ads_approved}
                <span>Approved Ads </span>
              </h3>
            </div>
            {/* End Single List */}
          </div>
          <div className="col-lg-4 col-md-4 col-12">
            {/* Start Single List */}
            <div className="single-list three">
              <div className="list-icon">
                <i className="lni lni-emoji-sad" />
              </div>
              <h3>
              {num_ads_pending}
                <span>Pending Ads </span>
              </h3>
            </div>
            {/* End Single List */}
          </div>
        </div>
      </div>
      {/* End Details Lists */}
      <div className="row">
        <div className="col-lg-6 col-md-12 col-12 ">
          {/* Start Activity Log */}
          <div className="activity-log dashboard-block scrollable-container">
            <h3 className="block-title">My Activity Log</h3>
            <ul>
           {notifications && notifications.map((notification) => (
             <li>
             <div className="log-icon">
               <i className="lni lni-alarm" />
             </div>
             <a href="javascript:void(0)" className="title">
            {notification.message}
             </a>
             <span className="time">
             {notification.formatted_created_at}
             </span>
             <span className="remove">
               <a onClick={() => {delete_notification(notification.id)}} href="javascript:void(0)">
                 <i className="lni lni-close" />
               </a>
             </span>
           </li>
           ))}
             
         
            </ul>
          </div>
          {/* End Activity Log */}
        </div>
        <div className="col-lg-6 col-md-12 col-12">
          {/* Start Recent Items */}
          <div className="recent-items dashboard-block">
            <h3 className="block-title">Recent Ads</h3>
            <ul>
              {ads && ads.map((ad) => (
                <li>
                <div className="image">
                <Link to={`/SinglePage/${ad.id}`}>
                 <img src={`http://127.0.0.1:8000/${ad.images[0].ImageURL}`} alt="#" />
                 </Link>

                </div>
                <div className=' d-flex  justify-content-between '>
                <Link to={`/SinglePage/${ad.id}`} className="title">{ad.Title}</Link>

            
                <a href="javascript:void(0)" className="title btn  btn-primary  text-white ">
                {ad.status}
                </a>
                </div>
                <span className="time text-success ">
                {ad.Price} MAD
                </span>
              </li>
              ))}
          
             
          
            </ul>
          </div>
          {/* End Recent Items */}
        </div>
      </div>
    </div>
  </div>
  
  )
}
