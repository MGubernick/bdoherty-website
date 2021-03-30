import React, { Component, Fragment } from 'react'
import { Route } from 'react-router-dom'
import { v4 as uuid } from 'uuid'

import AuthenticatedRoute from './components/AuthenticatedRoute/AuthenticatedRoute'
import AutoDismissAlert from './components/AutoDismissAlert/AutoDismissAlert'
import Header from './components/Header/Header'
import SignUp from './components/SignUp/SignUp'
import SignIn from './components/SignIn/SignIn'
import SignOut from './components/SignOut/SignOut'
import ChangePassword from './components/ChangePassword/ChangePassword'

// import item components
import AddItem from './components/AddItem/AddItem.js'
import Browser from './components/Browser/Browser.js'
import ShowOne from './components/ShowOne/ShowOne.js'
import UpdateItem from './components/UpdateItem/UpdateItem.js'
import MugIndex from './components/Category/MugIndex/MugIndex.js'
import BowlIndex from './components/Category/BowlIndex/BowlIndex.js'
import PlateIndex from './components/Category/PlateIndex/PlateIndex.js'
import TrayIndex from './components/Category/TrayIndex/TrayIndex.js'
import FullSetIndex from './components/Category/FullSetIndex/FullSetIndex.js'
import ElseIndex from './components/Category/EverythingElseIndex/EverythingElseIndex.js'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      user: null,
      msgAlerts: []
    }
  }

  setUser = user => this.setState({ user })

  clearUser = () => this.setState({ user: null })

  deleteAlert = (id) => {
    this.setState((state) => {
      return { msgAlerts: state.msgAlerts.filter(msg => msg.id !== id) }
    })
  }

  msgAlert = ({ heading, message, variant }) => {
    const id = uuid()
    this.setState((state) => {
      return { msgAlerts: [...state.msgAlerts, { heading, message, variant, id }] }
    })
  }

  render () {
    const { msgAlerts, user } = this.state

    return (
      <Fragment>
        <Header user={user} />
        {msgAlerts.map(msgAlert => (
          <AutoDismissAlert
            key={msgAlert.id}
            heading={msgAlert.heading}
            variant={msgAlert.variant}
            message={msgAlert.message}
            id={msgAlert.id}
            deleteAlert={this.deleteAlert}
          />
        ))}
        <main className="container">
          <Route path='/sign-up' render={() => (
            <SignUp msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route path='/sign-in' render={() => (
            <SignIn msgAlert={this.msgAlert} setUser={this.setUser} />
          )} />
          <Route exact path='/' render={() => (
            <Browser msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/items/:id' render={() => (
            <ShowOne msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-mugs' render={() => (
            <MugIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-bowls' render={() => (
            <BowlIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-plates' render={() => (
            <PlateIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-trays' render={() => (
            <TrayIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-sets' render={() => (
            <FullSetIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <Route exact path='/search-other' render={() => (
            <ElseIndex msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/sign-out' render={() => (
            <SignOut msgAlert={this.msgAlert} clearUser={this.clearUser} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/change-password' render={() => (
            <ChangePassword msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/add-one' render={() => (
            <AddItem msgAlert={this.msgAlert} user={user} />
          )} />
          <AuthenticatedRoute user={user} path='/update-item/:id' render={() => (
            <UpdateItem msgAlert={this.msgAlert} user={user} />
          )} />
        </main>
      </Fragment>
    )
  }
}

export default App
