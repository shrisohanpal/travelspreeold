import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import FormContainer from '../components/FormContainer'
import { listDestinationDetails, updateDestination } from '../actions/destinationActions'
import { DESTINATION_UPDATE_RESET } from '../constants/destinationConstants'

const DestinationEditScreen = ({ match, history }) =>
{
    const destinationId = match.params.id

    const [name, setName] = useState('')
    const [address, setAddress] = useState('')
    const [tours, setTours] = useState(0)
    const [image, setImage] = useState('')
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const destinationDetails = useSelector((state) => state.destinationDetails)
    const { loading, error, destination } = destinationDetails

    const destinationUpdate = useSelector((state) => state.destinationUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = destinationUpdate

    useEffect(() =>
    {
        if (successUpdate) {
            dispatch({ type: DESTINATION_UPDATE_RESET })
            history.push('/admin/destinationlist')
        } else {
            if (!destination.name || destination._id !== destinationId) {
                dispatch(listDestinationDetails(destinationId))
            } else {
                setName(destination.name)
                setAddress(destination.address)
                setTours(destination.tours)
                setImage(destination.image)
            }
        }
    }, [dispatch, history, destinationId, destination, successUpdate])

    const uploadFileHandler = async (e) =>
    {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append('image', file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            }

            const { data } = await axios.post('/api/upload', formData, config)

            setImage(data)
            setUploading(false)
        } catch (error) {
            console.error(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) =>
    {
        e.preventDefault()
        dispatch(
            updateDestination({
                _id: destinationId,
                name,
                address,
                tours,
                image
            })
        )
    }

    return (
        <Container>
            <Link to='/admin/destinationlist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Destination</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
                {loading ? (
                    <Loader />
                ) : error ? (
                    <Message variant='danger'>{error}</Message>
                ) : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId='name'>
                            <Form.Label>Name</Form.Label>
                            <Form.Control
                                type='name'
                                placeholder='Enter name'
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='address'>
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter address'
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='tours'>
                            <Form.Label>Tours</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter tours'
                                value={tours}
                                onChange={(e) => setTours(e.target.value)}
                            ></Form.Control>
                        </Form.Group>

                        <Form.Group controlId='image'>
                            <Form.Label>Image</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter image url'
                                value={image}
                                onChange={(e) => setImage(e.target.value)}
                            ></Form.Control>
                            <Form.File
                                id='image-file'
                                label='Choose File'
                                custom
                                onChange={uploadFileHandler}
                            ></Form.File>
                            {uploading && <Loader />}
                        </Form.Group>

                        <Button type='submit' variant='primary'>
                            Update
                        </Button>
                    </Form>
                )}
            </FormContainer>
        </Container>
    )
}

export default DestinationEditScreen