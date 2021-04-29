import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { signUp, signIn } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class SignUp extends Component {
  constructor (props) {
    super(props)

    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirmation: '',
      showSignUpModal: true
    }
  }

  handleCloseSignUpModal = (event) => {
    const { history } = this.props

    this.setState({ showSignUpModal: false })
    history.push('/')
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onSignUp = event => {
    event.preventDefault()

    const { msgAlert, history, setUser } = this.props

    signUp(this.state)
      .then(() => signIn(this.state))
      .then(res => setUser(res.data.user))
      // .then(() => msgAlert({
      //   heading: 'Sign Up Success',
      //   message: messages.signUpSuccess,
      //   variant: 'success'
      // }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ email: '', username: '', password: '', passwordConfirmation: '' })
        msgAlert({
          heading: 'Sign Up Failed with error: ' + error.message,
          message: messages.signUpFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { email, username, password, passwordConfirmation, showSignUpModal } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Modal
            show={showSignUpModal}
            onHide={this.handleCloseSignUpModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className='modal-bg' closeButton>
              <Modal.Title style={{ fontFamily: 'Satisfy, cursive' }}>Sign Up!</Modal.Title>
            </Modal.Header>
            <Modal.Body className='modal-bg'>
              <Form onSubmit={this.onSignUp}>
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
                <Form.Group controlId="username">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="username"
                    value={username}
                    placeholder="Pick A Unique Username"
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
                <Form.Group controlId="passwordConfirmation">
                  <Form.Label>Password Confirmation</Form.Label>
                  <Form.Control
                    required
                    name="passwordConfirmation"
                    value={passwordConfirmation}
                    type="password"
                    placeholder="Confirm Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button variant="secondary" onClick={this.handleCloseSignUpModal}>
                  Close
                </Button>
                <Button
                  variant="primary"
                  type="submit"
                  style={{ marginLeft: '2px' }}
                >
                  Submit
                </Button>
              </Form>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    )
  }
}

export default withRouter(SignUp)
