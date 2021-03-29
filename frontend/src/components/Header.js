import React, { useState, useEffect } from 'react';
import { Route } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { LinkContainer } from 'react-router-bootstrap'
import { Navbar, Nav, Container, Form, Button, FormControl, Row, Col } from 'react-bootstrap'
import { Divider, Drawer, List, ListItem, ListItemText } from '@material-ui/core';

const Header = () =>
{
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
                            <Nav.Link className="mx-3" href="#home">Search</Nav.Link>
                            <Nav.Link className="mx-3" href="#link">Popolar Destinations</Nav.Link>
                            <Nav.Link className="mx-3" href="#link">Contact Us</Nav.Link>
                        </Nav>
                        <Nav.Link href="#link">My Account</Nav.Link>
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
