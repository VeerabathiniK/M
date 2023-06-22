import {Switch, Route} from 'react-router-dom'

import Login from './components/Login'
import Home from './components/Home'
import ProtectedRoute from './components/ProtectedRoute'
import Search from './components/Search'
import MovieItemDetails from './components/MovieItemDetails'
import Account from './components/Account'
import Popular from './components/Popular'
import NotFound from './components/NotFound'

import './App.css'

const App = () => (
  <>
    <Switch>
      <Route exact path="/login" component={Login} />
      <ProtectedRoute exact path="/" component={Home} />
      <ProtectedRoute exact path="/search" component={Search} />
      <ProtectedRoute exact path="/movies/:id" component={MovieItemDetails} />
      <ProtectedRoute exact path="/account" component={Account} />
      <ProtectedRoute exact path="/popular" component={Popular} />
      <Route component={NotFound} />
    </Switch>
  </>
)

export default App
