// Write your code here
import {formatDistanceToNow} from 'date-fns'

import './index.css'

const CommentItem = props => {
  const {commentDetails} = props
  const {id, name, comment, date, isLiked, initialClassNames} = commentDetails
  const initial = name ? name[0].toUpperCase() : ''
  const likeText = isLiked ? `button active` : `button`
  const likeImg = isLiked
    ? 'https://assets.ccbp.in/frontend/react-js/comments-app/liked-img.png'
    : 'https://assets.ccbp.in/frontend/react-js/comments-app/like-img.png'
  const postedTime = formatDistanceToNow(date)

  const onClickLike = () => {
    const {toggleIsLiked} = props
    toggleIsLiked(id)
  }

  const onDeleteComment = () => {
    const {deleteComment} = props
    deleteComment(id)
  }

  return (
    <li className="commentList">
      <div className="container">
        <div className={initialClassNames}>
          <p className="initial">{initial}</p>
        </div>
      </div>
      <div>
        <div className="username-container">
          <p className="username">{name}</p>
          <p className="time">{postedTime} ago</p>
        </div>
        <p className="comments">{comment}</p>
      </div>
      <div className="btn-container">
        <img src={likeImg} className="like-img" alt="like" />
        <button className={likeText} type="button" onClick={onClickLike}>
          Like
        </button>
      </div>
      <button
        className="button"
        type="button"
        onClick={onDeleteComment}
        data-testid="delete"
      >
        <img
          src="https://assets.ccbp.in/frontend/react-js/comments-app/delete-img.png "
          alt="delete"
          className="delete"
        />
      </button>
      <hr className="comment-line" />
    </li>
  )
}

export default CommentItem
