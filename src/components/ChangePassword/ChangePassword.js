import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'

import { changePassword } from '../../api/auth'
import messages from '../AutoDismissAlert/messages'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

class ChangePassword extends Component {
  constructor (props) {
    super(props)

    this.state = {
      oldPassword: '',
      newPassword: '',
      showChangePassModal: true
    }
  }

  handleCloseChangePassModal = (event) => {
    const { history } = this.props

    this.setState({ showChangePassModal: false })
    history.push('/')
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onChangePassword = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props

    changePassword(this.state, user)
      .then(() => msgAlert({
        heading: 'Change Password Success',
        message: messages.changePasswordSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/'))
      .catch(error => {
        this.setState({ oldPassword: '', newPassword: '' })
        msgAlert({
          heading: 'Change Password Failed with error: ' + error.message,
          message: messages.changePasswordFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { oldPassword, newPassword, showChangePassModal } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Modal
            show={showChangePassModal}
            onHide={this.handleCloseChangePassModal}
            backdrop="static"
            keyboard={false}
          >
            <Modal.Header className='modal-bg' closeButton>
              <div style={{ display: 'flex', flexDirection: 'column' }} >
                <Modal.Title style={{ fontFamily: 'Satisfy, cursive' }}>Change Password!</Modal.Title>
              </div>
            </Modal.Header>
            <Modal.Body className='modal-bg'>
              <Form onSubmit={this.onChangePassword}>
                <Form.Group controlId="oldPassword">
                  <Form.Label>Old password</Form.Label>
                  <Form.Control
                    required
                    name="oldPassword"
                    value={oldPassword}
                    type="password"
                    placeholder="Old Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Form.Group controlId="newPassword">
                  <Form.Label>New Password</Form.Label>
                  <Form.Control
                    required
                    name="newPassword"
                    value={newPassword}
                    type="password"
                    placeholder="New Password"
                    onChange={this.handleChange}
                  />
                </Form.Group>
                <Button
                  variant="primary"
                  type="submit"
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

export default withRouter(ChangePassword)
