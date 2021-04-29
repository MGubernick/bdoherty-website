import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class SignIn extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      password: '',
      showSignInModal: true
    }
  }

  handleCloseSignInModal = (event) => {
    const { history } = this.props
    this.setState({ showSignInModal: false })
    history.push('/')
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  signMeUp = event => {
    const { history } = this.props
    this.setState({ showSignInModal: false })
    history.push('/sign-up')
  }

  onSignIn = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signIn(this.state)
      .then(res => setUser(res.data.user))
      // .then(() => msgAlert({
      //   heading: 'Sign In Success',
      //   message: messages.signInSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', password: '' })
        msgAlert({
          heading: 'Sign In Failed with error: ' + error.message,
          message: messages.signInFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, password, showSignInModal } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Modal
            show={showSignInModal}
            onHide={this.handleCloseSignInModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className='modal-bg' closeButton>
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <Modal.Title style={{ fontFamily: 'Satisfy, cursive' }}>Sign In!</Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body className='modal-bg'>
              <Form onSubmit={this.onSignIn}>
                <Form.Group controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    required
                    type="email"
                    name="email"
                    value={email}
                    placeholder="Enter email"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    required
                    name="password"
                    value={password}
                    type="password"
                    placeholder="Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={this.handleCloseSignInModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginLeft: '2px', marginRight: '2px' }}
                >
                  Submit
                </Button>
                <Button
                  variant="secondary"
                  onClick={this.signMeUp}
                >
                  Sign Me Up!
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}

export default withRouter(SignIn)
