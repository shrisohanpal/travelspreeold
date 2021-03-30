import axios from 'axios'
import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Container, Form, Button } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import FormContainer from '../components/FormContainer'
import { listPackageDetails, updatePackage } from '../actions/packageActions'
import { PACKAGE_UPDATE_RESET } from '../constants/packageConstants'

const PackageEditScreen = ({ match, history }) =>
{
    const packageId = match.params.id

    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(0)
    const [uploading, setUploading] = useState(false)

    const dispatch = useDispatch()

    const packageDetails = useSelector((state) => state.packageDetails)
    const { loading, error, singlePackage } = packageDetails

    const packageUpdate = useSelector((state) => state.packageUpdate)
    const {
        loading: loadingUpdate,
        error: errorUpdate,
        success: successUpdate,
    } = packageUpdate

    useEffect(() =>
    {
        if (successUpdate) {
            dispatch({ type: PACKAGE_UPDATE_RESET })
            history.push('/admin/packagelist')
        } else {
            if (!singlePackage || !singlePackage.name || singlePackage._id !== packageId) {
                dispatch(listPackageDetails(packageId))
            } else {
                setName(singlePackage.name)
                setDescription(singlePackage.description)
                setImage(singlePackage.image)
                setPrice(singlePackage.price)
            }
        }
    }, [dispatch, history, packageId, singlePackage, successUpdate])

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
            updatePackage({
                _id: packageId,
                name,
                price,
                image,
                description,
            })
        )
    }

    return (
        <Container>
            <Link to='/admin/packagelist' className='btn btn-light my-3'>
                Go Back
            </Link>
            <FormContainer>
                <h1>Edit Package</h1>
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

                        <Form.Group controlId='price'>
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                type='number'
                                placeholder='Enter price'
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
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

                        <Form.Group controlId='description'>
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                                type='text'
                                placeholder='Enter description'
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            ></Form.Control>
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

export default PackageEditScreen