import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import {BsSearch} from 'react-icons/bs'
import Header from '../Header/Header'
import UserProfile from '../UserProfile/UserProfile'
import JobCard from '../JobCard/JobCard'

import './Jobs.css'

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

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Jobs extends Component {
  state = {
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    jobsApiStatus: apiStatusConstants.initial,
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
  }

  componentDidMount() {
    this.getUserDetails()
    this.getJobs()
  }

  getJobs = async () => {
    this.setState({
      jobsApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, minimumPackage} = this.state
    let minimumPackageSelected = ''
    if (minimumPackage !== '') {
      minimumPackageSelected = parseInt(minimumPackage)
    }
    console.log(minimumPackageSelected)
    const employmentFilterString = employmentType.join(',')
    const apiUrl = `https://apis.ccbp.in/jobs?employment_type=${employmentFilterString}&minimum_package=${minimumPackageSelected}&search=${searchInput}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.jobs.map(job => ({
        companyLogoUrl: job.company_logo_url,
        employmentType: job.employment_type,
        id: job.id,
        jobDescription: job.job_description,
        location: job.location,
        packagePerAnnum: job.package_per_annum,
        rating: job.rating,
        title: job.title,
      }))
      this.setState({
        jobsList: updatedData,
        jobsApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        jobsApiStatus: apiStatusConstants.failure,
      })
    }
  }

  getUserDetails = async () => {
    this.setState({
      profileApiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(url, options)
    if (response.ok) {
      const data = await response.json() /* converted to json(), still getting promise object */
      const updatedUserProfile = {
        name: data.profile_details.name,
        profileImageUrl: data.profile_details.profile_image_url,
        shortBio: data.profile_details.short_bio,
      }

      this.setState({
        profileDetails: updatedUserProfile,
        profileApiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        profileApiStatus: apiStatusConstants.failure,
      })
    }
  }

  renderUserProfile = () => {
    const {profileDetails} = this.state
    return (
      <>
        <div className="profile-info-container">
          <UserProfile profileInfo={profileDetails} />
        </div>
      </>
    )
  }

  renderFailureProfile = () => (
    <>
      <div className="retry-container">
        <button
          type="button"
          className="retry-button"
          onClick={this.onClickRetry}
        >
          Retry
        </button>
      </div>
    </>
  )

  renderProfileStatus = () => {
    const {profileApiStatus} = this.state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return this.renderUserProfile()
      case apiStatusConstants.failure:
        return this.renderFailureProfile()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onClickRetry = () => {
    this.getUserDetails()
  }

  onClickJobsRetry = () => {
    this.getJobs()
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearch = () => {
    this.getJobs()
  }

  searchElement = () => {
    const {searchInput} = this.state
    return (
      <>
        <input
          type="search"
          value={searchInput}
          className="input-search"
          placeholder="Search"
          onChange={this.onChangeSearchInput}
        />

        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={this.onClickSearch}
        >
          {'   '}

          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  renderFailureView = () => (
    <div className="failure-jobs-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <h1>Oops! Something Went Wrong</h1>
      <p>We cannot seem to find the page you are looking for.</p>
      <button
        type="button"
        className="retry-jobs-button"
        onClick={this.onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  renderJobsListView = () => {
    const {jobsList} = this.state
    const shouldShowJobsList = jobsList.length > 0

    return shouldShowJobsList ? (
      <ul className="jobs-list">
        {jobsList.map(job => (
          <JobCard jobDetails={job} key={job.id} />
        ))}
      </ul>
    ) : (
      <div className="no-jobs-view">
        <img
          src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
          className="no-jobs-img"
          alt="no jobs"
        />
        <h1 className="no-products-heading">No Jobs Found</h1>
        <p className="no-products-description">
          We could not find any jobs. Try other filters.
        </p>
      </div>
    )
  }

  renderAllJobs = () => {
    const {jobsApiStatus} = this.state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return this.renderJobsListView()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  onSelectEmploymentOption = event => {
    const {employmentType} = this.state
    if (event.target.checked) {
      this.setState(
        {
          employmentType: [...employmentType, event.target.value],
        },
        this.getJobs,
      )
    } else {
      const updatedEmploymentTypes = employmentType.filter(
        eachItem => eachItem !== event.target.value,
      )
      this.setState({employmentType: updatedEmploymentTypes}, this.getJobs)
    }
  }

  onSalaryRangeClick = event => {
    const {minimumPackage} = this.state
    const target = event.currentTarget
    if (target.checked && minimumPackage === target.value) {
      target.checked = false
      target.click()
      this.setState({minimumPackage: ''}, this.getJobs)
    }
  }

  onSalaryRangeChange = event => {
    const {minimumPackage} = this.state
    if (minimumPackage !== event.target.value) {
      this.setState({minimumPackage: event.target.value}, this.getJobs)
    }
  }

  render() {
    return (
      <>
        <Header />
        <div className="jobs-container">
          <div className="profile-sort-container">
            <div className="search-container mobile-search">
              {this.searchElement()}
            </div>
            <div className="profile-container">
              {this.renderProfileStatus()}
            </div>
            <hr className="h-line" />
            <div className="filter-container">
              <h1 className="filter-heading">Type of Employment</h1>
              <ul className="employment-filter">
                {employmentTypesList.map(eachType => (
                  <li className="filter-item">
                    <input
                      type="checkbox"
                      id={eachType.employmentTypeId}
                      className="employment-checkbox"
                      value={eachType.employmentTypeId}
                      onChange={this.onSelectEmploymentOption}
                    />
                    <label
                      htmlFor={eachType.employmentTypeId}
                      className="employment-label"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
            <hr className="h-line" />
            <div className="filter-container">
              <h1 className="filter-heading">Salary Range</h1>
              <ul className="employment-filter">
                {salaryRangesList.map(eachType => (
                  <li className="filter-item">
                    <input
                      type="radio"
                      id={eachType.salaryRangeId}
                      value={eachType.salaryRangeId}
                      name={eachType.salaryRangeId}
                      className="salary-checkbox"
                      onClick={this.onSalaryRangeClick}
                      onChange={this.onSalaryRangeChange}
                    />
                    <label
                      htmlFor={eachType.salaryRangeId}
                      className="employment-label"
                    >
                      {eachType.label}
                    </label>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="jobs">
            <div className="search-container md-search">
              {this.searchElement()}
            </div>
            {this.renderAllJobs()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
