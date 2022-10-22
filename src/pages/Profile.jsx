import React from 'react'
import {Link} from 'react-router-dom'
import {AiFillHome} from 'react-icons/ai'
import {useUserAuth} from '../store/AuthContext'

import './Profile.css'

const Profile = () => {
  const {user} = useUserAuth()

  return (
    <>
      <div className="profile--wrapper">
        <div className="profile--container">
          <img
            src="https://img.freepik.com/free-vector/illustration-user-avatar-icon_53876-5907.jpg?w=740&t=st=1666027485~exp=1666028085~hmac=18699cd70c86ce393da376e7e8f99b1d4b0ba57bbce6ed9c8a4e30a2c619e24a"
            alt=""
            className="profile-img"
          />

          <div className="content">
            <div className="sub-content">
              <h1>{user.displayName}</h1>
              <span>{user.email}</span>
              <p>Professional </p>
              <span className="location">India</span>
              <Link to="/create-listings">
                <button>
                  <AiFillHome />
                  Add Property
                </button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default Profile
