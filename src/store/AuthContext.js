import {createContext, useContext, useEffect, useState} from 'react'
import {toast} from 'react-toastify'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
} from 'firebase/auth'

import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

import {auth, db} from '../firebase.config'

const UserAuthContext = createContext()

export const UserAuthContextProvider = ({children}) => {
  const [user, setUser] = useState('')

  const [error, setError] = useState('')

  const [loading, setLoading] = useState(true)

  const [isloggedIn, setIsLoggedIn] = useState(false)

  const signUp = async (formData, settoogle) => {
    const {name, email, password} = formData
    setLoading(true)
    try {
      const userCredentials = await createUserWithEmailAndPassword(
        auth,
        email,
        password,
      )
      const user = userCredentials.user
      toast.success('Thanks for signing Up, Please Login to continue')
      await updateProfile(auth.currentUser, {
        displayName: name,
      })

      const fireStoreData = {
        name: name,
        email: email,
        timestamp: serverTimestamp(),
      }

      await setDoc(doc(db, 'users', user.uid), fireStoreData)
      settoogle(prev => !prev)
    } catch (error) {
      toast.error(error.message)
      setLoading(false)
      setError(error.message)
    }
    setLoading(false)
  }

  const signIn = async (email, password, navigate) => {
    setLoading(true)
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login Successfull!')
      navigate('/profile')
    } catch (error) {
      toast.error('Invalid username/password')
      navigate('/sign-in')
      // setError(error.message)
    }
    setLoading(false)
  }

  const logOut = async navigate => {
    if (isloggedIn) {
      await auth.signOut()
      setIsLoggedIn(false)
      toast.info('You have been logged out successfully.')
      navigate('/sign-in')
    } else {
      navigate('/sign-in')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      if (user) {
        setUser(user)
        setIsLoggedIn(true)
      }
      setLoading(false)
    })
    return () => {
      unsubscribe()
    }
  }, [isloggedIn])

  const contextValue = {
    user,
    loading,
    error,
    signUp,
    signIn,
    logOut,
    isloggedIn,
  }
  return (
    <UserAuthContext.Provider value={contextValue}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = () => {
  return useContext(UserAuthContext)
}
