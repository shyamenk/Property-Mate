import React, {useState} from 'react'
import {useNavigate} from 'react-router-dom'

import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Overlay from '../components/Overlay'

import './Authentication.css'

import useAuth from '../store/AuthContext.js'

const Authentication = () => {
  const initialData = {
    name: '',
    email: '',
    password: '',
  }

  const navigate = useNavigate()

  const [formData, setformData] = useState(initialData)

  const [toogle, settoogle] = useState(false)

  const {name, email, password} = formData

  const {signUpHandler, signInHandler} = useAuth()

  const ghostButtonHandler = () => {
    settoogle(prev => !prev)
    setformData(initialData)
  }

  const inputChangeHandler = e => {
    setformData(prev => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const signInSubmitHandler = e => {
    e.preventDefault()
    signInHandler(email, password)
    navigate('/')
  }

  const signUpSubmitHandler = event => {
    event.preventDefault()
    signUpHandler(formData, settoogle, setformData)
    console.log('SignUp Finished')
  }

  return (
    <>
      <div className="wrapper">
        <div
          className={toogle ? 'container right-panel-active' : 'container'}
          id="container"
        >
          <SignUp
            signUpHandler={signUpSubmitHandler}
            inputChangeHandler={inputChangeHandler}
            name={name}
            email={email}
            password={password}
          />
          <SignIn
            signInHandler={signInSubmitHandler}
            inputChangeHandler={inputChangeHandler}
            email={email}
            password={password}
          />
          <Overlay ghostButtonHandler={ghostButtonHandler} />
        </div>
      </div>
    </>
  )
}

export default Authentication
