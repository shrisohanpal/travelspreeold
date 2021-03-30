import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import
{
    listDestinations,
    deleteDestination,
    createDestination,
} from '../actions/destinationActions'
import { DESTINATION_CREATE_RESET } from '../constants/destinationConstants'

const DestinationListScreen = ({ history, match }) =>
{
    const pageNumber = match.params.pageNumber || 1

    const dispatch = useDispatch()

    const destinationList = useSelector((state) => state.destinationList)
    const { loading, error, destinations, page, pages } = destinationList

    const destinationDelete = useSelector((state) => state.destinationDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = destinationDelete

    const destinationCreate = useSelector((state) => state.destinationCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        destination: createdDestination,
    } = destinationCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>
    {
        dispatch({ type: DESTINATION_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/destination/${createdDestination._id}/edit`)
        } else {
            dispatch(listDestinations('', pageNumber))
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdDestination,
        pageNumber,
    ])

    const deleteHandler = (id) =>
    {
        if (window.confirm('Are you sure')) {
            dispatch(deleteDestination(id))
        }
    }

    const createDestinationHandler = () =>
    {
        dispatch(createDestination())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>Destinations</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createDestinationHandler}>
                        <i className='fas fa-plus'></i> Create Destination
          </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant='danger'>{errorCreate}</Message>}
            {loading ? (
                <Loader />
            ) : error ? (
                <Message variant='danger'>{error}</Message>
            ) : (
                <>
                    <Table striped bordered hover responsive className='table-sm'>
                        <thead>
                            <tr>
                                <th></th>
                                <th>ID</th>
                                <th>NAME</th>
                                <th>ADDRESS</th>
                                <th>TOURS</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {destinations.map((destination) => (
                                <tr key={destination._id}>
                                    <td style={{ width: 60 }}><Image src={destination.image} style={{ width: 40, height: 40, borderRadius: 2 }} /></td>
                                    <td>{destination._id}</td>
                                    <td>{destination.name}</td>
                                    <td>{destination.address}</td>
                                    <td>{destination.tours}</td>
                                    <td>
                                        <LinkContainer to={`/admin/destination/${destination._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(destination._id)}
                                        >
                                            <i className='fas fa-trash'></i>
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </>
            )}
        </Container>
    )
}

export default DestinationListScreen