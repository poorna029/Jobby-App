import styled from 'styled-components'
import {Link} from 'react-router-dom'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: row;
  background-color: #272727;
  height: 10vh;
  justify-content: space-between;
  padding: 0px 30px;
  box-sizing: border-box;
  align-items: center;
  width: 100%;
  margin-bottom: 0px;
  padding-bottom: 0px;
  @media screen and (max-width: 576px) {
    padding: 10px 0px;
  }
`
export const Img = styled.img`
  width: 120px;
  @media screen and (max-width: 576px) {
    width: 100px;
  }
`
export const RouterContainer = styled.div`
  display: flex;
  color: white;
  gap: 20px;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
export const Button = styled.button`
  color: white;
  background-color: #4f46e5;
  align-self: center;
  height: 40px;
  outline: none;
  border: none;
  width: 120px;
  border-radius: 10px;
  @media screen and (max-width: 576px) {
    display: none;
  }
`
export const MobileContainer = styled.div`
  display: none;
  @media screen and (max-width: 576px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 20px;
  }
  @media screen and (max-width: 300px) {
    display: flex;
    flex-direction: row;
    align-items: center;
    gap: 5px;
  }
`
export const LinkComponent = styled(Link)`
  text-decoration: none;
  color: white;
  font-size: 30px;
  font-weight: 600;
`
