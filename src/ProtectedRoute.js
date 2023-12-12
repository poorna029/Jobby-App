import {Redirect, Route} from 'react-router-dom'
import Cookies from 'js-cookie'

const ProtectedRoute = props => {
  const jwt = Cookies.get('jwt')
  console.log('props', props)
  if (!jwt) {
    return <Redirect to="/login" />
  }
  return <Route {...props} />
}
export default ProtectedRoute
