import {FiSearch} from 'react-icons/fi'
import {Component} from 'react'
import Cookies from 'js-cookie'
// import {MdLocationOn} from 'react-icons/md'
// import {BsBriefcaseFill} from 'react-icons/bs'
// import {RiStarFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'
import Job from '../Job'

import {
  JobsContainer,
  FilterComponent,
  Heading,
  Description,
  JobSearch,
  SearchInput,
  HR,
  ProfileContainer,
  SearchContainer,
  Img,
  ColumnContainer,
  ResultsContainer,
  CompanyRoleContainer,
  RoleContainer,
  RatingContainer,
  ResultContainer,
  LocationPackageContainer,
  LocationContainer,
  LocationInterContainer,
  HRN,
  FailedProfileContainer,
  ButtonContainer,
  LoaderComponent,
  FailureImg,
  LoaderComponent1,
} from './styledComponents'
import InputComponent from '../InputComponent'

const profileHeading = {color: '#4f46e5'}
const profileDescription = {color: '#2c364c', fontWeight: '700'}
const searchStyle = {color: '#475569', padding: '0px 5px'}

const ProfileFetchStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

const JobsFetchStatus = {...ProfileFetchStatus}

class Jobs extends Component {
  state = {
    profileData: {},
    profileFetchStatus: ProfileFetchStatus.initial,
    profileErr: '',
    jobsData: [],
    jobsFetchStatus: JobsFetchStatus.initial,
    searchKeyWord: '',
    jobType: [],
    minPackage: 0,
  }

  componentDidMount() {
    this.fetchProfileDetails()
    this.fetchJobs()
  }

  handleReset = () => {
    const arr = ['FT', 'PT', 'F', 'I', '10', '20', '30', '40']
    arr.forEach(ele => {
      const s = document.getElementById(ele)
      s.checked = false
    })

    this.setState(
      p => ({
        profileData: {},
        profileFetchStatus: ProfileFetchStatus.initial,
        profileErr: '',
        jobsData: [],
        jobsFetchStatus: JobsFetchStatus.initial,
        searchKeyWord: '',
        jobType: [],
        minPackage: 0,
      }),
      this.fetchJobs,
    )
  }

  handleFT = e => {
    const {minPackage, jobType, searchKeyWord} = this.state

    const val = e.target.value
    let newArr = []
    let x
    switch (val) {
      case 'Full Time':
        x = 'FULLTIME'
        break
      case 'Part Time':
        x = 'PARTTIME'
        break
      case 'Freelance':
        x = 'FREELANCE'
        break
      case 'Internship':
        x = 'INTERNSHIP'
        break
      default:
        x = ''
    }
    if (e.target.checked) {
      newArr = [...jobType, x]
    } else {
      newArr = jobType.filter(jt => jt !== x)
    }

    this.setState(p => ({...p, jobType: newArr}), this.handleSearchButton)
  }

  handleSalary = e => {
    let x = 0
    switch (e.target.value) {
      case '10LPA and above':
        x = 1000000
        break
      case '20LPA and above':
        x = 2000000
        break
      case '30LPA and above':
        x = 3000000
        break
      case '40LPA and above':
        x = 4000000
        break
      default:
        break
    }
    this.setState(i => ({...i, minPackage: x}), this.handleSearchButton)
  }

