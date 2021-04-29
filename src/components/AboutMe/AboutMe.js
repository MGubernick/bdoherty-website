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
      <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginTop: '100px', marginBottom: '200px' }}>
        <h1 style={{ alignSelf: 'center', fontFamily: 'Satisfy, cursive', fontSize: '80px' }}>This is the About Me Page!</h1>
        <h3 style={{ alignSelf: 'center', fontFamily: 'Dancing Script, cursive' }}>We are still throwing this together...Please Hang Tight!</h3>
        <img style={{ alignSelf: 'center', width: '20%' }} src="https://media.giphy.com/media/3o85xILm2U2hVNhP2g/giphy.gif" alt="loading gif" />
      </div>
    )
  }
}

export default withRouter(AboutMe)
