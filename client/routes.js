import React, {Component} from 'react'
import {connect} from 'react-redux'
import {Router} from 'react-router'
import {Route, Switch} from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, UserHome, DictionaryList, MainGame, Home, WordList, Admin, AddDictionary, LoginSignup} from './components'
import {me} from './store'

/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount () {
    this.props.loadInitialData()
  }

  render () {
    const {isLoggedIn, isAdmin} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            <Route path="/loginSignup" component={LoginSignup} />

            {
              isLoggedIn &&
                //   {/* Routes placed here are only available after logging in */}
                  <Route path="/profile" component={UserHome} />
            }
            {
              isAdmin &&
              <Route path="/controlRoom" component={Admin} />
            }
            <Route path="/game" component={MainGame} />
            <Route exact path="/dictionaries" component={DictionaryList} />
            <Route path="/dictionary/:id" component={WordList} />
            <Route path="/edit" component={AddDictionary} />
            <Route path="/" component={Home} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    isAdmin: state.user.admin
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
