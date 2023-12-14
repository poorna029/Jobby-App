import {Link} from 'react-router-dom'
import './JobCard.css'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

const JobCard = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails

  return (
    <>
      <li>
        <Link to={`/jobs/${id}`} className="job-link">
          <div className="job-card">
            <div className="top-container">
              <img
                src={companyLogoUrl}
                alt="company logo"
                className="company-logo"
              />
              <div className="title-container">
                <h1 className="title">{title}</h1>
                <div className="rating-container">
                  <AiFillStar className="star-icon" />
                  <p className="rating">{rating}</p>
                </div>
              </div>
            </div>
            <div className="info-container">
              <div className="location-type-container">
                <div className="location-container">
                  <MdLocationOn />
                  <p className="location">{location}</p>
                </div>
                <div className="job-type-container">
                  <BsBriefcaseFill />
                  <p className="employment-type">{employmentType}</p>
                </div>
              </div>
              <p className="package">{packagePerAnnum}</p>
            </div>
            <hr className="h-line" />
            <div className="description-container">
              <h1 className="description-heading">Description</h1>
              <p className="description">{jobDescription}</p>
            </div>
          </div>
        </Link>
      </li>
    </>
  )
}

export default JobCard
