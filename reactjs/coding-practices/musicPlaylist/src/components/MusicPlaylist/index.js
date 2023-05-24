import {AiOutlineDelete} from 'react-icons/ai'
import './index.css'

const MusicPlaylist = props => {
  const {userDetails, deleteUser} = props
  const {imageUrl, name, genre, duration, id} = userDetails

  const onDelete = () => {
    deleteUser(id)
  }

  return (
    <li className="music-container">
      <div className="card-container">
        <div className="genre-container">
          <img src={imageUrl} className="music-img" alt="track" />
        </div>
        <div className="container">
          <p className="name">{name}</p>
          <p className="genre">{genre}</p>
        </div>
      </div>
      <div className="delete-container">
        <p className="duration">{duration}</p>
        <button
          type="button"
          className="button"
          onChange={onDelete}
          data-testid="delete"
        >
          <AiOutlineDelete className="delete" />
        </button>
      </div>
    </li>
  )
}

export default MusicPlaylist
