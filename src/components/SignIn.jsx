import {Link, useNavigate} from 'react-router-dom'

import {ReactComponent as GoogleIcon} from '../assets/svg/google-icon.svg'
import {ReactComponent as FacebookIcon} from '../assets/svg/facebookIcon.svg'

import {ReactComponent as GithubIcon} from '../assets/svg/github-icon.svg'

import {useUserAuth} from '../store/AuthContext'
import Spinner from './Spinner'
import {toast} from 'react-toastify'
import {auth, db} from '../firebase.config.js'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'
import {TextField} from '@mui/material'

const SignIn = ({
  signInHandler,
  email,
  inputChangeHandler,
  password,
  error,
}) => {
  const {loading} = useUserAuth()
  const navigate = useNavigate()

  const onGoogleAuthHandler = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user
      // Check for User
      const docRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(docRef)
      console.log({docRef})
      console.log({docSnap})

      if (!docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
      } else {
        toast.info('User Already in our Database')
      }
      navigate('/')
    } catch (error) {
      toast.error(error.message)
      navigate('/sign-in')
    }
  }

  return (
    <>
      <div className="form-container sign-in-container">
        <form autoComplete="off" onSubmit={signInHandler}>
          <h1>Sign in</h1>
          {loading && <Spinner />}
          <div className="social-container">
            <Link className="social">
              <FacebookIcon />
            </Link>
            <Link className="social">
              <GoogleIcon onClick={onGoogleAuthHandler} />
            </Link>
            <Link className="social">
              <GithubIcon />
            </Link>
          </div>
          <span>or use your account</span>
          <TextField
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
            sx={{mt: 2}}
            name="password"
            value={password}
            onChange={inputChangeHandler}
          />

          <Link to="/forgot-password">Forgot your password?</Link>
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default SignIn
