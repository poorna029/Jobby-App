import {Route, Switch} from 'react-router-dom'
import ProtectedRoute from './ProtectedRoute'
import Login from './Login'
import Home from './Home'
import Jobs from './Jobs'
import JobItemDetails from './JobItemDetails'

import './App.css'

// These are the lists used in the application. You can move them to any component needed.
const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

// Replace your code here
const App = () => (
  <>
    <Switch>
      <ProtectedRoute exact path="/" component={Home} />
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/jobs" component={Jobs} />
      <ProtectedRoute exact path="/jobs/:id" component={JobItemDetails} />
    </Switch>
    <Login />
  </>
)

export default App
