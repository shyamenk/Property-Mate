import {Link, useNavigate} from 'react-router-dom'

// import {AiFillFacebook} from 'react-icons/ai'
// import {AiFillGoogleCircle} from 'react-icons/ai'
// import {AiOutlineGithub} from 'react-icons/ai'
import {ReactComponent as GoogleIcon} from '../assets/svg/google-icon.svg'
import {ReactComponent as FacebookIcon} from '../assets/svg/facebookIcon.svg'

import {ReactComponent as GithubIcon} from '../assets/svg/github-icon.svg'

import {useUserAuth} from '../store/AuthContext'
import Spinner from './Spinner'
import {toast} from 'react-toastify'
import {auth, db} from '../firebase.config.js'
import {doc, setDoc, getDoc, serverTimestamp} from 'firebase/firestore'
import {GoogleAuthProvider, signInWithPopup} from 'firebase/auth'

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
          <input
            type="email"
            className="emailInput"
            placeholder="Email"
            name="email"
            value={email}
            onChange={inputChangeHandler}
            required
          />

          <input
            type="password"
            className="passwordInput"
            placeholder="Password"
            name="password"
            value={password}
            onChange={inputChangeHandler}
            required
          />
          <Link to="/forgot-password">Forgot your password?</Link>
          <button>Login</button>
        </form>
      </div>
    </>
  )
}

export default SignIn
