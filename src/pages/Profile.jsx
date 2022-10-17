import React from 'react'
import './Profile.css'

import {useUserAuth} from '../store/AuthContext'

const Profile = () => {
  const {user} = useUserAuth()

  return (
    <>
      <p className="header__title">{user.displayName}</p>
    </>
  )
}

export default Profile
