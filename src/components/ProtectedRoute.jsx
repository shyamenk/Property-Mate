import {Navigate, Outlet} from 'react-router-dom'
import {useUserAuth} from '../store/AuthContext'
import Spinner from './Spinner'

const ProtectedRoute = ({children}) => {
  const {loading, isloggedIn} = useUserAuth()

  if (loading) {
    return <Spinner />
  }
  return isloggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute
