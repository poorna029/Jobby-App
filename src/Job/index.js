import {FiSearch} from 'react-icons/fi'
import Cookies from 'js-cookie'
import {MdLocationOn} from 'react-icons/md'
import {BsFillBriefcaseFill} from 'react-icons/bs'
// import {BsFillBriefcaseFill} from 'react-icons/bs'
import {RiStarFill} from 'react-icons/ri'
import Loader from 'react-loader-spinner'

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
  RoleHeading,
  LinkComponent,
} from './styledComponents'

const Job = ({jobsData}) => {
  const {
    companyLogoUrl,
    employmentType,
    id,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
    name,
  } = jobsData
  return (
    <LinkComponent to={`/jobItemDetails/${id}`}>
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
              <Description>{employmentType}</Description>
            </LocationContainer>
          </LocationInterContainer>
          <Heading>{packagePerAnnum}</Heading>
        </LocationPackageContainer>
        <HRN />
        <Heading>Description</Heading>
        <Description>{jobDescription}</Description>
      </ResultContainer>
    </LinkComponent>
  )
}
export default Job
