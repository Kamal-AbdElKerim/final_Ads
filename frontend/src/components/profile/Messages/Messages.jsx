import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Api, add_Message, user, user_message } from '../../../Api/api';
import { useRef } from 'react';
import img from './send.svg';
import './Messages.css';
import Loading from '../../londing/londing';

export default function Messages() {
    const [ListChat, setListChat] = useState('');
    const [messages, setMessages] = useState('');
    const [inputMessage, setInputMessage] = useState('');
    const [isLoading, setIsLoading] = useState(true);
    const [ID, setID] = useState('');


    const [Auth, setAuth] = useState('');
    const [User, setUser] = useState('');
    const [RefrechChat, setRefrechChat] = useState(false); // State to track selected user ID

    const chatListRef = useRef(null);



    const fetchChatMessages = async () => {
        try {
          const token = localStorage.getItem('access_token');
          if (!token) {
            throw new Error('No access token found');
          }
    
          const response = await axios.get(`${Api}/messages-list-json`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });

          console.log('response',response)
          setIsLoading(false)
    
          setListChat(response.data.users);
        } catch (error) {
          console.error('Error fetching chat messages:', error);
        }
      };

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
        fetchChatMessages()
        getAuth()

       
      }, []);

      useEffect(() => {
        
        selectUser(ID)
        
      
      }, [RefrechChat]);

      useEffect(() => {
        if (chatListRef.current) {
          chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
        }
      }, [messages]);

   

      const selectUser = async (id) => {
        setID(id)
    
        
        try {
            const token = localStorage.getItem('access_token');
            if (!token) {
              throw new Error('No access token found');
            }
      
            const response = await axios.get(`${Api}/${user_message}/${id}`, {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            });
            
            setMessages(response.data.messages);
            setUser(response.data.user)

            if (chatListRef.current) {
                chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
              }
          } catch (error) {
            console.error('Error fetching chat messages:', error);
          }
      }

      const sendMessage = async () => {
        try {
          const token = localStorage.getItem('access_token');
          if (!token) {
            throw new Error('No access token found');
          }
    
          const data = {
            message: inputMessage,
            
            user_id: User.id,
          };
    
          const response = await axios.post(`${Api}/${add_Message}`, data, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
    
          setInputMessage(''); // Clear input field
          setRefrechChat(true)
          setTimeout(() => {
            setRefrechChat(false)
          }, 100);
          // Scroll to bottom of chat list after new message is added
          if (chatListRef.current) {
            chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
          }
        } catch (error) {
          console.error('Error sending message:', error);
        }
      };

  return (
    <>
          {isLoading ? <Loading  /> : ''}

      <div className="col-lg-9 col-md-8 col-12">
  <div className="main-content">
    <div className="dashboard-block mt-0 pb-0">
      <h3 className="block-title mb-0">Messages</h3>
      {/* Start Messages Body */}
      <div className="messages-body">
        <div className="form-head">
          <div className="row align-items-center">
            <div className="col-lg-5 col-12">
             
            </div>
            <div className="col-lg-7 col-12 align-right">
              <h3 className="username-title">{User && User.name}</h3>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-5 col-12">
            {/* Start User List */}
            <div className="user-list ">
                <hr />
              <ul>
                {ListChat && ListChat.map((ListCha) => (
            <li key={ListCha.user1.id}
            className={ListCha.user1.id === ID ? 'userHover ' : ''}>
                    <a onClick={() => {selectUser(ListCha.user1.id !== Auth.id ? ListCha.user1.id : ListCha.user2.id)}} href="javascript:void(0)">
                    <div className="image">
                        <img src={`http://127.0.0.1:8000/images/${ListCha.user1.id !== Auth.id ? ListCha.user1.image : ListCha.user2.image}`} alt="#" />
                    </div>
                    <span className="username">{ListCha.user1.id !== Auth.id ? ListCha.user1.name : ListCha.user2.name}</span>
                    <span className="short-message"><i class="fa-solid fa-phone me-1"></i> 0{ListCha.user1.id !== Auth.id ? ListCha.user1.phone : ListCha.user2.phone}</span>
                    <span className="unseen-message">{ListCha.ads.Title}</span>
                    </a>
             </li>
                ))}
               
               
              </ul>
            </div>
            {/* End User List */}
          </div>
          <div className="col-lg-7 col-12  ">
            <hr />
            {/* Start Chat List */}
            <div className="chat-list ">
            <ul className="single-chat-head " ref={chatListRef}>

        {messages && Auth ? messages.map((message, index) => (

                <li key={index} className={message.from_id !== Auth.id ? 'left' : 'right'}>
                    <div  className={Auth.id !== message.from_id ? ' d-flex  justify-content-start ' : 'd-flex  justify-content-end '}>
                        <div className=' d-flex   '>
                    <p >{ Auth.id !== message.from_id ? User.name : 'Me'}</p>
                    <img src={`http://127.0.0.1:8000/images/${  Auth.id !== message.from_id ? User.image : Auth.image}`} alt="#" />
                    </div>
                    </div>
                    <p className="text">{message.message}
                    <span className="time ">{message.formatted_created_at}</span></p>
                </li>

         )) : 
         
         <div className="container ">
         <div className="chat-container pt-4 pb-4">
           <div className="chat-message text-center ">
             <p className="message">Welcome to ChatAds! </p>
             <img
               src="assets/ads-chat.png"
               width="180px"
               height="150px"
               alt=""
             />
             <p className="message">How can we assist you today?</p>
           </div>
         </div>
       </div>
       
         
         
         }

</ul>

              <div className="reply-block">
              <hr />
                <div className="reply-block">
                        <input
                          name="reply"
                          type="text"
                          placeholder="Type your message here..."
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                        />
                        <button onClick={sendMessage} className="reply-btn">
                          <img src={img} alt="#" />
                        </button>
                      </div>
              </div>
            </div>
            {/* End Chat List */}
          </div>
        </div>
      </div>
      {/* End Messages Body */}
    </div>
  </div>
</div>

    </>
  )
}
