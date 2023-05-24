import {Link} from 'react-router-dom'

import './index.css'

const CourseItem = props => {
  const {courseDetails} = props
  const {id, name, logoUrl} = courseDetails
  return (
    <li className="list-items">
      <Link to={`/courses/${id}`} className="link-item" />
      <img src={logoUrl} alt={name} />
      <p className="name">{name}</p>
    </li>
  )
}

export default CourseItem
