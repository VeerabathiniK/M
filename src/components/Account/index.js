import Cookies from 'js-cookie'

import Header from '../Header'
import Footer from '../Footer'

import './index.css'

const Account = props => {
  const onClickLogout = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }
  return (
    <div className="main">
      <Header />
      <>
        <div className="Account-container">
          <h1 className="heading-account">Account</h1>
          <hr className="line" />
          <div className="membership-container">
            <p className="member">Member Ship</p>
            <div className="user-container">
              <p className="user">rahul@gmail.com</p>
              <p className="password">password: *********</p>
            </div>
          </div>
          <hr className="line" />
          <div className="plan-container">
            <p className="member">Plan Details</p>
            <p className="password">Premium</p>
            <p className="button">Ultra HD</p>
          </div>

          <button
            className="logout-button"
            type="button"
            onClick={onClickLogout}
          >
            LogOut
          </button>
        </div>
      </>
      <Footer />
    </div>
  )
}
export default Account
