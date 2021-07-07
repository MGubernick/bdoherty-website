import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// import react-bootstrap UI
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

class AboutMe extends Component {
  constructor (props) {
    super(props)

    this.state = {
    }
  }

  render () {
    return (
      <Container className="justify-content-center">
        <Row>
          <Col className="justify-content-center" sm={12} md={12} lg={6}>
            <div style={{ alignSelf: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <img className="about-image" src="https://imgur.com/az3xd6c.png" alt="image of bridget doherty (the potter)" />
            </div>
          </Col>
          <Col className="justify-content-center" sm={12} md={12} lg={6}>
            <div className="about-me-temp">
              <h1 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '20px' }}><strong>Hi, I&apos;m Bridget and this is my About Me Page!</strong></h1>
              <p className="home-page-topline" style={{ alignSelf: 'center' }}>We are still throwing this together...Please hang tight!</p>
              <img style={{ alignSelf: 'center', width: '40%' }} src="https://media.giphy.com/media/3o85xILm2U2hVNhP2g/giphy.gif" alt="loading gif" />
            </div>
          </Col>
        </Row>
      </Container>
    )
  }
}

export default withRouter(AboutMe)
