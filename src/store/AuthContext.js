import {createContext, useContext, useEffect, useMemo, useState} from 'react'
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

  const [loading, setLoading] = useState(false)

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
      updateProfile(auth.currentUser, {
        displayName: name,
      })

      const fireStoreData = {
        name: name,
        email: email,
        timestamp: serverTimestamp(),
      }

      await setDoc(doc(db, 'users', user.uid), fireStoreData)
      setLoading(false)
      settoogle(prev => !prev)
    } catch (error) {
      toast.error(error.message)
      // console.log(error.message)
      setError(error.message)
    }
  }

  const signIn = async (email, password, navigate) => {
    try {
      await signInWithEmailAndPassword(auth, email, password)
      toast.success('Login Successfull!')
      navigate('/profile')
    } catch (error) {
      toast.error(error.message)
      navigate('/sign-in')
      // setError(error.message)
    }
  }

  const logOut = async navigate => {
    if (user !== 'Guest') {
      await auth.signOut()
      toast.info('You have been logged out successfully.')
      navigate('/sign-in')
    } else {
      navigate('/sign-in')
    }
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, currentuser => {
      // console.log('Auth', currentuser)
      if (currentuser) {
        setUser(currentuser)
      } else {
        setUser('Guest')
      }
    })

    return () => {
      unsubscribe()
    }
  }, [user])

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      signUp,
      signIn,
      logOut,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error],
  )

  return (
    <UserAuthContext.Provider value={memoedValue}>
      {children}
    </UserAuthContext.Provider>
  )
}

export const useUserAuth = () => {
  return useContext(UserAuthContext)
}
