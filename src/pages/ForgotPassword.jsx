import './ForgotPassword.css'
import forgotImage from '../assets/forgotpassword.png'
import {sendPasswordResetEmail, getAuth} from 'firebase/auth'
// import {auth} from '../firebase.config.js'
import {useState} from 'react'
import {toast} from 'react-toastify'

const ForgotPassword = () => {
  const [email, setemail] = useState('')

  const submitHandler = async e => {
    e.preventDefault()

    try {
      const auth = getAuth()

      await sendPasswordResetEmail(auth, email)
      toast.success('Success ')
    } catch (error) {
      console.log(error)
      toast.error('Could Not send the link')
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
