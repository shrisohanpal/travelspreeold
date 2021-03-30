import React, { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Container, Row, Col, Image } from 'react-bootstrap'
import Search from '../components/Search'
import Package from '../components/Package'
import Destination from '../components/Destination'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import Meta from '../components/Meta'
import { listPackages } from '../actions/packageActions'
import { listDestinations } from '../actions/destinationActions'
import OwlCarousel from 'react-owl-carousel';

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
            <Search />
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
                        {packages.map((singlePackage) => (
                            <Col key={singlePackage._id} sm={12} md={6} lg={4} xl={4}>
                                <Package singlePackage={singlePackage} />
                            </Col>
                        ))}
                    </Row>
                </>
            )}


            <Image className='py-3 my-3' style={{ width: '100%', height: 400 }} src='banner.jpg' />

            <center>
                <h1>Most Popular Destination</h1>
                <p>these are most popular Destinations. This is the Description</p>
            </center>
            {loadingDestinations ? (
                <center>
                    <Loader />
                </center>
            )
                : errorDestinations
                    ? (<Message variant='danger'>{errorDestinations}</Message>)
                    : (<OwlCarousel items={window.innerWidth > 780 ? 5 : 2}
                        className="owl-theme"
                        loop
                        nav
                        margin={8} autoplay={true} autoplayTimeout={2000}>
                        {destinations.map((destination) => (
                            <div key={destination._id}>
                                <Destination destination={destination} />
                            </div>
                        ))}
                    </OwlCarousel>
                    )
            }

        </Container>
    )
}

export default HomeScreen