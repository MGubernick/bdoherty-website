import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

class AboutMe extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <div>
        <h3>This is the About Me Page!</h3>
      </div>
    )
  }
}

export default withRouter(AboutMe)
