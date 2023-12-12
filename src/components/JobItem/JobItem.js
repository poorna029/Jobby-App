import {Component} from 'react'
import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BiLinkExternal} from 'react-icons/bi'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {AiFillStar} from 'react-icons/ai'

import Header from '../Header/Header'
import SimilarJobItem from '../SimilarJobItem/SimilarJobItem'
import './JobItem.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class JobItem extends Component {
  state = {
    JobDetails: {},
    similarJobsList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getProductData()
  }

  getFormattedData = job => ({
    companyLogoUrl: job.job_details.company_logo_url,
    companyWebsiteUrl: job.job_details.company_website_url,
    employmentType: job.job_details.employment_type,
    id: job.job_details.id,
    jobDescription: job.job_details.job_description,
    skills: job.job_details.skills,
    lifeAtCompany: job.job_details.life_at_company,
    location: job.job_details.location,
    packagePerAnnum: job.job_details.package_per_annum,
    rating: job.job_details.rating,
    title: job.job_details.title,
  })

  getFormattedSimilarJobData = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  getProductData = async () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = await this.getFormattedData(fetchedData)
      const updatedSimilarJobsData = await fetchedData.similar_jobs
      const modifiedSimilarJobsData = updatedSimilarJobsData.map(eachData =>
        this.getFormattedSimilarJobData(eachData),
      )

      this.setState({
        JobDetails: updatedData,
        similarJobsList: [...modifiedSimilarJobsData],
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderLoadingView = () => (
    <div className="job-details-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  onClickJobItemRetry = () => {
    this.getProductData()
  }

  renderFailureView = () => (
    <div className="job-details-error-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="error-view-image"
      />
      <h1 className="job-not-found-heading">Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="job-item-retry-button"
        onClick={this.onClickJobItemRetry}
      >
        Retry
      </button>
    </div>
  )

  renderSimilarJobs = () => {
    const {similarJobsList} = this.state
    return (
      <>
        <div className="similar-jobs-container">
          <h1 className="similar-jobs-container">Similar Jobs</h1>
          <ul className="similar-jobs">
            {similarJobsList.map(eachJob => (
              <SimilarJobItem key={eachJob.id} similarJobDetails={eachJob} />
            ))}
          </ul>
        </div>
      </>
    )
  }

  renderJobDetailsView = () => {
    const {JobDetails} = this.state
    const {
      companyLogoUrl,
      companyWebsiteUrl,
      employmentType,
      jobDescription,
      skills,
      lifeAtCompany,
      location,
      packagePerAnnum,
      rating,
      title,
    } = JobDetails
    return (
      <>
        <div className="detail-job-card">
          <div className="top-container">
            <img
              src={companyLogoUrl}
              alt="job details company logo"
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
            <ul className="location-type-container">
              <li className="location-container">
                <MdLocationOn />
                <p className="location">{location}</p>
              </li>
              <li className="job-type-container">
                <BsBriefcaseFill />
                <p className="employment-type">{employmentType}</p>
              </li>
            </ul>
            <p className="package">{packagePerAnnum}</p>
          </div>
          <hr className="h-line" />
          <div className="description-container">
            <div className="description-header">
              <h1 className="description-heading">Description</h1>
              <a href={companyWebsiteUrl} className="web-link">
                Visit
                <BiLinkExternal />
              </a>
            </div>
            <p className="description">{jobDescription}</p>
          </div>
          <div className="skills-container">
            <h1>Skills</h1>
            <ul className="skills">
              {skills.map(skill => (
                <li className="skill" key={skill.name}>
                  <img
                    src={skill.image_url}
                    alt={skill.name}
                    className="skill-logo"
                  />
                  <p>{skill.name}</p>
                </li>
              ))}
            </ul>
          </div>
          <div className="overview-container">
            <h1>Life at Company</h1>
            <div className="overview">
              <p>{lifeAtCompany.description}</p>
              <img
                src={lifeAtCompany.image_url}
                alt="life at company"
                className="overview-image"
              />
            </div>
          </div>
        </div>
        {this.renderSimilarJobs()}
      </>
    )
  }

  renderJobDetails = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderJobDetailsView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="job-detail-view-container">
          {this.renderJobDetails()}
        </div>
      </>
    )
  }
}

export default JobItem
