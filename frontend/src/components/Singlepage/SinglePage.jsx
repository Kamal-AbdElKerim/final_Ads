import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import { Api, Singl_Page, user } from '../../Api/api';
import Loading from '../londing/londing';
import LoadingHome from '../londing/londing_Home/londingHome';
import Chat from './chat';


export default function SinglePage() {
    const { id } = useParams();
    const [Ads, setAds] = useState('');
    let [isLoading, setIsLoading] = useState(true);
    const [Auth, setAuth] = useState('');



    const singleData = () => {
       
        axios.get(`${Api}/${Singl_Page}/${id}`,
        {
              headers: {
                  Authorization: `Bearer ${localStorage.getItem("access_token" )}`,
              },
          })
        .then(function (response) {
          console.log('response',response );
          setAds(response.data.ad)
          setTimeout(() => {
            setIsLoading(false)
          }, 1000);
          
        
        
        })
        .catch(function (error) {
          setIsLoading(false)
        })
        .finally(function () {
         
        });
    }

    const getAuth = () =>{
      axios.get(`${Api}/${user}`,   {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        })
        .then(function (response) {
          // Handle success - Assuming response.data contains the chat messages
          // console.log('Auth:', response);
          setAuth(response.data)
          // setChatMessages(response.data); // Update state with fetched messages
        })
        .catch(function (error) {
          // Handle error
          console.error('Error fetching chat messages:', error);
        });
    }


    useEffect(() => {
      getAuth()
        singleData()
    }, []);

//  console.log('1111',Ads.images[0].ImageURL)
    const [currentImage, setCurrentImage] = useState('');
    const opacity = 0.6;
  
 
  
    const handleThumbnailClick = (e) => {
      // Reset opacity for all thumbnail images 
      const thumbnails = document.querySelectorAll('.img');
      thumbnails.forEach(thumbnail => {
        thumbnail.style.opacity = 1;
      });
  
      // Set opacity for the clicked thumbnail
      e.target.style.opacity = opacity;
  
      // Update current image source
      setCurrentImage(e.target.src);
    };

  return (
    <>
    {isLoading ? <LoadingHome /> : ''}
    <Chat ownerAds={Ads && Ads.users}  idAD={Ads && Ads.id} />
    {/* Start Breadcrumbs */}
    <div className="breadcrumbs">
      <div className="container">
        <div className="row align-items-center">
          <div className="col-lg-6 col-md-6 col-12">
            <div className="breadcrumbs-content">
              <h1 className="page-title">Ad Details</h1>
            </div>
          </div>
          <div className="col-lg-6 col-md-6 col-12">
            <ul className="breadcrumb-nav">
              <li>
                <a href="index.html">Home</a>
              </li>
              <li>Ad Details</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    {/* End Breadcrumbs */}
    {/* Start Item Details */}
    <section className="item-details section">
      <div className="container">
        <div className="top-area">
          <div className="row">
            <div className="col-lg-6 col-md-12 col-12">
              <div className="product-images">
              <main id="gallery">
      <div className="main-img">
        <img height={'350px'} src={currentImage ? currentImage : `http://127.0.0.1:8000/${Ads && Ads.images[0].ImageURL}`} id="current" alt="#" />
      </div>
      <div className="images">
        {console.log('image',Ads.images)}
      {Ads && Ads.images.map((img) => (

          <img
            src={`http://127.0.0.1:8000/${img.ImageURL}`}
            className="img"
            alt="#"
            onClick={handleThumbnailClick}
          />

      ))}
   
      </div>
    </main>
              </div>
            </div>
            <div className="col-lg-6 col-md-12 col-12">
              <div className="product-info">
                <h2 className="title">{Ads && Ads.Title}</h2>
                <p className="location">
                  <i className="lni lni-map-marker" />
                  <a href="javascript:void(0)">{Ads && Ads.Location}, {Ads && Ads.City}</a>
                </p>
                <h3 className="price">{Ads && Ads.Price} MAD</h3>
                <div className="list-info">
                  <h4>{Ads && Ads.categories.Name}</h4>
                  <ul>
                    <li>
                      <span>Condition:</span> {Ads && Ads.Condition}
                    </li>
                    
                  </ul>
                </div>
                <div className="contact-info">
                  <ul>
                    <li>
                      <a href="tel:+002562352589" className="call">
                        <i className="lni lni-phone-set" />
                        +0{Ads && Ads.users.phone}
                        <span>Call &amp; Get more info</span>
                      </a>
                    </li>
                    {Ads && Ads.UserID !== Auth.id && 
                    
                    
                    <li>
                        <a data-bs-toggle="offcanvas" href="#offcanvasExample" role="button" aria-controls="offcanvasExample" className="mail">
                               <i className="lni lni-envelope"></i>
                         </a>
                   </li>
                    }
                  </ul>
                </div>
                <div className="social-share">
                  <h4>Share Ad</h4>
                  <ul>
                    <li>
                      <a href="javascript:void(0)" className="facebook">
                        <i className="lni lni-facebook-filled" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="twitter">
                        <i className="lni lni-twitter-original" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="google">
                        <i className="lni lni-google" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="linkedin">
                        <i className="lni lni-linkedin-original" />
                      </a>
                    </li>
                    <li>
                      <a href="javascript:void(0)" className="pinterest">
                        <i className="lni lni-pinterest" />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="item-details-blocks">
          <div className="row">
            <div className="col-lg-8 col-md-7 col-12">
              {/* Start Single Block */}
              <div className="single-block description">
                <h3>Description</h3>
                <p>
                {Ads && Ads.Description}
                </p>
                {Ads && Ads.categories.Name === 'Vehicle' && 
                
                <ul>
                  <li>Model: {Ads.Model}</li>
                  <li>Puissance: {Ads.Puissance}</li>
                  <li>TypeCar: {Ads.TypeCar}</li>
                  
                </ul>
                
                }
             
              </div>
              {/* End Single Block */}
              {/* Start Single Block */}
              <div className="single-block tags">
                <h3>Tags</h3>
                <ul>
                  <li>
                    <a href="javascript:void(0)">Bike</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Services</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Brand</a>
                  </li>
                  <li>
                    <a href="javascript:void(0)">Popular</a>
                  </li>
                </ul>
              </div>
              {/* End Single Block */}
              {/* Start Single Block */}
              <div className="single-block comments">
                <h3>Comments</h3>
                {/* Start Single Comment */}
                <div className="single-comment">
                  <img src="assets/images/testimonial/testi2.jpg" alt="#" />
                  <div className="content">
                    <h4>Luis Havens</h4>
                    <span>25 Feb, 2023</span>
                    <p>
                      There are many variations of passages of Lorem Ipsum
                      available, but the majority have suffered alteration in some
                      form, by injected humour, or randomised words which don't
                      look even slightly believable.
                    </p>
                    <a href="javascript:void(0)" className="reply">
                      <i className="lni lni-reply" /> Reply
                    </a>
                  </div>
                </div>
                {/* End Single Comment */}
              </div>
              {/* End Single Block */}
              {/* Start Single Block */}
              <div className="single-block comment-form">
                <h3>Post a comment</h3>
                <form action="#" method="POST">
                  <div className="row">
                    <div className="col-lg-6 col-12">
                      <div className="form-box form-group">
                        <input
                          type="text"
                          name="name"
                          className="form-control form-control-custom"
                          placeholder="Your Name"
                        />
                      </div>
                    </div>
                    <div className="col-lg-6 col-12">
                      <div className="form-box form-group">
                        <input
                          type="email"
                          name="email"
                          className="form-control form-control-custom"
                          placeholder="Your Email"
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="form-box form-group">
                        <textarea
                          name="#"
                          className="form-control form-control-custom"
                          placeholder="Your Comments"
                          defaultValue={""}
                        />
                      </div>
                    </div>
                    <div className="col-12">
                      <div className="button">
                        <button type="submit" className="btn">
                          Post Comment
                        </button>
                      </div>
                    </div>
                  </div>
                </form>
              </div>
              {/* End Single Block */}
            </div>
            <div className="col-lg-4 col-md-5 col-12">
              <div className="item-details-sidebar">
                {/* Start Single Block */}
                <div className="single-block author">
                  <h3>Author</h3>
                  <div className="content">
                    <img src={`http://127.0.0.1:8000/${Ads && Ads.users.image}`} alt="#" />
                    <h4>{Ads && Ads.users.name}</h4>
                    <span>{Ads && Ads.users.created_at}</span>
                    {/* <a href="javascript:void(0)" className="see-all">
                      See All Ads
                    </a> */}
                  </div>
                </div>
                {/* End Single Block */}
                {/* Start Single Block */}
                <div className="single-block contant-seller comment-form ">
                  <h3>Contact Seller</h3>
                  <form action="#" method="POST">
                    <div className="row">
                      <div className="col-12">
                        <div className="form-box form-group">
                          <input
                            type="text"
                            name="name"
                            className="form-control form-control-custom"
                            placeholder="Your Name"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-box form-group">
                          <input
                            type="email"
                            name="email"
                            className="form-control form-control-custom"
                            placeholder="Your Email"
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="form-box form-group">
                          <textarea
                            name="#"
                            className="form-control form-control-custom"
                            placeholder="Your Message"
                            defaultValue={""}
                          />
                        </div>
                      </div>
                      <div className="col-12">
                        <div className="button">
                          <button type="submit" className="btn">
                            Send Message
                          </button>
                        </div>
                      </div>
                    </div>
                  </form>
                </div>
                {/* End Single Block */}
                {/* Start Single Block */}
                <div className="single-block ">
                  <h3>Location</h3>
                  <div className="mapouter">
                    <div className="gmap_canvas">
                      <iframe
                        width="100%"
                        height={300}
                        id="gmap_canvas"
                        src="https://maps.google.com/maps?q=2880%20Broadway,%20New%20York&t=&z=13&ie=UTF8&iwloc=&output=embed"
                        frameBorder={0}
                        scrolling="no"
                        marginHeight={0}
                        marginWidth={0}
                      />
                      <a href="https://putlocker-is.org" />
                      <br />
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                            .mapouter {\n                                                position: relative;\n                                                text-align: right;\n                                                height: 300px;\n                                                width: 100%;\n                                            }\n                                        "
                        }}
                      />
                      <a href="https://www.embedgooglemap.net">
                        google map code for website
                      </a>
                      <style
                        dangerouslySetInnerHTML={{
                          __html:
                            "\n                                            .gmap_canvas {\n                                                overflow: hidden;\n                                                background: none !important;\n                                                height: 300px;\n                                                width: 100%;\n                                            }\n                                        "
                        }}
                      />
                    </div>
                  </div>
                </div>
                {/* End Single Block */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    {/* End Item Details */}
  </>
  
  )
}
