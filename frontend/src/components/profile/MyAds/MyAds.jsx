import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Api, Singl_Page, delete_Ads, myAds, user } from '../../../Api/api';
import Loading from '../../londing/londing';
import Swal from 'sweetalert2'
import Pagination from '../../Pagination/Pagination'
import UpdateAds from './updateMyAds.jsx'
import { Link } from 'react-router-dom';



export default function MyAds() {
  const [Data, setData] = useState([]);
  let [isLoading, setIsLoading] = useState(true);
  const [status, setStatus] = useState('all');
  let [links, setLinks] = useState([]) ;
  const [Page, setPage] = useState(1);
  const [SinglPage, setSinglPage] = useState([]);



      const getmyAds = ()=>{
      
        axios.get(`${Api}/${myAds}/${status}?page=${Page}`,
        {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
              },
          })
        .then(function (response) {
          // handle success
          console.log('myAds',response );
          setData(response.data.ads.data);
          setLinks(response.data.ads.links)
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
      
      getmyAds()
    }, [status,Page,isLoading]);

    const statuss = (status) => {
      setIsLoading(true)
      setStatus(status)

      setTimeout(() => {
        setIsLoading(false)
      }, 1000);

    }

    const deleteAds = (id) => {

      let timerInterval;
        Swal.fire({
          title: "Auto close alert!",
          html: "I will close in <b></b> milliseconds.",
          timer: 2000,
          timerProgressBar: true,
          didOpen: () => {
            Swal.showLoading();
            const timer = Swal.getPopup().querySelector("b");
            timerInterval = setInterval(() => {
              timer.textContent = `${Swal.getTimerLeft()}`;
            }, 100);
          },
          willClose: () => {
            clearInterval(timerInterval);
          }
        }).then((result) => {
          /* Read more about handling dismissals below */
          if (result.dismiss === Swal.DismissReason.timer) {
            Swal.fire({
              title: "Are you sure?",
              text: "You won't be delete this!",
              icon: "warning",
              showCancelButton: true,
              confirmButtonColor: "#3085d6",
              cancelButtonColor: "#d33",
              confirmButtonText: "Yes, delete it!"
            }).then((result) => {
              if (result.isConfirmed) {
                setIsLoading(true)
                axios.get(`${Api}/${delete_Ads}/${id}`,
                {
                      headers: {
                          Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
                      },
                  })
                .then(function (response) {
                  // console.log('deleteAds',response );
                  Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                  });
                  setIsLoading(false)
                })
                .catch(function (error) {
                  // handle error
                  // console.log(error);
                })
                .finally(function () {
                  // always executed
                });
              }
            });
          }
        });

    }

    const editAds = (id) => {
      // setIsLoading(true)
      axios.get(`${Api}/${Singl_Page}/${id}`,
      {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
            },
        })
      .then(function (response) {
     console.log(response.data.ad)
     setSinglPage(response.data.ad)
      })
      .catch(function (error) {
        // handle error 
        // console.log(error);
      })
      .finally(function () {
        // always executed
      });
       
    }
  return (
    
    <div className="col-lg-9 col-md-12 col-12">
      {isLoading ? <Loading /> : ''}
    <div className="main-content">
      {Object.keys(SinglPage).length > 0 ? <UpdateAds setIsLoading={setIsLoading} setSinglPage={setSinglPage} id={SinglPage.id} Title={SinglPage.Title} Price={SinglPage.Price} TypePrice={SinglPage.TypePrice} Description={SinglPage.Description} Condition={SinglPage.Condition} Username={SinglPage.users.name} Phone={SinglPage.users.phone} Location={SinglPage.Location} isLoading={isLoading} /> : 
      <div className="dashboard-block mt-0">
        <h3 className="block-title">My Ads</h3>
        <nav className="list-nav">
          <ul>
            <li
              className={status === 'all' ? 'active' : ''}
              style={{ cursor: "pointer" }}
            >
            <a href="javascript:void(0)" onClick={() => statuss('all')}>All Ads</a>
            </li>
            <li
              className={status === 'pending' ? 'active' : ''}
              style={{ cursor: "pointer" }}
            >
            <a href="javascript:void(0)" onClick={() => statuss('pending')}>pending</a>
            </li>
            <li
              className={status === 'approved' ? 'active' : ''}
              style={{ cursor: "pointer" }}
            >
            <a href="javascript:void(0)" onClick={() => statuss('approved')}>approved</a>
            </li>
            <li
              className={status === 'rejected' ? 'active' : ''}
              style={{ cursor: "pointer" }}
            >
            <a href="javascript:void(0)" onClick={() => statuss('rejected')}>rejected</a>
            </li>
            <li
              className={status === 'sold' ? 'active' : ''}
              style={{ cursor: "pointer" }}
            >
               <a href="javascript:void(0)" onClick={() => statuss('sold')}>sold</a>

            </li>
          </ul>
        </nav>
        {/* Start Items Area */}
        <div className="my-items">
          {/* Start Item List Title */}
          <div className="item-list-title">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-12">
                <p>Ads </p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Category</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>Status</p>
              </div>
              <div className="col-lg-3 col-md-3 col-12 align-right">
                <p>Action</p>
              </div>
            </div>
          </div>
      {Data && Data.map((ad) => (
            <div className="single-item-list">
            <div className="row align-items-center">
              <div className="col-lg-5 col-md-5 col-12">
                <div className="item-image">
                <img src={`http://127.0.0.1:8000/${ad.images[0].ImageURL}`} alt="#" />
                  <div className="content">
                    <h3 className="title">
                      <a href="javascript:void(0)">{ad.Title}</a>
                    </h3>
                    <span className="price">{ad.Price} MAD</span>
                  </div>
                </div>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>{ad.categories.Name}</p>
              </div>
              <div className="col-lg-2 col-md-2 col-12">
                <p>{ad.status}</p>
              </div>
            <div className="col-lg-3 col-md-3 col-12 align-right">
            <ul className="action-btn">
            {ad.status !== 'sold' ? 
        <>
        
               <li>
                <a onClick={() => {editAds(ad.id)}} href="javascript:void(0)">
                  <i className="lni lni-pencil" />
                </a>
              </li>
              <li>
                <Link to={`/SinglePage/${ad.id}`}><i className="lni lni-eye" /></Link>
            
              </li>
              <li>
                <a onClick={() => {deleteAds(ad.id)}} href="javascript:void(0)">
                  <i className="lni lni-trash" />
                </a>
              </li>
              </>
            :
            <li>
           <p>Done</p>
          </li>
            }
            </ul>
          </div>
              
            </div>
            </div>
                      ))}
            
        </div>
        <div className=" d-flex  justify-content-center mt-5 ">
    <Pagination links={links}  setPage={setPage} setLoading={setIsLoading}/>
    </div>
        {/* End Items Area */}
      </div>
   }
    </div>
    {console.log('Paginat',links)}
  

  </div>
  
  
  )
}
