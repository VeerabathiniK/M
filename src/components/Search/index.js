import {Component} from 'react'

import Cookies from 'js-cookie'

import Loader from 'react-loader-spinner'
import Header from '../Header'
import HomeMovieItems from '../HomeMovieItems'
import FailureView from '../FailureView'

import './index.css'

const searchRoute = true

const constants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class Search extends Component {
  state = {searchValue: '', SearchData: [], apiStatus: constants.initial}

  getSearchMoviesData = async searchValue => {
    this.setState({apiStatus: constants.inProgress})

    const jwtToken = Cookies.get('jwt_token')
    const searchUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchValue}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(searchUrl, options)
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
        apiStatus: constants.success,
        SearchData: updatedData,
        searchValue,
      })
    } else {
      this.setState({apiStatus: constants.failure})
    }
  }

  trySearchMovieData = () => {
    this.getSearchMoviesData()
  }

  renderFailureView = () => <FailureView tryAgain={this.trySearchMovieData} />

  renderNoResultsView = () => {
    const {searchValue} = this.state

    return (
      <div className="no-results-view">
        <img
          className="no-results-img"
          alt="no movies"
          src="https://res.cloudinary.com/dkbxi5qts/image/upload/v1660153718/movies%20prime%20app/No_Views_awtv8d.svg"
        />
        <p className="no-results-text">
          Your search for {searchValue} did not find any matches.
        </p>
      </div>
    )
  }

  renderSuccessView = () => {
    const {SearchData} = this.state

    return SearchData.length > 0 ? (
      <ul className="search-list-container">
        {SearchData.map(each => (
          <HomeMovieItems key={each.id} eachMovie={each} />
        ))}
      </ul>
    ) : (
      this.renderNoResultsView()
    )
  }

  renderLoaderView = () => (
    <div className="error-page-container">
      <div className="thumbnail-error-page">
        <div className="loader-container" testid="loader">
          <Loader type="TailSpin" color="#D81F26" height={50} width={50} />
        </div>
      </div>
    </div>
  )

  allRenderSearch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case constants.success:
        return this.renderSuccessView()
      case constants.failure:
        return this.renderFailureView()
      case constants.inProgress:
        return this.renderLoaderView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="app-search-container">
        <Header
          getSearchMoviesData={this.getSearchMoviesData}
          searchRoute={searchRoute}
        />

        <>{this.allRenderSearch()}</>
      </div>
    )
  }
}
export default Search
