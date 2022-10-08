import {Navigate, Outlet} from 'react-router-dom'
import {useUserAuth} from '../store/AuthContext'

const ProtectedRoute = ({children}) => {
  const {loading, isloggedIn} = useUserAuth()

  if (loading) {
    return <div>Loading...</div>
  }
  return isloggedIn ? <Outlet /> : <Navigate to="/sign-in" />
}

export default ProtectedRoute
