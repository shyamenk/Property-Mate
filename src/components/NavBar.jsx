import './NavBar.css'
import {useNavigate, useLocation} from 'react-router-dom'
import {ReactComponent as OfferIcon} from '../assets/svg/localOfferIcon.svg'
import {ReactComponent as ExploreIcon} from '../assets/svg/exploreIcon.svg'
import {ReactComponent as PersonOutlineIcon} from '../assets/svg/personOutlineIcon.svg'
// import logo from '../assets/svg/googleIcon.svg'
import logo from '../assets/PropertyMate-logos_white.png'

const NavBar = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const routePath = route => {
    if (route === location.pathname) {
      return true
    }
  }
  return (
    <>
      <div className="navbar">
        <img className="logoImage" src={logo} alt="logo" />
        <nav className="navbarNav">
          <ul className="navbarListItems">
            <li className="navbarListItem">
              <ExploreIcon
                fill={routePath('/') ? '#14adc6' : '#546981'}
                width="36px"
                height="36px"
                onClick={() => navigate('/')}
              />
              <p className="title" onClick={() => navigate('/')}>
                Explore
              </p>
            </li>

            <li className="navbarListItem">
              <OfferIcon
                fill={routePath('/offers') ? '#14adc6' : '#546981'}
                width="36px"
                height="36px"
                onClick={() => navigate('/offers')}
              />
              <p className="title" onClick={() => navigate('/offers')}>
                Offers
              </p>
            </li>
            <li className="navbarListItem">
              <PersonOutlineIcon
                fill={routePath('/sign-in') ? '#14adc6' : '#546981'}
                width="36px"
                height="36px"
                onClick={() => navigate('/sign-in')}
              />
              <p className="title" onClick={() => navigate('/sign-in')}>
                Profile
              </p>
            </li>
          </ul>
        </nav>
      </div>
    </>
  )
}

export default NavBar
