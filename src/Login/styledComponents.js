import styled from 'styled-components'

export const LoginContainer = styled.div`
  background-color: black;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
export const LoginForm = styled.div`
  background-color: #121212;
  width: max(400px, 30vw);
  height: max(auto, 62vh);
  border-radius: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px 20px;

  @media screen and (max-width: 576px) {
    min-width: max(220px, 50%);
    width: 70%;
    height: min(52%, 55vh);
    padding: 30px 8px;
  }
`
export const Img = styled.img`
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100px;
  margin: 20px 30px 30px;
`
export const Label = styled.label`
  color: white;
  text-align: left;
  align-self: flex-start;
  margin: 10px 0px;
`
export const Input = styled.input`
  height: 50px;
  width: 100%;
  color: #cbd5e1;
  background-color: #121212;
  border: 1px solid #2c364c;
  border-radius: 6px;
  padding: 10px 15px;
  font-size: 16px;
`
export const Button = styled.button`
  background-color: #4f46e5;
  color: white;
  font-weight: 700;
  align-self: center;
  margin: 20px auto;
  padding: 5px auto;
  width: 100%;
  height: 50px;
  border-radius: 5px;
  font-size: 18px;
  margin-bottom: 0px;
  padding-bottom: 0px;
`
export const P = styled.p`
  color: red;
  margin-top: 0px;
  padding-top: 0px;
  align-self: flex-start;
`
