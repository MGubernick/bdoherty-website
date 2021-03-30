import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

// const authenticatedOptions = (
//   <Fragment>
//     {/* <Nav.Link href="#change-password">Change Password</Nav.Link> */}
//     {/* <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
//   </Fragment>
// )

// const adminOptions = (
//   <Fragment>
//     <Nav.Link href="#add-one">Add An Item</Nav.Link>
//   </Fragment>
// )

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="#/">Home</Nav.Link>
    <Nav.Link href="#about-me">About Me</Nav.Link>
    <NavDropdown title='Shop By Category' id="basic-nav-dropdown" className="dropdownitem">
      <NavDropdown.Item className="dropdownitem" href="#search-mugs">Mugs</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-bowls">Bowls</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-plates">Plates</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-trays">Trays</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-sets">Full-Sets</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-other">Everything Else</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="primary" variant="dark" expand="md">
    <Navbar.Brand href="#">
      BDoherty Pottery
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        {/* // { user && <span className="navbar-text mr-2">Welcome, {user.username}</span>} */}
        { user && <NavDropdown title={user.username} id="basic-nav-dropdown" className="dropdownitem">
          {user.email === 'bdoherty@bdoh.com' ? <NavDropdown.Item className="dropdownitem" href="#add-one">Add New Item</NavDropdown.Item> : null}
          <NavDropdown.Divider className="dropdownitem"/>
          <NavDropdown.Item className="dropdownitem" href="#change-password">Change Password</NavDropdown.Item>
          <NavDropdown.Item className="dropdownitem" href="#sign-out">Sign Out</NavDropdown.Item>
        </NavDropdown>}
        { alwaysOptions }
        { user ? null : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
