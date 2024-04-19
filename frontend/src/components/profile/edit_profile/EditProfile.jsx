import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Loading from '../../londing/londing';
import { Api, user } from '../../../Api/api';

export default function EditProfile() {
  const [auth, setAuth] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [username, setUsername] = useState('');
  const [phone, setPhone] = useState('');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [retypePassword, setRetypePassword] = useState('');
  const imageRef = useRef(null); // Create a ref for the file input
  const [passwordSuccess, setPasswordSuccess] = useState('');


  const [passwordError, setPasswordError] = useState('');


  useEffect(() => {
    getAuthUser();
  }, [isLoading]);

  const getAuthUser = () => {
    axios.get(`${Api}/${user}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('access_token')}`,
      },
    })
    .then((response) => {
      setAuth(response.data);
      setUsername(response.data.name); // Assuming Name is the username
      setPhone(response.data.phone);
      setIsLoading(false);
    })
    .catch((error) => {
      setIsLoading(false);
      console.log(error);
    });
  };

  const handleProfileUpdate = (e) => {
    e.preventDefault();
    setIsLoading(true)
    const formData = new FormData();
    formData.append('name', username);
    formData.append('phone', phone);
    if (imageRef.current && imageRef.current.files.length > 0) {
      formData.append('image', imageRef.current.files[0]); // Append selected file to formData
    }

    axios.post(`${Api}/user/profile`, formData, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`,
        'Content-Type': 'multipart/form-data',
      },
    })
    .then((response) => {
      console.log('Profile updated successfully:', response.data);
      setIsLoading(false)
      // Optionally, update the auth state or show a success message
    })
    .catch((error) => {
      console.error('Error updating profile:', error);
    });
  };

  const handlePasswordChange = async (e) => {
    e.preventDefault();

    // Validate new password and retype password
    if (newPassword !== retypePassword) {
      setPasswordError('Passwords do not match');
      setPasswordSuccess('');
      return;
    }

    // Make API call to change password
    try {
      setIsLoading(true);
      const response = await axios.put(
        `${Api}/user/password`,
        {
          currentPassword,
          newPassword,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('access_token')}`,
          },
        }
      );

      console.log('Password changed successfully:', response.data);
      setPasswordError('');
      setCurrentPassword('');
      setNewPassword('');
      setRetypePassword('');
      setPasswordSuccess('Password changed successfully!');
    } catch (error) {
      console.error('Error changing password:', error);
      setPasswordError('Current password is incorrect.');
      setPasswordSuccess('');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="col-lg-9 col-md-8 col-12">
      {isLoading ? <Loading /> : ''}
      <div className="main-content">
        {/* Profile Settings Area */}
        <div className="dashboard-block mt-0 profile-settings-block">
          <h3 className="block-title">Profile Settings</h3>
          <div className="inner-block">
            <div className="image">
              <img src={`http://127.0.0.1:8000/images/${auth && auth.image}`} alt="#" />
            </div>
            <form className="profile-setting-form" onSubmit={handleProfileUpdate}>
              <div className="row">
                <div className="col-lg-12 col-12">
                  <div className="form-group">
                    <label>Username*</label>
                    <input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      placeholder="@username"
                    />
                  </div>
                </div>
                <div className="col-lg-12 col-12">
                  <div className="form-group">
                    <label>Phone*</label>
                    <input
                      type="text"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="Phone"
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Profile Image*</label>
                    <input
                      type="file"
                      accept="image/*"
                      ref={imageRef} // Assign ref to the file input
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group button mb-0">
                    <button type="submit" className="btn">
                      Update Profile
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End Profile Settings Area */}

        <>
  {/* Start Password Change Area */}
  <div className="col-lg-12 col-md-12 col-12">
      {isLoading && <Loading />}
      <div className="main-content">
        {/* Password Change Area */}
        <div className="dashboard-block password-change-block">
          <h3 className="block-title">Change Password</h3>
          <div className="inner-block">
            <form className="default-form-style" onSubmit={handlePasswordChange}>
              <div className="row">
                <div className="col-12">
                  <div className="form-group">
                    <label>Current Password*</label>
                    <input
                      type="password"
                      value={currentPassword}
                      onChange={(e) => setCurrentPassword(e.target.value)}
                      placeholder="Enter old password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>New Password*</label>
                    <input
                      type="password"
                      value={newPassword}
                      onChange={(e) => setNewPassword(e.target.value)}
                      placeholder="Enter new password"
                      required
                    />
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group">
                    <label>Retype Password*</label>
                    <input
                      type="password"
                      value={retypePassword}
                      onChange={(e) => setRetypePassword(e.target.value)}
                      placeholder="Retype password"
                      required
                    />
                    {passwordError && (
                      <p className="text-danger">{passwordError}</p>
                    )}
                    {passwordSuccess && (
                      <p className="text-success">{passwordSuccess}</p>
                    )}
                  </div>
                </div>
                <div className="col-12">
                  <div className="form-group button mb-0">
                    <button type="submit" className="btn">
                      Update Password
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
        {/* End Password Change Area */}
      </div>
    </div>
  
  {/* End Password Change Area */}
</>

      </div>
    </div>
  );
}
