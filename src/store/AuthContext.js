import React, {useContext, useMemo, useState} from 'react'
import {db} from '../firebase.config'

import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
  signInWithEmailAndPassword,
} from 'firebase/auth'

import {setDoc, doc, serverTimestamp} from 'firebase/firestore'

const AuthContext = React.createContext()

export const AuthProvider = ({children}) => {
  const [user, setUser] = useState('Guest')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const auth = getAuth()

  const signUpHandler = async (formData, settoogle) => {
    const {name, email, password} = formData
    setLoading(true)
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
      setLoading(false)
      settoogle(prev => !prev)
    } catch (error) {
      console.log(error.message)
    }
  }

  const signInHandler = async (email, password, navigate) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password,
      )
      if (userCredential.user) {
        setUser(userCredential.user.displayName)
        navigate('/profile')
      }
    } catch (error) {
      setError(error.message)
      console.log(error.message)
      navigate('/sign-in')
    }
  }

  const signOutHandler = navigate => {
    auth.signOut()
    setUser('Guest')
    navigate('sign-in')
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signUpHandler,
      signInHandler,
      signOutHandler,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading],
  )

  return (
    <>
      <AuthContext.Provider value={memoedValue}>
        {children}
      </AuthContext.Provider>
    </>
  )
}

export default function useAuth() {
  return useContext(AuthContext)
}
