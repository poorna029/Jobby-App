import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {Component} from 'react'
import {
  HomeContainer,
  Title,
  Description,
  Button,
  LinkComponent,
  Total,
} from './styledComponents'
import Header from '../Header'

const Home = () => {
  if (!Cookies.get('jwt')) {
    return <Redirect to="/login" />
  }

  return (
    <Total>
      <Header />
      <HomeContainer>
        <Title>Find The Job That Fits Your Life</Title>
        <Description>
          Millions of people are searching for jobs, salary information,company
          riveiws. Find the job that fits your abilities and potential.
        </Description>
        <LinkComponent to="/jobs">
          <Button>Find Jobs</Button>
        </LinkComponent>
      </HomeContainer>
    </Total>
  )
}
export default Home
