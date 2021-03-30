import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { PayPalButton } from 'react-paypal-button-v2'
import { Link } from 'react-router-dom'
import { Row, Col, ListGroup, Image, Card, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import
{
    getBookingDetails,
    payBooking,
    deliverBooking,
} from '../actions/bookingActions'
import
{
    BOOKING_PAY_RESET,
    BOOKING_DELIVER_RESET,
} from '../constants/bookingConstants'

const BookingScreen = ({ match, history }) =>
{
    const bookingId = match.params.id

    const [sdkReady, setSdkReady] = useState(false)

    const dispatch = useDispatch()

    const bookingDetails = useSelector((state) => state.bookingDetails)
    const { booking, loading, error } = bookingDetails

    const bookingPay = useSelector((state) => state.bookingPay)
    const { loading: loadingPay, success: successPay } = bookingPay

    const bookingDeliver = useSelector((state) => state.bookingDeliver)
    const { loading: loadingDeliver, success: successDeliver } = bookingDeliver

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    if (!loading) {
        //   Calculate prices
        const addDecimals = (num) =>
        {
            return (Math.round(num * 100) / 100).toFixed(2)
        }

        booking.itemsPrice = addDecimals(
            booking.bookingItems.reduce((acc, item) => acc + item.price * item.qty, 0)
        )
    }

    useEffect(() =>
    {
        if (!userInfo) {
            history.push('/login')
        }

        const addPayPalScript = async () =>
        {
            const { data: clientId } = await axios.get('/api/config/paypal')
            const script = document.createElement('script')
            script.type = 'text/javascript'
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
            script.async = true
            script.onload = () =>
            {
                setSdkReady(true)
            }
            document.body.appendChild(script)
        }

        if (!booking || successPay || successDeliver || booking._id !== bookingId) {
            dispatch({ type: BOOKING_PAY_RESET })
            dispatch({ type: BOOKING_DELIVER_RESET })
            dispatch(getBookingDetails(bookingId))
        } else if (!booking.isPaid) {
            if (!window.paypal) {
                addPayPalScript()
            } else {
                setSdkReady(true)
            }
        }
    }, [dispatch, bookingId, successPay, successDeliver, booking])

    const successPaymentHandler = (paymentResult) =>
    {
        console.log(paymentResult)
        dispatch(payBooking(bookingId, paymentResult))
    }

    const deliverHandler = () =>
    {
        dispatch(deliverBooking(booking))
    }

    return loading ? (
        <Loader />
    ) : error ? (
        <Message variant='danger'>{error}</Message>
    ) : (
        <>
            <h1>Booking {booking._id}</h1>
            <Row>
                <Col md={8}>
                    <ListGroup variant='flush'>
                        <ListGroup.Item>
                            <h2>Shipping</h2>
                            <p>
                                <strong>Name: </strong> {booking.user.name}
                            </p>
                            <p>
                                <strong>Email: </strong>{' '}
                                <a href={`mailto:${booking.user.email}`}>{booking.user.email}</a>
                            </p>
                            <p>
                                <strong>Address:</strong>
                                {booking.shippingAddress.address}, {booking.shippingAddress.city}{' '}
                                {booking.shippingAddress.postalCode},{' '}
                                {booking.shippingAddress.country}
                            </p>
                            {booking.isDelivered ? (
                                <Message variant='success'>
                                    Delivered on {booking.deliveredAt}
                                </Message>
                            ) : (
                                <Message variant='danger'>Not Delivered</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Payment Method</h2>
                            <p>
                                <strong>Method: </strong>
                                {booking.paymentMethod}
                            </p>
                            {booking.isPaid ? (
                                <Message variant='success'>Paid on {booking.paidAt}</Message>
                            ) : (
                                <Message variant='danger'>Not Paid</Message>
                            )}
                        </ListGroup.Item>

                        <ListGroup.Item>
                            <h2>Booking Items</h2>
                            {booking.bookingItems.length === 0 ? (
                                <Message>Booking is empty</Message>
                            ) : (
                                <ListGroup variant='flush'>
                                    {booking.bookingItems.map((item, index) => (
                                        <ListGroup.Item key={index}>
                                            <Row>
                                                <Col md={1}>
                                                    <Image
                                                        src={item.image}
                                                        alt={item.name}
                                                        fluid
                                                        rounded
                                                    />
                                                </Col>
                                                <Col>
                                                    <Link to={`/product/${item.product}`}>
                                                        {item.name}
                                                    </Link>
                                                </Col>
                                                <Col md={4}>
                                                    {item.qty} x ${item.price} = ${item.qty * item.price}
                                                </Col>
                                            </Row>
                                        </ListGroup.Item>
                                    ))}
                                </ListGroup>
                            )}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={4}>
                    <Card>
                        <ListGroup variant='flush'>
                            <ListGroup.Item>
                                <h2>Booking Summary</h2>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Items</Col>
                                    <Col>${booking.itemsPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Shipping</Col>
                                    <Col>${booking.shippingPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Tax</Col>
                                    <Col>${booking.taxPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Total</Col>
                                    <Col>${booking.totalPrice}</Col>
                                </Row>
                            </ListGroup.Item>
                            {!booking.isPaid && (
                                <ListGroup.Item>
                                    {loadingPay && <Loader />}
                                    {!sdkReady ? (
                                        <Loader />
                                    ) : (
                                        <PayPalButton
                                            amount={booking.totalPrice}
                                            onSuccess={successPaymentHandler}
                                        />
                                    )}
                                </ListGroup.Item>
                            )}
                            {loadingDeliver && <Loader />}
                            {userInfo &&
                                userInfo.isAdmin &&
                                booking.isPaid &&
                                !booking.isDelivered && (
                                    <ListGroup.Item>
                                        <Button
                                            type='button'
                                            className='btn btn-block'
                                            onClick={deliverHandler}
                                        >
                                            Mark As Delivered
                    </Button>
                                    </ListGroup.Item>
                                )}
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
        </>
    )
}

export default BookingScreen