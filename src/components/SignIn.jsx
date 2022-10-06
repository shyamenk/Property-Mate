import {Link} from 'react-router-dom'
import {AiFillFacebook} from 'react-icons/ai'
import {AiFillGoogleCircle} from 'react-icons/ai'
import {AiOutlineGithub} from 'react-icons/ai'

const SignIn = ({
  signInHandler,
  signInEmail,
  inputChangeHandler,
  signInPassword,
}) => {
  return (
    <>
      {' '}
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
    </>
  )
}

export default SignIn
