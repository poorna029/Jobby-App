import {useState} from 'react'
import {Redirect, useParams, useHistory} from 'react-router-dom'
import Cookies from 'js-cookie'
import './LoginForm.css'

const LoginForm = () => {
  const [state, setState] = useState({
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  })
  const {id} = useParams()
  const history = useHistory()

  const onChangeUsername = event => {
    setState(pre => ({...pre, username: event.target.value}))
  }

  const onChangePassword = event => {
    setState(pre => ({...pre, password: event.target.value}))
  }

  const onSubmitSuccess = jwtToken => {
    // const {history} = props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  const onSubmitFailure = errorMsg => {
    setState({showSubmitError: true, errorMsg})
  }

  const onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      onSubmitSuccess(data.jwt_token)
    } else {
      onSubmitFailure(data.error_msg)
    }
  }

  const {username, password, showSubmitError, errorMsg} = state
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken !== undefined) {
    return <Redirect to="/" />
  }
  return (
    <div className="login-bg-container">
      <div className="login-container">
        <form className="login-form" onSubmit={onSubmitForm}>
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <label htmlFor="input_username" className="label">
            USERNAME
          </label>
          <input
            id="input_username"
            type="text"
            placeholder="Username"
            value={username}
            className="input-field"
            onChange={onChangeUsername}
          />
          <label htmlFor="input_password" className="label">
            PASSWORD
          </label>
          <input
            id="input_password"
            type="password"
            placeholder="Password"
            value={password}
            className="input-field"
            onChange={onChangePassword}
          />
          <button type="submit" className="submit-button">
            Login
          </button>
          {showSubmitError && <p className="error-message">*{errorMsg}</p>}
        </form>
      </div>
    </div>
  )
}

export default LoginForm
