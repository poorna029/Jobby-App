import styled from 'styled-components'
import {Link} from 'react-router-dom'

const buttonColor = '#4f46e5'

export const JobsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100vw;
  margin-top: 0px;
  padding: 20px 20px 0px;
  border-width: 0px;
  box-sizing: border-box;
  background-color: black;
  height: auto;
`
export const FilterComponent = styled.div`
  width: 24vw;
  padding: auto;
`
export const RoleHeading = styled.h3`
  color: #cbd5e1;
  width: auto;
  margin-left: 30px;
`

export const Heading = styled.h3`
  color: #cbd5e1;
  margin-top: 0px;
  max-width: 100%;
`
export const Description = styled.p`
  color: white;
  min-width: auto;
  line-height: 1.8rem;
  text-align: justify;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    width: ;
  }
`
export const Description1 = styled.p`
  color: white;
  width: 100%;
  line-height: 1.8rem;
  text-align: justify;
`

export const JobSearch = styled.div`
  width: 74vw;
  padding: auto;
  display: flex;
  flex-direction: column;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  margin-left: 0px;
  width: 52%;
  border: solid 1px #333;
  height: 50px;
  border-radius: 5px;
`
export const SearchInput = styled.input`
  width: 90%;
  background-color: transparent;
  height: 50px;
  outline: none;
  color: white;
  font-size: 22px;
  letter-spacing: 1.1px;
  border-width: 0px;
`
export const HR = styled.hr`
  width: 90%;
  margin: 25px auto 30px;
  height: 0.5px;
  background-color: #475569;
  border: none;
`

export const HRN = styled.hr`
  width: 100%;
  margin: 25px 0px 30px;

  height: 0.5px;
  background-color: #475569;
  border: none;
`

export const HRSimilar = styled.hr`
  width: 100%;
  margin: -35px 0px 10px;

  height: 0.5px;
  background-color: #475569;
  border: none;
`

export const ProfileContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/profile-bg.png');
  width: 90%;
  margin: 10px auto;
  background-size: 100% 100%;
  padding: 20px;
  //   background-position:;
  height: auto;
  //   object-fit: contain
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
`
export const FailedProfileContainer = styled.div`
  //   background-image: url('https://assets.ccbp.in/frontend/react-js/profile-bg.png');
  width: 90%;
  margin: auto;
  //   background-size: 100% 100%;
  padding: 20px;
  //   background-position:;
  height: 30vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  //   object-fit: contain;
`
export const ButtonContainer = styled.button`
  align-self: center;
  color: white;
  background-color: blue;
  width: 100px;
  height: 50px;
  border-radius: 5px;
  outline: none;
  border: none;
`

export const LoaderComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100vh;
`
export const Img = styled.img`
  width: 100px;
  //   height: 100%;
  display: block;
  padding: 20px 0px;
`
export const Img1 = styled.img`
  width: 100px;
  //   height: 100%;
  display: block;
  padding: 20px 0px;
`
export const FailureImg = styled.img`
  width: 50vw;
  margin: auto;
`
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  //   padding: 10px 20px;
  padding-bottom: 40px;
  background-color: black;
  align-items: center;
  height: auto;
  max-width: 100vw;
`
export const JobItemDetailsContainer = styled.li`
  max-width: 100%;
  height: auto;
  list-style: none;
`
export const ResultsContainer = styled.div`
  max-width: 100%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: black;
  padding-top: 0px;
  height: auto;
  padding-bottom: 80px;
`
export const ResultContainer = styled.div`
  width: 90%;
  padding: 30px 100px 0px;
  margin: 50px 100px 0px;
  display: flex;
  flex-direction: column;
  background-color: #272727;
  border-radius: 5px;
  //   margin: 10px 0px;
  padding-left: 25px;
  //   align-items: center;
  //   justify-content: center;
`

export const SimilarJobContainer = styled.div`
  width: 100%;
  padding: 30px 100px 0px;
  margin: auto;
  display: flex;
  flex-direction: column;
  background-color: #272727;
  border-radius: 5px;
  //   margin: 10px 0px;
  padding: 15px;
  //   align-items: center;
  //   justify-content: center;
`

export const SimilarJobsContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  background-color: black;
  border-radius: 5px;
  //   margin: 10px 0px;
  padding: 25px;
  //   align-items: center;
  //   justify-content: center;
  box-sizing: border-box;
  overflow: none;
  height: auto;
  list-style: none;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    padding: 10px;
    gap: 20px;
    min-height: 980px;
  }
`

export const CompanyRoleContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-right: auto;
  padding-right: 20px;
`
export const RoleContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: column;
`
export const RatingContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  margin-left: 30px;
`
export const LocationPackageContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-self: flex-start;
  align-items: center;
  padding: 0px 10px;
`
export const LocationContainer = styled.div`
  width: auto;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  flex-shrink: 1;
  flex-wrap: wrap;
  gap: 15px;
  margin-right: 20px;
`

export const SkillContainer = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  //   display: grid;
  // grid-template-rows:1fr 1fr
  flex-grow: 1;
  //   flex-shrink: 1;
  flex-wrap: wrap;
  gap: 15px;
  margin-right: 20px;
  list-style: none;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: row;
    // display: grid;
    // grid-template-columns: repeat(2, 1fr);
  }
`

export const LocationContainer1 = styled.li`
  width: calc(90% / 3);
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  //   display:grid;
  //   grid-template-columns:repeat(3,1fr)
  flex-grow: 1;
  flex-wrap: wrap;
  gap: 15px;
  margin-right: auto;
  @media screen and (max-width: 576px) {
    width: calc(90% / 2);
    display: flex;
    flex-direction: column;
  }
`

export const LocationInterContainer = styled.div`
  width: 90%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  height: 50px;
  margin-left: -10px;
`
export const LinkComponent = styled(Link)`
  text-decoration: none;
  color: white;
`

export const LinkComponent1 = styled(Link)`
  text-decoration: none;
  color: white;
  //   width: calc(90% / 3);
  //   padding: 30px 100px 0px;
  margin: 0px;
  margin-left: 50px;
  display: flex;
  flex-direction: column;
  background-color: #272727;
  border-radius: 5px;
  list-style: none;
  //   margin: 10px 0px;
  //   padding-left: 25px;
  //   overflow: clip;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: column;
    margin-left: 0px;
  }
`
export const RowSpBwComponent = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  height: 20px;
  margin-bottom: 20px;
`
export const SimilarJobHeading = styled.h1`
  width: auto;
  padding: 30px 0px 0px;
  margin: -50px 100px 0px;
  display: flex;
  flex-direction: column;
  background-color: black;
  color: white;
  font-weight: 600;
`
