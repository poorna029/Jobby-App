import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {
  LoginContainer,
  LoginForm,
  Img,
  Label,
  Input,
  Button,
  P,
} from './styledComponents'

class Login extends Component {
  state = {username: '', password: ''}

  //   componentDidMount() {
  //     this.loginHandler()
  //   }

  handleSuccess = cookie => {
    Cookies.set('jwt', cookie)
    const {history} = this.props
    history.replace('/')
  }

  handleFailure = () => {}

  loginHandler = async () => {
    const options = {
      method: 'POST',
      body: JSON.stringify(this.state),
    }

    const res = await fetch('https://apis.ccbp.in/login', options)
    const data = await res.json()
    console.log(res)
    if (res.ok) {
      this.handleSuccess(data.jwt_token)
    } else {
      this.handleFailure()
    }
  }

  handleUserName = e => {
    const {username, password} = this.state
    e.preventDefault()
    console.log(this.state, e.target.value)
    this.setState(p => ({...p, username: e.target.value}))
    if (e.key === 'Enter' && password && username) {
      this.loginHandler()
    }
  }

  handlePassword = e => {
    e.preventDefault()
    const {username, password} = this.state
    console.log(this.state, e.target.value)
    this.setState(p => ({...p, password: e.target.value}))
    if (e.key === 'Enter' && password && username) {
      this.loginHandler()
    }
  }

  render() {
    console.log(this.state)
    if (Cookies.get('jwt')) {
      return <Redirect to="/" />
    }
    return (
      <LoginContainer>
        <LoginForm>
          <Img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
          <Label>USERNAME</Label>
          <Input
            placeholder="Username"
            type="text"
            onKeyUp={this.handleUserName}
          />
          <Label>PASSWORD</Label>
          <Input
            placeholder="Password"
            type="password"
            onKeyUp={this.handlePassword}
          />
          <Button onClick={this.loginHandler}>Login</Button>
          {false ? <P>*Username and Password didn't match</P> : null}
        </LoginForm>
      </LoginContainer>
    )
  }
}
export default Login
