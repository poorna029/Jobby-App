import {Div} from './styledComponents'

const NotFound = () => (
  <Div>
    <img
      src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
      alt="not found"
    />
    <h1 style={{color: 'white'}}>Page Not Found</h1>
    <p style={{color: 'white'}}>
      We're sorry, the page requested could not be found
    </p>
  </Div>
)
export default NotFound
