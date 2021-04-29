// import React, { Fragment } from 'react'
import React from 'react'
// import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'

const Footer = ({ user }) => (
  <Navbar className="justify-content-center bottom" bg="white" variant="light" expand="md">
    <div className='my-footer' style={{ alignSelf: 'flex-end', display: 'flex' }}>
      <p><small>Copyright © BDoherty Pottery 2021</small></p>
    </div>
  </Navbar>
)

export default Footer
