import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import CircularProgress from '@material-ui/core/CircularProgress'
import FormContainer from '../components/FormContainer'
import { login } from '../actions/userActions'

const LoginScreen = ({ match, location, history }) =>
{
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch()

    const userLogin = useSelector((state) => state.userLogin)
    const { loading, error, userInfo } = userLogin

    const userForgotPassword = useSelector((state) => state.userForgotPassword)
    const { success } = userForgotPassword

    const redirect = location.search ? location.search.split('=')[1] : '/'

    useEffect(() =>
    {
        if (userInfo) {
            history.push(redirect)
        }
    }, [history, userInfo, redirect])

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(login(email, password))
    }

    return (
        <FormContainer>
            <h2 className='py-3'>Log In</h2>
            {success && <Message>We have sent a new Password on Your Email Address.</Message>}
            {error && <Message variant='danger'>{error}<a className='px-3 mx-3' href='/forgotpassword'> Forgot Password</a></Message>}
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

                <Form.Group controlId='password'>
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                        type='password'
                        placeholder='Enter password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></Form.Control>
                </Form.Group>

                <Button type='submit' variant='primary'>
                    Sign In
        </Button>
            </Form>

            <Row className='py-3'>
                <Col>
                    <Link to={'/forgotpassword'}>
                        Forgot Password
                    </Link>
                    {' '}OR{' '}
                    <Link to={redirect ? `/register?redirect=${redirect}` : '/register'}>
                        New Customer? Register
                    </Link>
                </Col>
            </Row>
        </FormContainer>
    )
}

export default LoginScreen