import {useUserAuth} from '../store/AuthContext'
import Spinner from './Spinner'

const SignUp = ({signUpHandler, inputChangeHandler, name, email, password}) => {
  const {loading} = useUserAuth()
  return (
    <>
      <div className="form-container sign-up-container">
        <form autoComplete="off" onSubmit={signUpHandler}>
          <h1>Create Account</h1>
          {loading && <Spinner />}

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
