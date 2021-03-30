import React from 'react'
import { Link } from 'react-router-dom'
import { Card, Button, Row } from 'react-bootstrap'
import Rating from './Rating'

const Destination = ({ destination }) =>
{
    return (
        <Card className='my-3 rounded'>
            <Link to={`/destination/${destination._id}`}>
                <Card.Img src={destination.image} variant='top' />
            </Link>

            <Card.Body>
                <Card.Title as='h6'>
                    <Link to={`/destination/${destination._id}`}>
                        <i className='fas fa-map-marker-alt'></i> <strong>{destination.address}</strong>
                    </Link>
                </Card.Title>

                <Card.Text as='div'>
                    <Row>
                        <div className='pl-3'>{destination.name}</div>
                        <strong className='pl-3'>{destination.tours}Tours</strong>
                    </Row>

                </Card.Text>
            </Card.Body>
        </Card>
    )
}

export default Destination
