import React, { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import img from '../profile/Messages/send.svg';
import { Api, add_Message, user, user_message } from '../../Api/api';

export default function Chat({ idAD, ownerAds }) {
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const chatListRef = useRef(null);
  const [Auth, setAuth] = useState('');


  const fetchChatMessages = async () => {
    try {
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      const response = await axios.get(`${Api}/${user_message}/${ownerAds.id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setMessages(response.data.messages);
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
    
    getAuth()
  }, []);

  const sendMessage = async () => {
    try {
        setIsLoading(true)
      const token = localStorage.getItem('access_token');
      if (!token) {
        throw new Error('No access token found');
      }

      const data = {
        message: inputMessage,
        ads_id: idAD,
        user_id: ownerAds.id,
      };

      const response = await axios.post(`${Api}/${add_Message}`, data, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setInputMessage(''); // Clear input field
      setIsLoading(false)
      // Scroll to bottom of chat list after new message is added
      if (chatListRef.current) {
        chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
      }
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  useEffect(() => {
    fetchChatMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ownerAds.id,isLoading]); // Fetch messages when ownerAds.id changes (dependency)

  useEffect(() => {
    if (chatListRef.current) {
      chatListRef.current.scrollTop = chatListRef.current.scrollHeight;
    }
  }, [messages]);

  return (
    <div className="style_sms offcanvas offcanvas-end" tabIndex={-1} id="offcanvasExample" aria-labelledby="offcanvasExampleLabel">
      <div className="offcanvas-header">
        <h5 className="offcanvas-title" id="offcanvasExampleLabel">
          Chat
        </h5>
        <button type="button" className="btn-close" data-bs-dismiss="offcanvas" aria-label="Close" />
      </div>
      <div className="offcanvas-body">
        <div className="col-lg-12 col-md-12 col-12">
          <div className="main-content">
            <div className="dashboard-block mt-0 pb-0">
              <h3 className="block-title mb-0">Messages</h3>
              {/* Messages Body */}
              <div className="messages-body">
                <div className="form-head">
                  <div className="row align-items-center text-center">
                    <div className="col-lg-12 col-12 p-4">
                      <h3 className="username-title">{ownerAds && ownerAds.name}</h3>
                    </div>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-12 col-12">
                    {/* Chat List */}
                    <div className="chat-list">
                    <ul className="single-chat-head" ref={chatListRef}>

                          {messages && ownerAds && messages.map((message, index) => (

                            <li key={index} className={message.from_id === ownerAds.id ? 'left' : 'right'}>
                                <div  className={ownerAds.id === message.from_id ? ' d-flex  justify-content-start ' : 'd-flex  justify-content-end '}>
                                    <div>
                                <p >{ ownerAds.id === message.from_id ? ownerAds.name : 'Me'}</p>
                                <img src={`http://127.0.0.1:8000/images/${  ownerAds.id === message.from_id ? ownerAds.image : Auth.image}`} alt="#" />
                                </div>
                                </div>
                                <p className="text">{message.message}
                                <span className="time ">{message.formatted_created_at}</span></p>
                            </li>

                            ))}

                          </ul>
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
                    {/* End Chat List */}
                  </div>
                </div>
              </div>
              {/* End Messages Body */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
