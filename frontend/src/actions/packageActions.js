import axios from 'axios'
import
{
    PACKAGE_LIST_REQUEST,
    PACKAGE_LIST_SUCCESS,
    PACKAGE_LIST_FAIL,
    PACKAGE_DETAILS_REQUEST,
    PACKAGE_DETAILS_SUCCESS,
    PACKAGE_DETAILS_FAIL,
    PACKAGE_DELETE_SUCCESS,
    PACKAGE_DELETE_REQUEST,
    PACKAGE_DELETE_FAIL,
    PACKAGE_CREATE_REQUEST,
    PACKAGE_CREATE_SUCCESS,
    PACKAGE_CREATE_FAIL,
    PACKAGE_UPDATE_REQUEST,
    PACKAGE_UPDATE_SUCCESS,
    PACKAGE_UPDATE_FAIL,
    PACKAGE_CREATE_REVIEW_REQUEST,
    PACKAGE_CREATE_REVIEW_SUCCESS,
    PACKAGE_CREATE_REVIEW_FAIL,
} from '../constants/packageConstants'
import { logout } from './userActions'

export const listPackages = (keyword = '', pageNumber = '') => async (
    dispatch
) =>
{
    try {
        dispatch({ type: PACKAGE_LIST_REQUEST })

        const { data } = await axios.get(
            `/api/packages?keyword=${keyword}&pageNumber=${pageNumber}`
        )

        dispatch({
            type: PACKAGE_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PACKAGE_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listPackageDetails = (id) => async (dispatch) =>
{
    try {
        dispatch({ type: PACKAGE_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/packages/${id}`)

        dispatch({
            type: PACKAGE_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PACKAGE_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deletePackage = (id) => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: PACKAGE_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/packages/${id}`, config)

        dispatch({
            type: PACKAGE_DELETE_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PACKAGE_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createPackage = () => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: PACKAGE_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/packages`, {}, config)

        dispatch({
            type: PACKAGE_CREATE_SUCCESS,
            payload: data,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PACKAGE_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updatePackage = (singlePackage) => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: PACKAGE_UPDATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/packages/${singlePackage._id}`,
            singlePackage,
            config
        )

        dispatch({
            type: PACKAGE_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: PACKAGE_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PACKAGE_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const createPackageReview = (packageId, review) => async (
    dispatch,
    getState
) =>
{
    try {
        dispatch({
            type: PACKAGE_CREATE_REVIEW_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.post(`/api/packages/${packageId}/reviews`, review, config)

        dispatch({
            type: PACKAGE_CREATE_REVIEW_SUCCESS,
        })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PACKAGE_CREATE_REVIEW_FAIL,
            payload: message,
        })
    }
}
