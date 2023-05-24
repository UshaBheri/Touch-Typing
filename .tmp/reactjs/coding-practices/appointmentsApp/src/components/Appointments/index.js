// Write your code here
import {Component} from 'react'
import {v4} from 'uuid'
import {format} from 'date-fns'

import AppointmentItem from '../AppointmentItem'
import './index.css'

class Appointments extends Component {
  state = {
    appointmentsList: [],
    titleInput: '',
    dateInput: '',
    isStarActive: false,
  }

  toggleIsStarred = id => {
    this.setState(prevState => ({
      appointmentsList: prevState.appointmentsList.map(eachAppointment => {
        if (id === eachAppointment.id) {
          return {...eachAppointment, isStared: !eachAppointment.isStared}
        }
        return eachAppointment
      }),
    }))
  }

  onClickStar = () => {
    const {isStarActive} = this.state
    this.setState({
      isStarActive: !isStarActive,
    })
  }

  onAddAppointment = event => {
    event.preventDefault()
    const {titleInput, dateInput} = this.state

    const formattedDate = dateInput
      ? format(new Date(dateInput), 'dd MMMM yyyy, EEEE')
      : ''

    const newAppointment = {
      id: v4(),
      title: titleInput,
      date: formattedDate,
      isStared: false,
    }

    this.setState(prevState => ({
      appointmentsList: [...prevState.appointmentsList, newAppointment],
      titleInput: '',
      dateInput: '',
    }))
  }

  onChangeDateInput = event => {
    this.setState({dateInput: event.target.value})
  }

  onChangeTitleInput = event => {
    this.setState({titleInput: event.target.value})
  }

  getFilteredList = () => {
    const {appointmentsList, isStarActive} = this.state
    if (isStarActive) {
      return appointmentsList.filter(each => each.isStared === true)
    }
    return appointmentsList
  }

  render() {
    const {titleInput, dateInput, isStarActive} = this.state
    const filteredClassName = isStarActive ? 'filter-filled' : 'filter-empty'
    const FilteredList = this.getFilteredList()

    return (
      <div className="app-container">
        <div className="appointment-container">
          <form className="myForm" onSubmit={this.onAddAppointment}>
            <h1 className="heading">Add Appointment</h1>
            <label htmlFor="title" className="label">
              TITLE
            </label>
            <input
              id="title"
              type="text"
              className="title"
              value={titleInput}
              onChange={this.onChangeTitleInput}
              placeholder="Title"
              autoComplete="OFF"
            />
            <label htmlFor="date" className="label">
              DATE
            </label>
            <input
              id="date"
              type="date"
              className="date"
              value={dateInput}
              onChange={this.onChangeDateInput}
              placeholder="Date"
            />
            <button type="submit" className="button">
              Add
            </button>
          </form>
          <img
            src="https://assets.ccbp.in/frontend/react-js/appointments-app/appointments-img.png"
            className="img"
            alt="appointments"
          />
        </div>
        <div>
          <hr className="h-line" />
          <h1 className="heading">Appointments</h1>
          <button
            type="button"
            className={`filter-style ${filteredClassName}`}
            onClick={this.onClickStar}
          >
            Starred
          </button>
        </div>
        <ul className="list">
          {FilteredList.map(eachAppoint => (
            <AppointmentItem
              key={eachAppoint.id}
              appointmentDetails={eachAppoint}
              toggleIsStarred={this.toggleIsStarred}
            />
          ))}
        </ul>
      </div>
    )
  }
}

export default Appointments