  filteredFetch = async (minPackage, empTyp, searchKeyWord) => {
    let empType = ''
    if (empTyp !== []) {
      empType = empTyp.join(',')
    }
    this.setState(j => ({
      ...j,
      jobsFetchStatus: JobsFetchStatus.loading,
    }))
    const token = Cookies.get('jwt')
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const res = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${searchKeyWord}`,
      options,
    )
    const data = await res.json()
    const {jobs} = data
    const jobsData = jobs.map(e => {
      const {
        company_logo_url: companyLogoUrl,
        employment_type: employmentType,

        id,
        job_description: jobDescription,
        location,
        package_per_annum: packagePerAnnum,
        rating,
        title,
      } = e
      return {
        companyLogoUrl,
        employmentType,
        id,
        jobDescription,
        location,
        packagePerAnnum,
        rating,
        title,
      }
    })
    if (res.ok) {
      this.jobsFetchSuccess(jobsData)
    } else {
      this.jobsFetchFailure(res.error_msg)
    }
  }

  handleSearchButton = () => {
    const {minPackage, jobType, searchKeyWord} = this.state
    this.filteredFetch(minPackage, jobType, searchKeyWord)
  }

  handleSearchInput = e => {
    const {jobsData} = this.state
    this.setState(p => ({
      ...p,
      searchKeyWord: e.target.value,
    }))
  }

  jobsFetchSuccess = arr => {
    this.setState(j => ({
      ...j,
      jobsData: arr,
      jobsFetchStatus: JobsFetchStatus.success,
    }))
  }

  jobsFetchFailure = a => {
    this.setState(j => ({
      ...j,
      jobsFetchStatus: JobsFetchStatus.failure,
    }))
  }

  renderJobsStatusView = a => {
    switch (a) {
      case JobsFetchStatus.success:
        return this.renderSuccessJobsView()
      case JobsFetchStatus.failure:
        return this.renderFailureJobsView()
      case JobsFetchStatus.loading:
        return this.renderJobsLoadingView()
      default:
        return null
    }
  }

  renderSuccessJobsView = () => {
    const {jobsData} = this.state
    return (
      <ResultsContainer>
        <ul style={{listStyle: 'none'}}>
          {jobsData.map(jobData => (
            <li key={jobData.id}>
              <Job jobsData={jobData} />
            </li>
          ))}
        </ul>
      </ResultsContainer>
    )
  }

  renderFailureJobsView = () => (
    <ColumnContainer>
      <FailureImg
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
      />
      <Heading>Oops! Something Went Wrong</Heading>
      <Description>
        We Cannot Seem to find the page you are looking for{' '}
      </Description>
      <ButtonContainer>Retry</ButtonContainer>
    </ColumnContainer>
  )

  renderJobsView = fetchStatus => {
    const {
      profileData,
      profileFetchStatus,
      jobsData,
      searchKeyWord,
      jobType,
    } = this.state

    console.log('suc', profileFetchStatus)

    return (
      <>
        <Header />
        <JobsContainer>
          <FilterComponent>
            {this.renderProfileView(profileFetchStatus)}
            <HR />
            <ColumnContainer>
              <ButtonContainer
                style={{alignSelf: 'flex-start'}}
                onClick={this.handleReset}
              >
                Reset Filters
              </ButtonContainer>
              <Heading>Type of Employment</Heading>
              <InputComponent
                type="checkbox"
                Id="FT"
                value="Full Time"
                handler={this.handleFT}
              />
              <InputComponent
                type="checkbox"
                Id="PT"
                value="Part Time"
                handler={this.handleFT}
              />
              <InputComponent
                type="checkbox"
                Id="F"
                value="Freelance"
                handler={this.handleFT}
              />
              <InputComponent
                type="checkbox"
                Id="I"
                value="Internship"
                handler={this.handleFT}
              />
            </ColumnContainer>
            <HR />
            <ColumnContainer>
              <Heading>Salary Range</Heading>

              <InputComponent
                type="radio"
                Id="10"
                Name="salary"
                value="10LPA and above"
                handler={this.handleSalary}
              />
              <InputComponent
                type="radio"
                Id="20"
                Name="salary"
                value="20LPA and above"
                handler={this.handleSalary}
              />
              <InputComponent
                type="radio"
                Id="30"
                Name="salary"
                value="30LPA and above"
                handler={this.handleSalary}
              />
              <InputComponent
                type="radio"
                Id="40"
                Name="salary"
                value="40LPA and above"
                handler={this.handleSalary}
              />
            </ColumnContainer>
          </FilterComponent>
          <JobSearch>
            <SearchContainer>
              <SearchInput
                type="search"
                style={searchStyle}
                onKeyUp={this.handleSearchInput}
              />
              <ButtonContainer data-testid="searchButton">
                <FiSearch
                  color="white"
                  size={40}
                  style={searchStyle}
                  onClick={this.handleSearchButton}
                />
              </ButtonContainer>
            </SearchContainer>
            {this.renderJobsStatusView(fetchStatus)}
          </JobSearch>
        </JobsContainer>
      </>
    )
  }

  renderJobsLoadingView = () => (
    <LoaderComponent1>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#fff" height="50" width="50" />
      </div>
    </LoaderComponent1>
  )

  fetchJobs = async () => {
    this.setState(j => ({
      ...j,
      jobsFetchStatus: JobsFetchStatus.loading,
    }))
    const token = Cookies.get('jwt')
    console.log('Token', token)
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const res = await fetch('https://apis.ccbp.in/jobs', options)
    const data = await res.json()
    const {jobs} = data
    console.log('Jobs', data, jobs)
    const jobsData = jobs.map(e => {
      const {
        company_logo_url: companyLogoUrl,
        employment_type: employmentType,

        id,
        job_description: jobDescription,
        location,
        package_per_annum: packagePerAnnum,
        rating,
        title,
      } = e
      return {
        companyLogoUrl,
        employmentType,
        id,
        jobDescription,
        location,
        packagePerAnnum,
        rating,
        title,
      }
    })
    if (res.ok) {
      this.jobsFetchSuccess(jobsData)
      console.log('jobsData', jobsData)
    } else {
      this.jobsFetchFailure(res.error_msg)
    }
  }

  renderProfileView = a => {
    console.log('pr', a)
    switch (a) {
      case ProfileFetchStatus.success:
        return this.renderSuccessProfileView()
      case ProfileFetchStatus.failure:
        return this.renderFailureProfileView()
      case ProfileFetchStatus.loading:
        return this.renderProfileLoadingView()
      default:
        return null
    }
  }

  renderSuccessProfileView = () => {
    const {profileData} = this.state

    const {profileImg, shortBio, name} = profileData
    return (
      <ProfileContainer>
        <Img src={profileImg} alt="profile" />
        <Heading style={profileHeading}>{name}</Heading>
        <Description style={profileDescription}>{shortBio}</Description>
      </ProfileContainer>
    )
  }

  renderFailureProfileView = () => (
    <FailedProfileContainer>
      <ButtonContainer onClick={this.fetchProfileDetails()}>
        Retry
      </ButtonContainer>
    </FailedProfileContainer>
  )

  renderProfileLoadingView = () => (
    <LoaderComponent className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </LoaderComponent>
  )

  fetchProfileSuccess = result => {
    console.log('spoorna')
    this.setState(p => ({
      ...p,
      profileData: result,
      profileFetchStatus: ProfileFetchStatus.success,
    }))
  }

  fetchProfileFailure = errorMsg => {
    this.setState(pre => ({
      ...pre,
      profileFetchStatus: ProfileFetchStatus.failure,
    }))
  }

  fetchProfileDetails = async () => {
    const token = Cookies.get('jwt')
    console.log('Token', token)
    this.setState(p => ({...p, profileFetchStatus: ProfileFetchStatus.loading}))
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }

    const res = await fetch('https://apis.ccbp.in/profile', options)
    const data = await res.json()
    console.log(res, 'check')
    if (res.ok) {
      const {profile_details: profileDetails} = data
      const {
        name,
        profile_image_url: profileImg,
        short_bio: shortBio,
      } = profileDetails
      const modifiedData = {name, profileImg, shortBio}
      this.fetchProfileSuccess(modifiedData)
    }
    if (res.status_code) {
      this.fetchProfileFailure()
    }
  }

  render() {
    const {jobsFetchStatus} = this.state
    // return this.renderJobsView(jobsFetchStatus)
    return this.renderJobsView(jobsFetchStatus)
  }
}

export default Jobs
