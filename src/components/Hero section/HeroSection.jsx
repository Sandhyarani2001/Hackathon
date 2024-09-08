import React from 'react'
import "./HeroSection.css"
import img from '../../assets/icons/PicsArt_04-14-04.42 1.png'
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import {useNavigate } from 'react-router-dom';

function HeroSection() {
  const navigate  = useNavigate();
  return (
    <div className='hero-section'>
    <Container-fluid>
    <Row className='ms-1 row'>
        <Col sm={8} className='hero-text'>
        <div className='pt-4 ps-5'>
            <p className='heading fw-medium mb-5'>Accelerate Innovation <br/> with Global AI Challenges</p>
            <p className='para mb-5'>AI challenges at DPhi simulate real-world problem.
            It is a great place to put your AI/Data Science skills to test on diverse database allowing you to foster learning
            through competitions.</p>

            <button onClick={()=>navigate('/admin')} type="button" class="btn btn-light">Create Challenge</button>
        </div>
        </Col>
        <Col sm={4}>
        <div className='hero-img ps-5'>
            <img src={img} alt="img" />
        </div>
        </Col>
      </Row>
      </Container-fluid>
    </div>
  )
}

export default HeroSection
