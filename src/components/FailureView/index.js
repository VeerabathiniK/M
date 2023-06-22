import './index.css'

const FailureView = props => {
  const {tryAgain} = props
  const onTryAgain = () => {
    tryAgain()
  }

  return (
    <div className="failure-container">
      <div className="image-container">
        <img
          src="https://res.cloudinary.com/dobt9633l/image/upload/v1683192442/alert_image_j36aym.png"
          alt="failure view"
          className="failure-image"
        />
        <p className="paragraph">Something went wrong. Please try again</p>
        <button className="button" type="button" onClick={onTryAgain}>
          Try Again
        </button>
      </div>
    </div>
  )
}
export default FailureView
