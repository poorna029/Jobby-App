import styled from 'styled-components'

const buttonColor = '#4f46e5'

export const JobsContainer = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
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
export const Heading = styled.h3`
  color: #cbd5e1;
`
export const Description = styled.p`
  color: white;
  text-align: justify;
`
export const JobSearch = styled.div`
  width: 70vw;
  padding: auto;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
`
export const SearchContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  margin: 10px;
  margin-left: 40px;
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
  width: 98%;
  margin: 25px auto 30px;
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
  height: 28vh;
`

export const LoaderComponent1 = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 70vw;
  margin-left: auto;
  height: 80vh;
`

export const Img = styled.img`
  width: 100px;
  //   height: 100%;
  display: block;
  padding: 20px 0px;
`
export const ColumnContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px;
`
export const ResultsContainer = styled.div`
  width: 90%;
  margin: 0px;
  display: flex;
  flex-direction: column;
  background-color: transparent;
  margin-left: 40px;
  list-style: none;
`
export const ResultContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  background-color: #272727;
  border-radius: 5px;
  margin: 10px 0px;
  padding: 25px;
`
export const CompanyRoleContainer = styled.div`
  width: 200px;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  margin-right: auto;
  padding-right: 20px;
`
export const RoleContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
`
export const RatingContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  margin-left: 0px;
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
  width: 10%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
  flex-shrink: 1;
  gap: 15px;
  margin-right: 10px;
`
export const LocationInterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-self: flex-start;
  align-items: center;
`
export const FailureImg = styled.img`
  width: 50vw;
  margin: auto;
`
