import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Authentication from './pages/Authentication.jsx'
import ForgotPassword from './pages/ForgotPassword'
import NavBar from './components/NavBar'
import {AuthProvider} from './store/AuthContext'
const App = () => {
  return (
    <>
      <AuthProvider>
        <Router>
          <NavBar />
          <Routes>
            <Route path="/" element={<Explore />} />
            <Route path="/offers" element={<Offers />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/sign-In" element={<Authentication />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
          </Routes>
        </Router>
      </AuthProvider>
    </>
  )
}

export default App
