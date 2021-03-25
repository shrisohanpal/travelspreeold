import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormContainer from '../components/FormContainer'
import { forgotPassword } from '../actions/userActions'

const ForgotPasswordScreen = ({ location, history }) =>
{
    const [email, setEmail] = useState('')
    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const userForgotPassword = useSelector((state) => state.userForgotPassword)
    const { loading, error, success } = userForgotPassword

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>
    {
        if (userInfo) {
            history.push(redirect)
        }
        if (success) {
            history.push('/login')
        }
    }, [history, userInfo, redirect, success])

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(forgotPassword(email))
    }

    return (
        <FormContainer>
            <h2 className='py-3'>Forgot Password</h2>
            {error && <Message variant='danger'>{error}</Message>}
            {loading && <CircularProgress />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                        type='email'
                        placeholder='Enter email'
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></Form.Control>
                </Form.Group>
                <p>We will send you a new Password on your Email Address. After login with new Password you can change your password.</p>
                <Button type='submit' variant='primary'>
                    Get New Password
                </Button>
            </Form>
        </FormContainer>
    )
}

export default ForgotPasswordScreen