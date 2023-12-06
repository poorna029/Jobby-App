import {FiSearch} from 'react-icons/fi'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsBriefcaseFill} from 'react-icons/bs'
import {RiStarFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'
import Header from '../Header'

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

class Jobs extends Component {
  state = {
    profileData: {},
    profileFetchStatus: ProfileContainer.initial,
    profileErr: '',
  }

  componentDidMount() {
    this.fetchProfileDetails()
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
    const {profileData, profilFetchStatus} = this.state

    return (
      <>
        <Header />
        <JobsContainer>
          <FilterComponent>
            {this.renderProfileView()}
            <HR />
            <ColumnContainer>
              <Heading>Type of Employment</Heading>
              <InputComponent type="checkbox" Id="FT" value="Full Time" />
              <InputComponent type="checkbox" Id="PT" value="Part Time" />
              <InputComponent type="checkbox" Id="F" value="Freelance" />
              <InputComponent type="checkbox" Id="I" value="Internship" />
            </ColumnContainer>
            <HR />
            <ColumnContainer>
              <Heading>Salary Range</Heading>

              <InputComponent
                type="radio"
                Id="10"
                Name="salary"
                value="10LPA and above"
              />
              <InputComponent
                type="radio"
                Id="20"
                Name="salary"
                value="20LPA and above"
              />
              <InputComponent
                type="radio"
                Id="30"
                Name="salary"
                value="30LPA and above"
              />
              <InputComponent
                type="radio"
                Id="40"
                Name="salary"
                value="40LPA and above"
              />
            </ColumnContainer>
          </FilterComponent>
          <JobSearch>
            <SearchContainer>
              <SearchInput type="search" style={searchStyle} />
              <FiSearch color="white" size={40} style={searchStyle} />
            </SearchContainer>
            <ResultsContainer>
              <ResultContainer>
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
              </ResultContainer>
            </ResultsContainer>
          </JobSearch>
        </JobsContainer>
      </>
    )
  }
}

export default Jobs
