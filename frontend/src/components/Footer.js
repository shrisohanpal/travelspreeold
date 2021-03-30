import React from 'react';
import { Container, Row, Col, Navbar, Nav } from 'react-bootstrap';

const Footer = () =>
{
    return (
        <footer style={{ marginTop: 10, background: '#007bff' }}>
            <Navbar variant="dark">
                <Container>
                    <Row style={{ width: '100%' }}>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Contact Details</Navbar.Brand>
                            <ul>
                                <li style={{ color: 'white' }}>
                                    Ghaziabad,
                                </li>
                                <li style={{ color: 'white' }}>
                                    Ghaziabad,
                                </li>
                                <li style={{ color: 'white' }}>
                                    Ghaziabad,
                                </li>
                                <li style={{ color: 'white' }}>
                                    Ghaziabad
                                </li>
                            </ul>
                        </Col>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Privacy Policy</Navbar.Brand>
                            <ul>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/privacypolicy">Privacy Policy</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/privacypolicy">Privacy Policy</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="/privacypolicy">Privacy Policy</Nav.Link>
                                </li>
                            </ul>
                        </Col>
                        <Col sm={12} md={12} lg={4} xl={4}>
                            <Navbar.Brand>Social Media Links</Navbar.Brand>
                            <ul>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://www.facebook.com/">Facebook</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://www.instagram.com/">Instagram</Nav.Link>
                                </li>
                                <li>
                                    <Nav.Link style={{ color: 'white' }} href="https://wa.me/91">Whatsapp</Nav.Link>
                                </li>
                            </ul>
                        </Col>
                    </Row>
                </Container>
            </Navbar>

            <Navbar bg="dark" variant="dark">
                <Col style={{ color: 'white' }} className='text-center py-3'>
                    Copyright &copy; Travel Spree <br />
                    <a href="https://slanzapanika.com" style={{ color: 'white', textTransform: 'capitalize' }}>Designed & Developed By: Darshan (SlanzApanika) </a>
                </Col>
            </Navbar>
        </footer>
    )
}

export default Footer