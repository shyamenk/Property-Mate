import {TextField} from '@mui/material'
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

          <TextField
            size="small"
            required
            type="name"
            id="outlined-required"
            label="Name"
            sx={{mt: 2}}
            name="name"
            value={name}
            onChange={inputChangeHandler}
          />

          <TextField
            autoComplete="false"
            size="small"
            required
            type="email"
            id="outlined-required"
            label="Email"
            sx={{mt: 2}}
            name="email"
            value={email}
            onChange={inputChangeHandler}
          />
          <TextField
            size="small"
            required
            type="password"
            id="outlined-required"
            label="Password"
            sx={{mt: 2, mb: 2}}
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
