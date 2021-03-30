import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Row } from 'react-bootstrap'
import Rating from './Rating'

const Package = ({ singlePackage }) =>
{
    return (
        <Card className='my-3 rounded'>
            <Link to={`/package/${singlePackage._id}`}>
                <Card.Img src={singlePackage.image} variant='top' />
            </Link>

            <Card.Body>
                <Card.Title as='h5'>
                    <strong>{singlePackage.name}</strong>
                </Card.Title>

                <Card.Title as='h6'>
                    <strong>{singlePackage.description} ₹{singlePackage.price}/- </strong>
                </Card.Title>

                <Card.Text as='div'>
                    <Row>
                        <Link to={`/package/${singlePackage._id}`} className='mx-3 pr-3'>
                            <Button >Book Now</Button>
                        </Link>
                        <Rating
                            value={singlePackage.rating}
                            text={`${singlePackage.numReviews} reviews`}
                        />
                    </Row>

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Package
