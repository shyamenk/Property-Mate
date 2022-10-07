import {Link} from 'react-router-dom'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {AiOutlineGithub} from 'react-icons/ai'

const SignUp = ({
  signUpHandler,
  inputChangeHandler,
  name,
  email,
  password,
  loading,
}) => {
  return (
    <>
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
            name="name"
            value={name}
            onChange={inputChangeHandler}
          />
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
          <input
            type="password"
            className="passwordInput "
            placeholder="Password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />
          <button>Sign Up</button>
        </form>
      </div>
    </>
  )
}

export default SignUp
