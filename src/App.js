import {BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

import NavBar from './components/NavBar'
import AppRouter from './Routes/AppRoutes'

const App = () => {
  return (
    <>
      <Router>
        <NavBar />
        <AppRouter />
      </Router>
      <ToastContainer position="top-center" autoClose={1500} />
    </>
  )
}

export default App
