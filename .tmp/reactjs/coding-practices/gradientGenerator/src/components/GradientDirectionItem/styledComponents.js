// Style your elements here
import styled from 'styled-components'

export const ListItem = styled.li`
  width: 120px;
  margin-left: 10px;
  @media screen and(min-width:768px) {
    width: 50%;
    margin-left: 5px;
  }
`

export const DirectionButton = styled.button`
  width: 100%;
  color: ${props => (props.isActive ? '#334155' : '#1e293b')};
  opacity: ${props => (props.isActive ? 1 : 0.5)};
  padding-left: 20px;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-right: 20px;
  margin-bottom: 10px;
  font-family: 'Roboto';
  font-size: 15px;
  font-weight: 600;
  background-color: #ffffff;
  border: none;
  border-radius: 5px;
`
