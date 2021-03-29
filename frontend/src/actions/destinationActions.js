import axios from 'axios'
import
{
    DESTINATION_LIST_REQUEST,
    DESTINATION_LIST_SUCCESS,
    DESTINATION_LIST_FAIL,
    DESTINATION_DETAILS_REQUEST,
    DESTINATION_DETAILS_SUCCESS,
    DESTINATION_DETAILS_FAIL,
    DESTINATION_DELETE_SUCCESS,
    DESTINATION_DELETE_REQUEST,
    DESTINATION_DELETE_FAIL,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_CREATE_FAIL,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_SUCCESS,
    DESTINATION_UPDATE_FAIL
} from '../constants/destinationConstants'
import { logout } from './userActions'

export const listDestinations = (keyword = '', pageNumber = '') => async (
    dispatch
) =>
{
    try {
        dispatch({ type: DESTINATION_LIST_REQUEST })

        const { data } = await axios.get(
            `/api/destinations?keyword=${keyword}&pageNumber=${pageNumber}`
        )

        dispatch({
            type: DESTINATION_LIST_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DESTINATION_LIST_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const listDestinationDetails = (id) => async (dispatch) =>
{
    try {
        dispatch({ type: DESTINATION_DETAILS_REQUEST })

        const { data } = await axios.get(`/api/destinations/${id}`)

        dispatch({
            type: DESTINATION_DETAILS_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: DESTINATION_DETAILS_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}

export const deleteDestination = (id) => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: DESTINATION_DELETE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        await axios.delete(`/api/destinations/${id}`, config)

        dispatch({
            type: DESTINATION_DELETE_SUCCESS,
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
            type: DESTINATION_DELETE_FAIL,
            payload: message,
        })
    }
}

export const createDestination = () => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: DESTINATION_CREATE_REQUEST,
        })

        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.post(`/api/destinations`, {}, config)

        dispatch({
            type: DESTINATION_CREATE_SUCCESS,
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
            type: DESTINATION_CREATE_FAIL,
            payload: message,
        })
    }
}

export const updateDestination = (destination) => async (dispatch, getState) =>
{
    try {
        dispatch({
            type: DESTINATION_UPDATE_REQUEST,
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
            `/api/destinations/${destination._id}`,
            destination,
            config
        )

        dispatch({
            type: DESTINATION_UPDATE_SUCCESS,
            payload: data,
        })
        dispatch({ type: DESTINATION_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: DESTINATION_UPDATE_FAIL,
            payload: message,
        })
    }
}
