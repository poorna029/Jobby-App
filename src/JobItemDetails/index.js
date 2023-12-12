import {Component} from 'react'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
import {FaExternalLinkAlt} from 'react-icons/fa'
import {RiStarFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css'

import Header from '../Header'
import {
  Heading,
  Description,
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
  RoleHeading,
  RowSpBwComponent,
  LocationContainer1,
  Img1,
  SkillContainer,
  SimilarJobsContainer,
  SimilarJobHeading,
  SimilarJobContainer,
  HRSimilar,
  LinkComponent1,
  Description1,
  ButtonContainer,
  JobItemDetailsContainer,
  FailureImg,
  LoaderComponent,
} from './styledComponents'

const JobItemFetchConstants = {
  initial: 'INITIAL',
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class JobItemDetails extends Component {
  constructor(props) {
    super(props)
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.state = {
      jobsData: {},
      ID: id,
      fetchStatus: JobItemFetchConstants.initial,
    }
  }

  componentDidMount() {
    const {match} = this.props
    const {params} = match
    const {id} = params
    this.fetchJobItemDetails(id)
  }

  componentDidUpdate(prevProps, prevState) {
    const {ID} = this.state
    const {match} = this.props
    const {params} = match
    const {id} = params
    console.log('callupdate')

    if (ID !== id) {
      this.callSetUpdate()
    }
  }

  callSetUpdate = () => {
    const {match} = this.props
    const {params} = match
    const {id} = params

    this.setState(pre => ({...pre, ID: id}), this.calJobItemDetails(id))
  }

  calJobItemDetails = id => {
    this.fetchJobItemDetails(id)
  }

  handleFetchSuccess = a => {
    this.setState(p => ({
      ...p,
      jobsData: a,
      fetchStatus: JobItemFetchConstants.success,
    }))
  }

  handleFetchFailure = () => {
    this.setState(p => ({
      ...p,

      fetchStatus: JobItemFetchConstants.failure,
    }))
  }

  renderJobItemDetailsView = () => {
    const {fetchStatus} = this.state
    switch (fetchStatus) {
      case JobItemFetchConstants.loading:
        return this.renderJobItemDetailsLoadingView()
      case JobItemFetchConstants.success:
        return this.renderJobItemDetailsSuccessView()
      case JobItemFetchConstants.failure:
        return this.renderJobItemDetailsFailureView()
      default:
        return null
    }
  }

  renderJobItemDetailsSuccessView = () => {
    const {jobsData, id} = this.state
    const {
      companyLogoUrl,
      companyWebUrl,
      empType,
      JD,
      skills,
      life,
      location,
      ppa,
      rating,
      similarJobs,
      title,
    } = jobsData
    console.log('title', title)

    return (
      <JobItemDetailsContainer>
        <ColumnContainer>
          <ResultsContainer>
            <Header />
            <ResultContainer>
              <CompanyRoleContainer>
                <Img src={companyLogoUrl} alt="company logo" />
                <RoleContainer>
                  <RoleHeading>{title}</RoleHeading>
                  <RatingContainer>
                    <RiStarFill
                      style={{color: 'yellow', marginRight: '10px'}}
                      size={18}
                    />
                    <Description>{rating}</Description>
                  </RatingContainer>
                </RoleContainer>
              </CompanyRoleContainer>
              <LocationPackageContainer>
                <LocationInterContainer>
                  <LocationContainer>
                    <MdLocationOn style={{color: 'white'}} size={30} />
                    <Description>{location}</Description>
                  </LocationContainer>
                  <LocationContainer>
                    <BsFillBriefcaseFill style={{color: 'white'}} size={25} />
                    <Description>{empType}</Description>
                  </LocationContainer>
                </LocationInterContainer>
                <Heading>{ppa}</Heading>
              </LocationPackageContainer>
              <HRN />
              <RowSpBwComponent>
                <Heading>Description</Heading>
                <LocationContainer>
                  <a
                    href={companyWebUrl}
                    target="_blank"
                    style={{color: ' #4f46e5'}}
                    rel="noreferrer"
                  >
                    Visit
                    <FaExternalLinkAlt
                      style={{color: ' #4f46e5', marginLeft: '5px'}}
                      size={15}
                    />
                  </a>
                </LocationContainer>
              </RowSpBwComponent>
              <Description>{JD}</Description>
              <Heading>Skills</Heading>
              <SkillContainer>
                {skills?.map(item => (
                  <LocationContainer1 key={item.name}>
                    <Img1 src={item.image_url} alt="skill" />
                    <Description>{item.name}</Description>
                  </LocationContainer1>
                ))}
              </SkillContainer>

              <Description>{JD}</Description>
            </ResultContainer>
          </ResultsContainer>

          <SimilarJobHeading
            style={{marginRight: 'auto', paddingLeft: '-100px'}}
          >
            Similar Jobs
          </SimilarJobHeading>
          <SimilarJobsContainer>
            {similarJobs?.map(v => (
              <LinkComponent1 key={v.id} to={`/jobs/${v.id}`}>
                <SimilarJobContainer>
                  <CompanyRoleContainer>
                    <Img src={v.company_logo_url} alt="company logo" />
                    <RoleContainer>
                      <RoleHeading>{v.title}</RoleHeading>
                      <RatingContainer>
                        <RiStarFill
                          style={{color: 'yellow', marginRight: '10px'}}
                          size={18}
                        />
                        <Description>{v.rating}</Description>
                      </RatingContainer>
                    </RoleContainer>
                  </CompanyRoleContainer>
                  <LocationPackageContainer>
                    <Heading>{v.package_per_annum}</Heading>
                  </LocationPackageContainer>
                  <HRSimilar />
                  <Heading>Description</Heading>
                  <Description1>{v.job_description}</Description1>
                  <LocationInterContainer style={{marginLeft: '0px'}}>
                    <LocationContainer>
                      <MdLocationOn
                        style={{
                          color: 'white',
                          paddingLeft: '0px',
                          marginLeft: '-5px',
                        }}
                        size={30}
                      />
                      <Description>{v.location}</Description>
                    </LocationContainer>
                    <LocationContainer>
                      <BsFillBriefcaseFill style={{color: 'white'}} size={25} />
                      <Description>{v.employment_type}</Description>
                    </LocationContainer>
                  </LocationInterContainer>
                </SimilarJobContainer>
              </LinkComponent1>
            ))}
          </SimilarJobsContainer>
        </ColumnContainer>
      </JobItemDetailsContainer>
    )
  }

  renderJobItemDetailsFailureView = () => (
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

  renderJobItemDetailsLoadingView = () => (
    <LoaderComponent>
      <div className="loader-container" data-testid="loader">
        <Loader type="ThreeDots" color="#000" height="50" width="50" />
      </div>
    </LoaderComponent>
  )

  fetchJobItemDetails = async id => {
    this.setState(pre => ({...pre, fetchStatus: JobItemFetchConstants.loading}))
    const jwt = Cookies.get('jwt')

    const url = `https://apis.ccbp.in/jobs/${id}`
    const options = {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        Authorization: `Bearer ${jwt}`,
      },
    }

    const res = await fetch(url, options)
    const data = await res.json()

    const {job_details: jobDetails, similar_jobs: similarJobs} = data
    console.log(jobDetails)
    const {
      company_logo_url: companyLogoUrl,
      company_website_url: companyWebUrl,
      employment_type: empType,
      job_description: JD,
      skills,
      life_at_company: life,
      location,
      package_per_annum: ppa,
      rating,
      title,
    } = jobDetails

    const newObj = {
      companyLogoUrl,
      companyWebUrl,
      empType,
      JD,
      skills,
      life,
      location,
      ppa,
      rating,
      similarJobs,
      title,
    }

    if (res.ok) {
      this.handleFetchSuccess(newObj)
    } else {
      this.handleFetchFailure()
    }
  }

  render() {
    const {jobsData, id} = this.state
    const {
      companyLogoUrl,
      companyWebUrl,
      empType,
      JD,
      skills,
      life,
      location,
      ppa,
      rating,
      similarJobs,
      title,
    } = jobsData
    console.log('title', title)

    return this.renderJobItemDetailsView()
  }
}

export default JobItemDetails
