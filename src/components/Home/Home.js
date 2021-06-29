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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '40px' }}>
        <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome To bridget ceramics!</h3>
        <h6 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '40px', marginTop: '20px', marginBottom: '200px' }}>Take a look around and enjoy!</h6>
        {/* <img src="" alt="Home Page Image" width="500" height="600"> */}
      </div>
    )
  }
}

export default withRouter(HomePage)
