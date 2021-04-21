import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class HomePage extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  componentDidMount () {

  }

  render () {
    return (
      <div>
        <h3>This is the Home Page!</h3>
      </div>
    )
  }
}

export default withRouter(HomePage)
