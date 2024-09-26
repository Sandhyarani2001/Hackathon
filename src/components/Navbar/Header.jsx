import React from 'react'
import './Header.css'
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import logo from '../../assets/imgs/logo.png'

function Header() {
  return (
    <>
      <Navbar expand="lg" className="bg-body-tertiary header">
      <Container>
        <Navbar.Brand href="#home"><img className='main-logo' src={logo} alt="" /></Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          
        </Navbar.Collapse>
      </Container>
    </Navbar> 
    </>
  )
}

export default Header;
