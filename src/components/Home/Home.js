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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '50px' }}>
        <h3 className="home-page-topline" style={{ fontSize: '60px', marginTop: '200px' }}>Welcome To Bridget Doherty&apos;s Pottery Website!</h3>
        <h6 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '40px', marginTop: '20px' }}>Take a look around and find your new favorite piece of pottery!</h6>
        {/* <img src="" alt="Home Page Image" width="500" height="600"> */}
      </div>
    )
  }
}

export default withRouter(HomePage)
