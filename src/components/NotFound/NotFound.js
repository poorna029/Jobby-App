import Header from '../Header/Header'
import './NotFound.css'

const NotFound = () => (
  <>
    <Header />
    <div className="not-found-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h1>Page Not Found</h1>
      <p>we're sorry, the page you requested could not be found.</p>
    </div>
  </>
)

export default NotFound
