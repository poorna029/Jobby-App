import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiFillHome} from 'react-icons/ai'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'
import './Header.css'

const Header = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  return (
    <nav className="header">
      <div className="header-md-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo"
          />
        </Link>
        <ul className="nav-items">
          <li className="nav-menu-item">
            <Link to="/" className="nav-link">
              Home
            </Link>
          </li>
          <li className="nav-menu-item">
            <Link to="/jobs" className="nav-link">
              Jobs
            </Link>
          </li>
        </ul>
        <button type="button" className="logout-button" onClick={onClickLogout}>
          Logout
        </button>
      </div>
      <div className="header-mobile-container">
        <Link to="/">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="header-website-logo-mobile"
          />
        </Link>
        <ul className="mobile-nav-container">
          <li className="mobile-nav-item">
            <Link to="/">
              <AiFillHome className="nav-icon" />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <Link to="/jobs">
              <BsFillBriefcaseFill className="nav-icon" />
            </Link>
          </li>
          <li className="mobile-nav-item">
            <FiLogOut onClick={onClickLogout} className="nav-icon" />
          </li>
        </ul>
      </div>
    </nav>
  )
}
export default withRouter(Header)
