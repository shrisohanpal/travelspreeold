import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, NavDropdown, Form, Button, FormControl, Row, Col } from 'react-bootstrap'
import { Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const Header = () =>
{
    const dispatch = useDispatch()
    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin
    const [drawerOpen, setDrawerOpen] = useState(false);

    return (
        <div>
            <Navbar bg='dark' variant='dark'>
                <Nav.Link href="#home">Home</Nav.Link>
            </Navbar>
            <Navbar bg="light" expand="lg">
                <Navbar.Brand href="#home">Travel Spree</Navbar.Brand>
                <Navbar.Toggle onClick={() => setDrawerOpen(true)} />
                {window.innerWidth > 780 && (
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto ml-3">
                            <Nav.Link className="mx-3" href="#home"><i className='fas fa-search' /> Search</Nav.Link>
                            <Nav.Link className="mx-3" href="#link"><i className='fas fa-map-marker-alt' /> Popolar Destinations</Nav.Link>
                            <Nav.Link className="mx-3" href="#link"><i className='fas fa-address-book' /> Contact Us</Nav.Link>
                        </Nav>
                        {userInfo && userInfo.isAdmin && (
                            <NavDropdown title='Admin' id='adminmenu'>
                                <LinkContainer to='/admin/userlist'>
                                    <NavDropdown.Item>Users</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/packagelist'>
                                    <NavDropdown.Item>Packages</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/destinationlist'>
                                    <NavDropdown.Item>Destinations</NavDropdown.Item>
                                </LinkContainer>
                                <LinkContainer to='/admin/bookinglist'>
                                    <NavDropdown.Item>Bookings</NavDropdown.Item>
                                </LinkContainer>
                            </NavDropdown>
                        )}
                        <LinkContainer to={userInfo ? '/profile' : '/login'}>
                            <Nav.Link><i className='far fa-user' /> My Account</Nav.Link>
                        </LinkContainer>
                    </Navbar.Collapse>
                )}
            </Navbar>
            <Drawer anchor='left' open={drawerOpen} onClose={() => { setDrawerOpen(false) }}>
                <List style={{ width: 250 }}>
                    <ListItem>
                        <ListItemText primary={<div style={{ fontWeight: 'bold', fontSize: 20 }}>Travel Spree</div>} />
                        <Button className='ml-auto' onClick={() => setDrawerOpen(false)}><i className='fas fa-times' /></Button>
                    </ListItem>
                </List>
            </Drawer>
        </div>
    )
}

export default Header
