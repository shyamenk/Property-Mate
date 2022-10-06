import React, {useState} from 'react'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {AiOutlineGithub} from 'react-icons/ai'
import {Link} from 'react-router-dom'

import './SignIn.css'

const SignIn = () => {
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
    console.log('sig')
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
          <div className="form-container sign-up-container">
            <form autoComplete="off" onSubmit={signUpHandler}>
              <h1>Create Account</h1>
              <div className="social-container">
                <Link to="https://www.google.com" className="social">
                  <AiFillFacebook />
                </Link>
                <Link to="/www.google.com" className="social">
                  <AiFillGoogleCircle />
                </Link>
                <Link to="www.google.com" className="social">
                  <AiOutlineGithub />
                </Link>
              </div>
              <span>or use your email for registration</span>
              <input
                type="text"
                className="nameInput"
                placeholder="Name"
                id="name"
                value={name}
                onChange={inputChangeHandler}
              />
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="email"
                value={email}
                onChange={inputChangeHandler}
              />
              <input
                type="password"
                className="passwordInput "
                placeholder="Password"
                id="password"
                value={password}
                onChange={inputChangeHandler}
              />
              <button>Sign Up</button>
            </form>
          </div>
          <div className="form-container sign-in-container">
            <form autoComplete="off" onSubmit={signInHandler}>
              <h1>Sign in</h1>
              <div className="social-container">
                <Link to="www.google.com" className="social">
                  <AiFillFacebook />
                </Link>
                <Link to="www.google.com" className="social">
                  <AiFillGoogleCircle />
                </Link>
                <Link to="www.google.com" className="social">
                  <AiOutlineGithub />
                </Link>
              </div>
              <span>or use your account</span>
              <input
                type="email"
                className="emailInput"
                placeholder="Email"
                id="signInEmail"
                value={signInEmail}
                onChange={inputChangeHandler}
              />
              <input
                type="password"
                className="passwordInput"
                placeholder="Password"
                id="signInPassword"
                value={signInPassword}
                onChange={inputChangeHandler}
              />
              <Link to="/forgot-password">Forgot your password?</Link>
              <button>Sign In</button>
            </form>
          </div>
          <div className="overlay-container">
            <div className="overlay">
              <div className="overlay-panel overlay-left">
                <h1>Welcome Back!</h1>
                <p>
                  To keep connected with us please login with your personal info
                </p>
                <button
                  onClick={ghostButtonHandler}
                  className="ghost"
                  id="signIn"
                >
                  Sign In
                </button>
              </div>
              <div className="overlay-panel overlay-right">
                <h1>Hello, Friend!</h1>
                <p>Enter your personal details and start journey with us</p>
                <button
                  onClick={ghostButtonHandler}
                  className="ghost"
                  id="signUp"
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default SignIn
