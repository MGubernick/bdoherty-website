import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
import NavDropdown from 'react-bootstrap/NavDropdown'

const authenticatedOptions = (
  <Fragment>
    <Navbar.Brand href="#cart">
      <img
        src="https://icongr.am/material/cart-outline.svg?size=141&color=000000"
        width="30"
        height="30"
        className="navbar-nav"
        alt="Cart Link"
      />
    </Navbar.Brand>
  </Fragment>
)

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
    <Nav.Link href="#shop">Shop</Nav.Link>
    <NavDropdown title="Find By Category" id="basic-nav-dropdown">
      <NavDropdown.Item className="dropdownitem" href="#search-mugs">Mugs</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-bowls">Bowls</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-plates">Plates</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-trays">Trays</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-sets">Full-Sets</NavDropdown.Item>
      <NavDropdown.Item className="dropdownitem" href="#search-other">Everything Else</NavDropdown.Item>
    </NavDropdown>
  </Fragment>
)

const unauthenticatedBrand = (
  <Fragment>
    <div className="nav-name-custom">
    BDoherty Pottery
    </div>
  </Fragment>
)

const authenticatedBrand = (
  <Fragment>
    <div className="nav-name-custom">
    BDoherty Pottery
    </div>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar className="header-link-style" variant="light" expand="md">
    <Navbar.Brand className="header-style" href="#/">
      { user ? authenticatedBrand : unauthenticatedBrand}
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
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
