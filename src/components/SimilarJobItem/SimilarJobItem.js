import {AiFillStar} from 'react-icons/ai'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import './SimilarJobItem.css'

const SimilarJobItem = props => {
  const {similarJobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    rating,
    title,
  } = similarJobDetails
  return (
    <>
      <li className="similar-job-card">
        <div className="top-container">
          <img
            src={companyLogoUrl}
            alt="similar job company logo"
            className="company-logo"
          />
          <div className="title-container">
            <h1 className="similar-title">{title}</h1>
            <div className="rating-container">
              <AiFillStar className="star-icon" />
              <p className="rating">{rating}</p>
            </div>
          </div>
        </div>
        <h1>Description</h1>
        <p>{jobDescription}</p>
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
      </li>
    </>
  )
}

export default SimilarJobItem
