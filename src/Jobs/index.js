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
} from './styledComponents'
import InputComponent from '../InputComponent'

const profileHeading = {color: '#4f46e5'}
const profileDescription = {color: '#2c364c', fontWeight: '700'}
const searchStyle = {color: '#475569', padding: '0px 5px'}

const ProfileFetchStatus = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
}

const JobsFetchStatus = {...ProfileFetchStatus}

class Jobs extends Component {
  state = {
    profileData: {},
    profileFetchStatus: ProfileContainer.initial,
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
    this.setState(
      p => ({
        profileData: {},
        profileFetchStatus: ProfileContainer.initial,
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
    console.log('ft')

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
    console.log(newArr)

    this.setState(p => ({...p, jobType: newArr}), this.handleSearchButton)
  }

  handleSalary = e => {
    console.log(e.target.value)
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
    console.log('Token', token)
    const options = {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    }
    console.log(
      `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${searchKeyWord}`,
    )

    const res = await fetch(
      `https://apis.ccbp.in/jobs?employment_type=${empType}&minimum_package=${minPackage}&search=${searchKeyWord}`,
      options,
    )
    const data = await res.json()
    const {jobs} = data
    // console.log('Jobs', data, jobs)
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

  handleSearchButton = () => {
    const {minPackage, jobType, searchKeyWord} = this.state
    this.filteredFetch(minPackage, jobType, searchKeyWord)
  }

  //   handlePT = e => {
  //     if (e.target.checked) {
  //       this.setState(p => ({...p, jobType: [...p.jobType, e.target.value]}))
  //     }
  //   }

  //   handleInternship = e => {
  //     if (e.target.checked) {
  //       this.setState(p => ({...p, jobType: [...p.jobType, e.target.value]}))
  //     }
  //   }

  //   handleFreelance = e => {
  //     if (e.target.checked) {
  //       this.setState(p => ({...p, jobType: [...p.jobType, e.target.value]}))
  //     }
  //   }

  handleSearchInput = e => {
    // this.setState(state => ({...state, searchKeyWord: e.target.value}))

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

  //   renderSuccessJobsView=()

  renderJobsView = a => {
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
      profilFetchStatus: ProfileFetchStatus.success,
    }))
    //
  }

  fetchProfileFailure = errorMsg => {
    console.log('fpoorna')
  }

  fetchProfileDetails = async () => {
    const token = Cookies.get('jwt')
    console.log('Token', token)
    this.setState(p => ({...p, profilFetchStatus: ProfileFetchStatus.loading}))
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
    const {profile_details: profileDetails} = data
    const {
      name,
      profile_image_url: profileImg,
      short_bio: shortBio,
    } = profileDetails
    const modifiedData = {name, profileImg, shortBio}
    if (res.ok) {
      this.fetchProfileSuccess(modifiedData)
    } else {
      this.fetchProfileFailure(res.error_msg)
    }
  }

  render() {
    const {
      profileData,
      profilFetchStatus,
      jobsData,
      searchKeyWord,
      jobType,
    } = this.state
    // const filteredJobs = jobsData.filter(job =>
    //   job.title.toLowerCase().includes(searchKeyWord.toLowerCase()),
    // )

    // const f = jobType.join(',')
    // console.log(f)

    return (
      <>
        <Header />
        <JobsContainer>
          <FilterComponent>
            {this.renderProfileView(profilFetchStatus)}
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
              <FiSearch
                color="white"
                size={40}
                style={searchStyle}
                onClick={this.handleSearchButton}
              />
            </SearchContainer>
            <ResultsContainer>
              {/* <ResultContainer>
                <CompanyRoleContainer>
                  <Img src="" alt="company logo" />
                  <RoleContainer>
                    <Heading>Devops Engineer</Heading>
                    <RatingContainer>
                      <RiStarFill
                        style={{color: 'yellow', marginRight: '10px'}}
                        size={18}
                      />
                      4
                    </RatingContainer>
                  </RoleContainer>
                </CompanyRoleContainer>
                <LocationPackageContainer>
                  <LocationInterContainer>
                    <LocationContainer>
                      <MdLocationOn style={{color: 'white'}} size={30} />
                      <Description>Delhi</Description>
                    </LocationContainer>
                    <LocationContainer>
                      <BsBriefcaseFill style={{color: 'white'}} size={30} />
                      <Description>Internship</Description>
                    </LocationContainer>
                  </LocationInterContainer>
                  <Heading>10LPA</Heading>
                </LocationPackageContainer>
                <HRN />
                <Heading>Description</Heading>
                <Description>
                  Simply import the icons you need, and add them anywhere in
                  your render method. Phosphor supports tree-shaking, so your
                  bundle only includes code for the icons you use.
                </Description>
              </ResultContainer> */}
              {jobsData.map(jobData => (
                <Job key={jobData.id} jobsData={jobData} />
              ))}
            </ResultsContainer>
          </JobSearch>
        </JobsContainer>
      </>
    )
  }
}

export default Jobs
