import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

// bootstrap carousel
import Carousel from 'react-bootstrap/Carousel'

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
      <div style={{ marginTop: '40px' }}>
        <Carousel fade
          className="c-style"
        >
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/CAFgaeq.png"
              alt="slide one"
            />
            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/qbykq6l.png"
              alt="slide two"
            />

            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/Ke4bXAW.png"
              alt="slide three"
            />

            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/XCrpJNa.png"
              alt="slide four"
            />

            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/NQwPeak.png"
              alt="slide five"
            />

            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100 c-image"
              src="https://imgur.com/4HYujva.png"
              alt="slide six"
            />

            <Carousel.Caption>
              {/* <h3 className="home-page-topline" style={{ alignSelf: 'center', fontSize: '60px', marginTop: '30px' }}>Welcome to bridget ceramics!</h3> */}
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    )
  }
}

export default withRouter(HomePage)
