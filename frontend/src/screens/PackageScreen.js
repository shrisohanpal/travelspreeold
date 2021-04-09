import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image, ListGroup, Card, Button, Form } from 'react-bootstrap'
import Rating from '../components/Rating'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import Meta from '../components/Meta'
import
{
    listPackageDetails,
    createPackageReview,
} from '../actions/packageActions'
import { PACKAGE_CREATE_REVIEW_RESET } from '../constants/packageConstants'

const PackageScreen = ({ history, match }) =>
{
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState('')

    const dispatch = useDispatch()

    const packageDetails = useSelector((state) => state.packageDetails)
    const { loading, error, package: singlePackage } = packageDetails

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    const packageReviewCreate = useSelector((state) => state.packageReviewCreate)
    const {
        success: successPackageReview,
        loading: loadingPackageReview,
        error: errorPackageReview,
    } = packageReviewCreate

    useEffect(() =>
    {
        if (successPackageReview) {
            setRating(0)
            setComment('')
        }
        if (!singlePackage || !singlePackage._id || singlePackage._id !== match.params.id) {
            dispatch(listPackageDetails(match.params.id))
            dispatch({ type: PACKAGE_CREATE_REVIEW_RESET })
        }
    }, [dispatch, match, successPackageReview])

    const addToCartHandler = () =>
    {
        history.push(`/placebooking/${match.params.id}`)
    }

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(
            createPackageReview(match.params.id, {
                rating,
                comment,
            })
        )
    }

    return (
        <Container>
            <Link className='btn btn-light my-3' to='/'>
                Go Back
            </Link>
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Meta title={singlePackage.name} />
                    <Row>
                        <Col md={6}>
                            <Image src={singlePackage.image} alt={singlePackage.name} fluid />
                        </Col>
                        <Col md={3}>
                            <ListGroup variant='flush'>
                                <ListGroup.Item>
                                    <h3>{singlePackage.name}</h3>
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <Rating
                                        value={singlePackage.rating}
                                        text={`${singlePackage.numReviews} reviews`}
                                    />
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {singlePackage.description}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                        <Col md={3}>
                            <Card>
                                <ListGroup variant='flush'>
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Price:</Col>
                                            <Col>
                                                <strong>₹{singlePackage.price}</strong>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>

                                    <ListGroup.Item>
                                        <Button
                                            onClick={addToCartHandler}
                                            className='btn-block'
                                            type='button'
                                            disabled={singlePackage.countInStock === 0}
                                        >
                                            Book Now
                                        </Button>
                                    </ListGroup.Item>
                                </ListGroup>
                            </Card>
                        </Col>
                    </Row>
                    <Row>
                        <Col md={6}>
                            <h2>Reviews</h2>
                            {singlePackage.reviews.length === 0 && <Message>No Reviews</Message>}
                            <ListGroup variant='flush'>
                                {singlePackage.reviews.map((review) => (
                                    <ListGroup.Item key={review._id}>
                                        <strong>{review.name}</strong>
                                        <Rating value={review.rating} />
                                        <p>{review.createdAt.substring(0, 10)}</p>
                                        <p>{review.comment}</p>
                                    </ListGroup.Item>
                                ))}
                                <ListGroup.Item>
                                    <h2>Write a Customer Review</h2>
                                    {successPackageReview && (
                                        <Message variant='success'>
                                            Review submitted successfully
                                        </Message>
                                    )}
                                    {loadingPackageReview && <Loader />}
                                    {errorPackageReview && (
                                        <Message variant='danger'>{errorPackageReview}</Message>
                                    )}
                                    {userInfo ? (
                                        <Form onSubmit={submitHandler}>
                                            <Form.Group controlId='rating'>
                                                <Form.Label>Rating</Form.Label>
                                                <Form.Control
                                                    as='select'
                                                    value={rating}
                                                    onChange={(e) => setRating(e.target.value)}
                                                >
                                                    <option value=''>Select...</option>
                                                    <option value='1'>1 - Poor</option>
                                                    <option value='2'>2 - Fair</option>
                                                    <option value='3'>3 - Good</option>
                                                    <option value='4'>4 - Very Good</option>
                                                    <option value='5'>5 - Excellent</option>
                                                </Form.Control>
                                            </Form.Group>
                                            <Form.Group controlId='comment'>
                                                <Form.Label>Comment</Form.Label>
                                                <Form.Control
                                                    as='textarea'
                                                    row='3'
                                                    value={comment}
                                                    onChange={(e) => setComment(e.target.value)}
                                                ></Form.Control>
                                            </Form.Group>
                                            <Button
                                                disabled={loadingPackageReview}
                                                type='submit'
                                                variant='primary'
                                            >
                                                Submit
                      </Button>
                                        </Form>
                                    ) : (
                                        <Message>
                                            Please <Link to='/login'>sign in</Link> to write a review{' '}
                                        </Message>
                                    )}
                                </ListGroup.Item>
                            </ListGroup>
                        </Col>
                    </Row>
                </>
            )}
        </Container>
    )
}

export default PackageScreen