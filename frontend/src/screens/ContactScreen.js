import React, { useState } from 'react'
import { Form, Button, Image, Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux'
import mailAction from '../actions/mailAction'

const ContactScreen = ({ history }) =>
{
    const [name, setName] = useState('')
    const [phone, setPhone] = useState('')
    const [email, setEmail] = useState('')
    const [message, setMessage] = useState('')

    const dispatch = useDispatch()
    const submitHandler = (e) =>
    {
        e.preventDefault()
        const obj = { name, email, phone, message }
        dispatch(mailAction(obj))
        history.push('/')
    }

    return (
        <div>
            <div style={{ position: 'relative' }}>
                <div style={{ position: 'absolute', width: '100%', paddingTop: window.innerWidth > 780 ? 150 : 80 }}>
                    <h1 className="text-center" style={{ color: '#ffffff' }}>Contact us</h1>
                </div>
                < Image style={{ width: '100%', height: window.innerWidth > 780 ? 400 : 200 }} src='https://booking.cenextgroups.com/wp-content/themes/adivaha_main/g-1.jpg' />
            </div>
            <div className='text-center py-3 my-3'>
                <h4>SEND US A MESSAGE</h4>
            </div>
            <Container>
                <Form style={{ maxWidth: 600, margin: 'auto' }} onSubmit={submitHandler}>
                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Name</Form.Label>
                        <Form.Control type="text" placeholder="Enter Name" value={name} onChange={(e) => setName(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control type="email" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Phone Number</Form.Label>
                        <Form.Control type="number" placeholder="Enter Phone Number" value={phone} onChange={(e) => setPhone(e.target.value)} />
                    </Form.Group>

                    <Form.Group controlId="formBasicEmail">
                        <Form.Label>Message</Form.Label>
                        <Form.Control as="textarea" placeholder="Enter Message" rows={5} value={message} onChange={(e) => setMessage(e.target.value)} />
                    </Form.Group>

                    <Button type="submit">
                        Submit
                </Button>
                </Form>
            </Container>
        </div>
    )
}

export default ContactScreen

