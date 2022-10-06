import React, {useState} from 'react'

import SignUp from '../components/SignUp'
import SignIn from '../components/SignIn'
import Overlay from '../components/Overlay'

import './Authentication.css'

const Authentication = () => {
  const initialData = {
    name: '',
    email: '',
    password: '',
    signInEmail: '',
    signInPassword: '',
  }
  const [formData, setformData] = useState(initialData)

  const [toogle, settoogle] = useState(false)

  const {name, email, password, signInEmail, signInPassword} = formData

  const ghostButtonHandler = () => {
    settoogle(prev => !prev)
    setformData(initialData)
  }

  const inputChangeHandler = e => {
    setformData(prev => ({
      ...prev,
      [e.target.id]: e.target.value,
    }))
  }

  const signInHandler = e => {
    e.preventDefault()
    setformData(initialData)
  }

  const signUpHandler = e => {
    e.preventDefault()
    settoogle(prev => !prev)
    setformData(initialData)
  }

  return (
    <>
      <div className="wrapper">
        <div
          className={toogle ? 'container right-panel-active' : 'container'}
          id="container"
        >
          <SignUp
            signUpHandler={signUpHandler}
            inputChangeHandler={inputChangeHandler}
            name={name}
            email={email}
            password={password}
          />
          <SignIn
            signInHandler={signInHandler}
            inputChangeHandler={inputChangeHandler}
            signInEmail={signInEmail}
            signInPassword={signInPassword}
          />
          <Overlay ghostButtonHandler={ghostButtonHandler} />
        </div>
      </div>
    </>
  )
}

export default Authentication
