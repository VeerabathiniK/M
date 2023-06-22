import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'

import FailureView from '../FailureView'
import Header from '../Header'
import Footer from '../Footer'
import HomeMovieItems from '../HomeMovieItems'

import './index.css'

const constants = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
  initial: 'INITIAL',
}

class Popular extends Component {
  state = {api: constants.initial, popularData: []}

  componentDidMount() {
    this.getData()
  }

  getData = async () => {
    this.setState({api: constants.inProgress})
    const token = Cookies.get('jwt_token')
    const Url = 'https://apis.ccbp.in/movies-app/popular-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
    const response = await fetch(Url, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedData = data.results.map(each => ({
        id: each.id,
        backdropPath: each.backdrop_path,
        overview: each.overview,
        posterPath: each.poster_path,
        title: each.title,
      }))
      this.setState({
        api: constants.success,
        popularData: updatedData,
      })
    } else {
      this.setState({api: constants.failure})
    }
  }

  tryAgainPopularData = () => {
    this.getData()
  }

  renderFailureView = () => <FailureView tryAgain={this.tryAgainPopularData} />

  renderSuccessView = () => {
    const {popularData} = this.state
    return (
      <ul className="list-container">
        {popularData.map(each => (
          <HomeMovieItems key={each.id} eachMovie={each} />
        ))}
      </ul>
    )
  }

  renderLoaderView = () => (
    <div className="error-page-container">
      <div className="error-page">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  renderAll = () => {
    const {api} = this.state
    switch (api) {
      case constants.failure:
        return this.renderFailureView()
      case constants.success:
        return this.renderSuccessView()
      case constants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-popular-container">
        <>
          <Header />
        </>
        <>{this.renderAll()}</>
        <>
          <Footer />
        </>
      </div>
    )
  }
}
export default Popular
