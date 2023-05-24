import styled from 'styled-components'

export const MainContainer = styled.div`
  background-color: '#f5d0fe';
  height: 100vh;
  padding: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const CardContainer = styled.div`
  height: 200px;
  width: 250px;
  background-color: '#ffffff';
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const Heading = styled.h1`
  font-size: 20px;
  font-weight: 600px;
  font-family: 'Roboto';
  color: '#000000';
`

export const InlineText = styled.div`
  display: inline;
`

export const Input = styled.input`
  height: 40px;
  width: 250px;
  border-radius: 10px;
  margin-right: 10px;
`

export const Button = styled.button`
  background-color: '#d946ef';
  color: '#ffffff';
  border-radius: 5px;
  border-width: 0px;
  padding: 10px;
  cursor: pointer;
  outline: none;
`
