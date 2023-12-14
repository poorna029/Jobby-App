import {Switch, Redirect, Route} from 'react-router-dom'
import LoginForm from './components/LoginForm/LoginForm'
import Home from './components/Home/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Jobs from './components/Jobs/Jobs'
import JobItem from './components/JobItem/JobItem'
import NotFound from './components/NotFound/NotFound'

import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/jobs" component={Jobs} />
    <ProtectedRoute exact path="/jobs/:id" component={JobItem} />
    <Route path="/not-found" component={NotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
