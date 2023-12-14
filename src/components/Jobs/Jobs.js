import {useEffect, useState} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
// import axios from 'axios'
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

const Jobs = () => {
  const [state, setState] = useState({
    searchInput: '',
    employmentType: [],
    minimumPackage: '',
    jobsApiStatus: apiStatusConstants.initial,
    profileDetails: {},
    profileApiStatus: apiStatusConstants.initial,
    jobsList: [],
  })

  const getUserDetails = async () => {
    setState(pre => ({...pre, profileApiStatus: apiStatusConstants.inProgress}))
    const jwtToken = Cookies.get('jwt_token')
    const url = 'https://apis.ccbp.in/profile'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    try {
      // const response = await axios.get(url, {
      //   headers: {
      //     Authorization: `Bearer ${jwtToken}`,
      //   },
      // })

      const response = await fetch(url, options)
      console.log(response)
      if (response.ok) {
        const data = await response.json() /* converted to json(), still getting promise object */
        const updatedUserProfile = {
          name: data.profile_details.name,
          profileImageUrl: data.profile_details.profile_image_url,
          shortBio: data.profile_details.short_bio,
        }

        setState(pre => ({
          ...pre,
          profileDetails: updatedUserProfile,
          profileApiStatus: apiStatusConstants.success,
        }))
      }
      // console.log(response.status, response.message)
      if (!response.ok) {
        setState(pre => ({
          ...pre,
          profileApiStatus: apiStatusConstants.failure,
        }))
      }
    } catch (e) {
      setState(pre => ({...pre, profileApiStatus: apiStatusConstants.failure}))
    }
  }

  const getJobs = async () => {
    setState(pre => ({...pre, jobsApiStatus: apiStatusConstants.inProgress}))
    const jwtToken = Cookies.get('jwt_token')
    const {searchInput, employmentType, minimumPackage} = state
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
    try {
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
        setState(pre => ({
          ...pre,
          jobsList: updatedData,
          jobsApiStatus: apiStatusConstants.success,
        }))
      } else {
        setState(pre => ({...pre, jobsApiStatus: apiStatusConstants.failure}))
      }
    } catch (e) {
      setState(pre => ({...pre, jobsApiStatus: apiStatusConstants.failure}))
    }
  }

  useEffect(() => {
    getUserDetails()
    getJobs()
  }, [])

  const renderUserProfile = () => {
    const {profileDetails} = state
    console.log('newpoorna', profileDetails)
    return (
      <div className="profile-info-container">
        <UserProfile profileInfo={profileDetails} />
      </div>
    )
  }

  const onClickRetry = () => {
    getUserDetails()
  }

  const renderFailureProfile = () => (
    <>
      <div className="retry-container">
        <button type="button" className="retry-button" onClick={onClickRetry}>
          Retry
        </button>
      </div>
    </>
  )

  const renderLoadingView = () => (
    <div className="products-loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  const renderProfileStatus = () => {
    const {profileApiStatus} = state

    switch (profileApiStatus) {
      case apiStatusConstants.success:
        return renderUserProfile()
      case apiStatusConstants.failure:
        return renderFailureProfile()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const onClickJobsRetry = () => {
    getJobs()
  }

  const onChangeSearchInput = event => {
    setState({searchInput: event.target.value})
  }

  const onClickSearch = () => {
    getJobs()
  }

  const searchElement = () => {
    const {searchInput} = state
    return (
      <>
        <input
          type="search"
          value={searchInput}
          className="input-search"
          placeholder="Search"
          onChange={onChangeSearchInput}
        />

        <button
          type="button"
          data-testid="searchButton"
          className="search-button"
          onClick={onClickSearch}
        >
          {'   '}

          <BsSearch className="search-icon" />
        </button>
      </>
    )
  }

  const renderFailureView = () => (
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
        onClick={onClickJobsRetry}
      >
        Retry
      </button>
    </div>
  )

  const renderJobsListView = () => {
    const {jobsList} = state
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

  const renderAllJobs = () => {
    const {jobsApiStatus} = state

    switch (jobsApiStatus) {
      case apiStatusConstants.success:
        return renderJobsListView()
      case apiStatusConstants.failure:
        return renderFailureView()
      case apiStatusConstants.inProgress:
        return renderLoadingView()
      default:
        return null
    }
  }

  const onSelectEmploymentOption = event => {
    const {employmentType} = state
    if (event.target.checked) {
      setState(
        {
          employmentType: [...employmentType, event.target.value],
        },
        getJobs,
      )
    } else {
      const updatedEmploymentTypes = employmentType.filter(
        eachItem => eachItem !== event.target.value,
      )
      setState({employmentType: updatedEmploymentTypes}, getJobs)
    }
  }

  const onSalaryRangeClick = event => {
    const {minimumPackage} = state
    const target = event.currentTarget
    if (target.checked && minimumPackage === target.value) {
      target.checked = false
      target.click()
      setState({minimumPackage: ''}, getJobs)
    }
  }

  const onSalaryRangeChange = event => {
    const {minimumPackage} = state
    if (minimumPackage !== event.target.value) {
      setState({minimumPackage: event.target.value}, getJobs)
    }
  }

  return (
    <>
      <Header />
      <div className="jobs-container">
        <div className="profile-sort-container">
          <div className="search-container mobile-search">
            {searchElement()}
          </div>
          <div className="profile-container">{renderProfileStatus()}</div>
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
                    onChange={onSelectEmploymentOption}
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
                    onClick={onSalaryRangeClick}
                    onChange={onSalaryRangeChange}
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
          <div className="search-container md-search">{searchElement()}</div>
          {renderAllJobs()}
        </div>
      </div>
    </>
  )
}

export default Jobs
