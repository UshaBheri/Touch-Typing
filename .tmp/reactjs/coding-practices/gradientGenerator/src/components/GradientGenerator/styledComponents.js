// Style your elements here
import styled from 'styled-components'

export const GradientColorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-image: linear-gradient(${props => props.gradientValue});
`

export const GradientColorGeneratorContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;

  @media screen and (max-width: 768px) {
    width: 90%;
    max-width: 550px;
  }
`

export const Heading = styled.h1`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 30px;
  font-weight: bold;
  text-align: center;

  @media screen and (max-width: 768px) {
    font-size: 20px;
  }
`

export const ChooseDirection = styled.p`
  color: #ededed;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
`

export const UnOrderedList = styled.ul`
  display: flex;
  flex-wrap: wrap;
  padding: 0px;
  justify-content: space-between;
  list-style-type: none;
`

export const ColorPickerHeading = styled.p`
  color: #ededed;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
`

export const ColorPickerContainer = styled.div`
  display: flex;
  min-width: 320px;
  justify-content: space-around;
`

export const ColorPickerInputContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

export const ColorPickerValue = styled.p`
  color: #ffffff;
  font-family: 'Roboto';
  font-size: 20px;
  font-weight: 500;
`

export const CustomColorInput = styled.input`
  width: 100px;
  height: 50px;
  background-color: transparent;
  border: none;
  border-radius: 10px;
  outline: none;
  cursor: pointer;
`

export const GenerateButton = styled.button`
  color: #1e293b;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 600;
  background-color: #00c9b7;
  min-width: 5px;
  border: none;
  border-radius: 5px;
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  outline: none;
  cursor: pointer;
  margin-top: 20px;
`
