import './index.css'

const SimilarMovies = props => {
  const {eachMovie} = props
  const {posterPath, title} = eachMovie
  return (
    <div className="similar-container">
      <img src={posterPath} alt={title} className="similar-image" />
    </div>
  )
}
export default SimilarMovies
