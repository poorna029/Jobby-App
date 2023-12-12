import {VscHome} from 'react-icons/vsc'
import {GiSuitcase} from 'react-icons/gi'
import {FiLogOut} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {Component} from 'react'
import {withRouter, Link} from 'react-router-dom'

import {
  HeaderContainer,
  Img,
  RouterContainer,
  Button,
  MobileContainer,
  LinkComponent,
} from './styledComponents'

class Header extends Component {
  handleLogout = () => {
    console.log('poorna')
    Cookies.remove('jwt')

    const {history} = this.props
    history.replace('/login')
  }

  render() {
    return (
      <HeaderContainer>
        <Img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
        />
        <RouterContainer>
          <LinkComponent to="/">Home</LinkComponent>
          <LinkComponent to="/jobs">Jobs</LinkComponent>
        </RouterContainer>
        <Button onClick={this.handleLogout}>Logout</Button>
        <MobileContainer>
          <LinkComponent to="/">
            <VscHome size={40} color="white" />
          </LinkComponent>
          <LinkComponent to="/jobs">
            <GiSuitcase size={45} color="white" />
          </LinkComponent>
          <FiLogOut onClick={this.handleLogout} size={30} color="white" />
        </MobileContainer>
      </HeaderContainer>
    )
  }
}
export default withRouter(Header)
