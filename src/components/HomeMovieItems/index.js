import {Link} from 'react-router-dom'

import './index.css'

const HomeMovieItems = props => {
  const {eachMovie} = props
  const {title, posterPath, id} = eachMovie
  return (
    <Link to={`/movies/${id}`}>
      <li className="list-container">
        <img className="each-image" alt={title} src={posterPath} />
      </li>
    </Link>
  )
}
export default HomeMovieItems
