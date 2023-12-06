import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {HomeContainer, Title, Description, Button} from './styledComponents'
import Header from '../Header'

const Home = () => {
  if (!Cookies.get('jwt')) {
    return <Redirect to="/login" />
  }

  return (
    <>
      <Header />
      <HomeContainer>
        <Title>Find The Job That Fits Your Life</Title>
        <Description>
          Millions of people are searching for jobs, salary information,company
          riveiws. Find the job that fits your abilities and potential.
        </Description>
        <Button>Find Jobs</Button>
      </HomeContainer>
    </>
  )
}
export default Home
