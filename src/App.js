import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import Explore from './pages/Explore'
import Offers from './pages/Offers'
import Profile from './pages/Profile'
import Authentication from './pages/Authentication.jsx'
import ForgotPassword from './pages/ForgotPassword'
import NavBar from './components/NavBar'
import {AuthContextProvider} from './store/AuthContext'

const App = () => {
  return (
    <>
      <AuthContextProvider>
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
      </AuthContextProvider>
    </>
  )
}

export default App
