import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col } from 'react-bootstrap'
import Package from '../components/Package'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import Meta from '../components/Meta'
import { listPackages } from '../actions/packageActions'
import { listDestinations } from '../actions/destinationActions'

const HomeScreen = ({ match }) =>
{
    const dispatch = useDispatch()

    const packageList = useSelector((state) => state.packageList)
    const { loading, error, packages } = packageList

    const destinationList = useSelector((state) => state.destinationList)
    const { loading: loadingDestinations, error: errorDestinations, destinations } = destinationList

    useEffect(() =>
    {
        dispatch(listPackages())
        dispatch(listDestinations())
    }, [dispatch])

    return (
        <Container>
            <Meta />
            <center>
                <h1>Our Most Popular Packages</h1>
                <p>these are our most popular packages. This is the Description</p>
            </center>
            {loading ? (
                <center>
                    <Loader />
                </center>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {packages.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Package product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

            <div className='py-3 my-3'>
                <div className='py-3 my-3'>
                    <div className='py-3 my-3'>
                        <div className='py-3 my-3'>
                            <div className='py-3 my-3'>
                                <h1>ADSSSSSSSSSSSSSSSSSS</h1>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            <center>
                <h1>Most Popular Destination</h1>
                <p>these are most popular Destinations. This is the Description</p>
            </center>
            {loading ? (
                <center>
                    <Loader />
                </center>
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Row>
                        {packages.map((product) => (
                            <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                                <Package product={product} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}

        </Container>
    )
}

export default HomeScreen