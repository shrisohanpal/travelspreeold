import
{
    BOOKING_CREATE_REQUEST,
    BOOKING_CREATE_SUCCESS,
    BOOKING_CREATE_FAIL,
    BOOKING_DETAILS_REQUEST,
    BOOKING_DETAILS_SUCCESS,
    BOOKING_DETAILS_FAIL,
    BOOKING_PAY_REQUEST,
    BOOKING_PAY_FAIL,
    BOOKING_PAY_SUCCESS,
    BOOKING_PAY_RESET,
    BOOKING_LIST_MY_REQUEST,
    BOOKING_LIST_MY_SUCCESS,
    BOOKING_LIST_MY_FAIL,
    BOOKING_LIST_MY_RESET,
    BOOKING_LIST_FAIL,
    BOOKING_LIST_SUCCESS,
    BOOKING_LIST_REQUEST,
    BOOKING_DELIVER_FAIL,
    BOOKING_DELIVER_SUCCESS,
    BOOKING_DELIVER_REQUEST,
    BOOKING_DELIVER_RESET,
    BOOKING_CREATE_RESET,
} from '../constants/bookingConstants'

export const bookingCreateReducer = (state = {}, action) =>
{
    switch (action.type) {
        case BOOKING_CREATE_REQUEST:
            return {
                loading: true,
            }
        case BOOKING_CREATE_SUCCESS:
            return {
                loading: false,
                success: true,
                booking: action.payload,
            }
        case BOOKING_CREATE_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case BOOKING_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const bookingDetailsReducer = (
    state = { loading: true, bookingItems: [], shippingAddress: {} },
    action
) =>
{
    switch (action.type) {
        case BOOKING_DETAILS_REQUEST:
            return {
                ...state,
                loading: true,
            }
        case BOOKING_DETAILS_SUCCESS:
            return {
                loading: false,
                booking: action.payload,
            }
        case BOOKING_DETAILS_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}

export const bookingPayReducer = (state = {}, action) =>
{
    switch (action.type) {
        case BOOKING_PAY_REQUEST:
            return {
                loading: true,
            }
        case BOOKING_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case BOOKING_PAY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case BOOKING_PAY_RESET:
            return {}
        default:
            return state
    }
}

export const bookingDeliverReducer = (state = {}, action) =>
{
    switch (action.type) {
        case BOOKING_DELIVER_REQUEST:
            return {
                loading: true,
            }
        case BOOKING_DELIVER_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case BOOKING_DELIVER_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case BOOKING_DELIVER_RESET:
            return {}
        default:
            return state
    }
}

export const bookingListMyReducer = (state = { bookings: [] }, action) =>
{
    switch (action.type) {
        case BOOKING_LIST_MY_REQUEST:
            return {
                loading: true,
            }
        case BOOKING_LIST_MY_SUCCESS:
            return {
                loading: false,
                bookings: action.payload,
            }
        case BOOKING_LIST_MY_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        case BOOKING_LIST_MY_RESET:
            return { bookings: [] }
        default:
            return state
    }
}

export const bookingListReducer = (state = { bookings: [] }, action) =>
{
    switch (action.type) {
        case BOOKING_LIST_REQUEST:
            return {
                loading: true,
            }
        case BOOKING_LIST_SUCCESS:
            return {
                loading: false,
                bookings: action.payload,
            }
        case BOOKING_LIST_FAIL:
            return {
                loading: false,
                error: action.payload,
            }
        default:
            return state
    }
}