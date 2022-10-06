import React, {useContext, useMemo, useState} from 'react'
import {db} from '../firebase.config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'

import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

const AuthContext = React.createContext({
  onSignUp: (name, email, password) => {},
  onSignIn: (email, password) => {},
  onSignOut: () => {},
  isLoggedIn: false,
  loading: false,
  error: '',
  user: '',
})

export const AuthContextProvider = ({children}) => {
  const auth = getAuth()

  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [user, setUser] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  setLoading(true)
  setUser('Shyam')
  setError(null)
  setIsLoggedIn(false)
  // User SignUp and save to firebase Store Database
  const signUpHandler = async (formData, settoogle) => {
    const {name, email, password} = formData

    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )

      const user = userCredential.user
      updateProfile(auth.currentUser, {
        displayName: name,
      })
      const formDataClone = {...formData}

      delete formDataClone.password

      formDataClone.timestamp = serverTimestamp()

      await setDoc(doc(db, 'users', user.uid), formDataClone)

      settoogle(prev => !prev)

      console.log(user)
    } catch (error) {
      console.log(error)
    }
  }

  // User Sign In Handler
  const signInHandler = (email, password) => {
    console.log('Sign In Handler')
  }

  // User Logout Handler
  const signOutHandler = () => {
    console.log('Sign Out')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signUpHandler,
      signInHandler,
      signOutHandler,
      isLoggedIn,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, isLoggedIn, error],
  )
  return (
    <AuthContext.Provider value={memoedValue}>{children}</AuthContext.Provider>
  )
}
export default function useAuth() {
  return useContext(AuthContext)
}
