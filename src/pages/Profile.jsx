import React from 'react'
import './Profile.css'

import {useUserAuth} from '../store/AuthContext'

const Profile = () => {
  const {user} = useUserAuth()

  return (
    <>
      <h1>{user.displayName}</h1>
    </>
  )
}

export default Profile
