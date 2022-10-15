import forgotImage from '../assets/forgotpassword.png'
import {sendPasswordResetEmail} from 'firebase/auth'
import {auth} from '../firebase.config.js'
import {useState} from 'react'
import {toast} from 'react-toastify'
import './ForgotPassword.css'
import {useNavigate} from 'react-router-dom'

const ForgotPassword = () => {
  const navigate = useNavigate()

  const [email, setemail] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    try {
      await sendPasswordResetEmail(auth, email)
      toast.success(
        'Password reset email send succesfully,check your email and login to continue.',
      )
      navigate('/sign-in')
    } catch (error) {
      console.log(error)
      toast.error('Please check your email address')
      navigate('/sign-in')
    }
  }

  const inputChangeHandler = e => setemail(e.target.value)

  return (
    <>
      <div className="wrapperforgot">
        <div className="forgot-container">
          <div className="imageContainer">
            <img
              style={{width: '400px', height: '450px'}}
              src={forgotImage}
              alt="images"
            />
            <div className="contectContainer">
              <h1>
                Forgot <br /> Password ?
              </h1>
              <p className="message-text">
                Enter the email address associated with your account.
              </p>
              <form onSubmit={submitHandler} className="form-conatiner">
                <input
                  className="emailInput"
                  type="email"
                  placeholder="Email"
                  onChange={inputChangeHandler}
                  value={email}
                ></input>

                <button className="forgot-button">Send</button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default ForgotPassword
