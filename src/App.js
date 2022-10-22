import {BrowserRouter as Router} from 'react-router-dom'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import {ThemeProvider} from '@mui/material/styles'
import NavBar from './components/NavBar'
import AppRouter from './Routes/AppRoutes'
import theme from './theme'

const App = () => {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Router>
          <NavBar />
          <AppRouter />
        </Router>
        <ToastContainer position="top-center" autoClose={1500} />
      </ThemeProvider>
    </>
  )
}

export default App
