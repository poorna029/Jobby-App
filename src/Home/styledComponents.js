import styled from 'styled-components'

export const HomeContainer = styled.div`
  background-image: url('https://assets.ccbp.in/frontend/react-js/home-lg-bg.png');
  background-size: cover;
  //   background-position: 75% 28%;
  height: 90vh;
  background-position: 76% 37%;
  margin-top: 0px;
  padding-bottom: 0px;
  width: 100vw;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  object-fit: contain;

  @media screen and (max-width: 576px) {
    background-image: url('https://assets.ccbp.in/frontend/react-js/home-sm-bg.png');
    height: 90vh;
    background-position: 90% 50%;
  }
  //   @media screen and (min-height:750px and max-width:576px;){
  //       min-height:90vh;
  //       flex-grow:1;
  //       background-position:0% 100%;
  //   }
`
export const Title = styled.h1`
  font-size: 60px;
  color: white;
  line-height: 5rem;
  letter-spacing: 2px;
  width: 50vw;
  padding: 10px 50px;
  @media screen and (max-width: 576px) {
    width: 100vw;
    font-size: 45px;
    padding: 10px 25px;
    padding-top: 5px;
    padding-bottom: 5px;
  }
  @media screen and (max-width: 300px) {
    font-size: 25px;
    line-height: 2rem;
  }
`
export const Description = styled.p`
  color: white;
  font-size: 25px;
  width: 50vw;
  padding: 10px 50px;
  @media screen and (max-width: 576px) {
    width: 100vw;
    padding: 10px 25px;
    padding-top: 0px;
    padding-bottom: 0px;
  }
  @media screen and (max-width: 300px) {
    font-size: 15px;
    line-height: 2rem;
  }
`
export const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  width: 150px;
  margin: 10px 50px;
  display: block;
  height: 60px;
  font-size: 24px;
  border-radius: 10px;
  @media screen and (max-width: 576px) {
    margin: 10px 20px;
    width: 100px;
    height: 35px;
    border-radius: 5px;
    font-size: 14px;
  }
`
