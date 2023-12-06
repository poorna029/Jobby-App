import styled from 'styled-components'

const Input = styled.input`
  width: 20px;
  height: 20px;
`
const Label = styled.label`
  color: #cbd5e1;
`
const InputContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 6px 0px;
`

const InputComponent = ({Id, value, type, Name = null, handler = null}) => (
  <InputContainer>
    <Input type={type} value={value} id={Id} name={Name} onChange={handler} />
    <Label htmlFor={Id}>{value}</Label>
  </InputContainer>
)

export default InputComponent
