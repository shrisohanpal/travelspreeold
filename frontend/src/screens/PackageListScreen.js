import React, { useEffect } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import { Container, Table, Button, Row, Col, Image } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '@material-ui/core/CircularProgress'
import
{
    listPackages,
    deletePackage,
    createPackage,
} from '../actions/packageActions'
import { PACKAGE_CREATE_RESET } from '../constants/packageConstants'

const PackageListScreen = ({ history, match }) =>
{
    const dispatch = useDispatch()

    const packageList = useSelector((state) => state.packageList)
    const { loading, error, packages } = packageList

    const packageDelete = useSelector((state) => state.packageDelete)
    const {
        loading: loadingDelete,
        error: errorDelete,
        success: successDelete,
    } = packageDelete

    const packageCreate = useSelector((state) => state.packageCreate)
    const {
        loading: loadingCreate,
        error: errorCreate,
        success: successCreate,
        package: createdPackage,
    } = packageCreate

    const userLogin = useSelector((state) => state.userLogin)
    const { userInfo } = userLogin

    useEffect(() =>
    {
        dispatch({ type: PACKAGE_CREATE_RESET })

        if (!userInfo || !userInfo.isAdmin) {
            history.push('/login')
        }

        if (successCreate) {
            history.push(`/admin/package/${createdPackage._id}/edit`)
        } else {
            dispatch(listPackages())
        }
    }, [
        dispatch,
        history,
        userInfo,
        successDelete,
        successCreate,
        createdPackage,
    ])

    const deleteHandler = (id) =>
    {
        if (window.confirm('Are you sure')) {
            dispatch(deletePackage(id))
        }
    }

    const createPackageHandler = () =>
    {
        dispatch(createPackage())
    }

    return (
        <Container>
            <Row className='align-items-center'>
                <Col>
                    <h1>Packages</h1>
                </Col>
                <Col className='text-right'>
                    <Button className='my-3' onClick={createPackageHandler}>
                        <i className='fas fa-plus'></i> Create Package
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
                                <th>PRICE</th>
                                <th></th>
                            </tr>
                        </thead>
                        <tbody>
                            {packages.map((singlePackage) => (
                                <tr key={singlePackage._id}>
                                    <td style={{ width: 60 }}><Image src={singlePackage.image} style={{ width: 40, height: 40, borderRadius: 2 }} /></td>
                                    <td>{singlePackage._id}</td>
                                    <td>{singlePackage.name}</td>
                                    <td>₹{singlePackage.price}</td>
                                    <td>
                                        <LinkContainer to={`/admin/package/${singlePackage._id}/edit`}>
                                            <Button variant='light' className='btn-sm'>
                                                <i className='fas fa-edit'></i>
                                            </Button>
                                        </LinkContainer>
                                        <Button
                                            variant='danger'
                                            className='btn-sm'
                                            onClick={() => deleteHandler(singlePackage._id)}
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

export default PackageListScreen