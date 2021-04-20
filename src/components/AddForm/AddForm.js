import React, { useState } from 'react'
import { Redirect } from 'react-router-dom'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'

const AddForm = ({ item, handleSubmit, handleChange }) => {
  const [showAddModal, setShowAddModal] = useState(true)
  const [backHome, setBackHome] = useState(false)

  const handleCloseAddModal = (event) => {
    setShowAddModal(false)
    setBackHome(true)
  }

  if (backHome) {
    return (
      <Redirect to={'/'} />
    )
  }

  return (
    <Modal
      show={showAddModal}
      onHide={handleCloseAddModal}
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header className='modal-bg' closeButton>
        <Modal.Title>What&apos;s New?</Modal.Title>
      </Modal.Header>
      <Modal.Body className='modal-bg'>
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="formBasicName">
            <Form.Label>Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Enter Name"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicMeasurements">
            <Form.Label>Piece Measurements</Form.Label>
            <Form.Control
              type="text"
              name="measurements"
              placeholder="Enter Measurements Here"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicPrice">
            <Form.Label>Price</Form.Label>
            <Form.Control
              type="number"
              step=".01"
              name="price"
              placeholder="0.00"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="exampleForm.ControlSelect2">
            <Form.Label>Pick A Category:</Form.Label>
            <Form.Control
              as="select"
              name="category"
              onChange={handleChange}>
              <option>Pick A Category...</option>
              <option>Mug</option>
              <option>Bowl</option>
              <option>Plate</option>
              <option>Tray</option>
              <option>Full-Set</option>
              <option>Other</option>
            </Form.Control>
          </Form.Group>

          <Form.Group controlId="formBasicDescription">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              name="description"
              placeholder="Write Description Here"
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group controlId="formBasicUrlText">
            <Form.Label>Upload Image URL</Form.Label>
            <Form.Control
              type="text"
              name="imageURL"
              placeholder="Enter URL Here"
              onChange={handleChange}
            />
          </Form.Group>

          <Button variant="secondary" style={{ marginRight: '5px' }} onClick={handleCloseAddModal}>
              Close
          </Button>
          <Button
            variant="primary"
            type="submit"
          >
            Submit
          </Button>
        </Form>
      </Modal.Body>
    </Modal>
  )
}

export default AddForm
