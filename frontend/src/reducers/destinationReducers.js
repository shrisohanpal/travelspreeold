import
{
    DESTINATION_LIST_REQUEST,
    DESTINATION_LIST_SUCCESS,
    DESTINATION_LIST_FAIL,
    DESTINATION_DETAILS_REQUEST,
    DESTINATION_DETAILS_SUCCESS,
    DESTINATION_DETAILS_FAIL,
    DESTINATION_DELETE_REQUEST,
    DESTINATION_DELETE_SUCCESS,
    DESTINATION_DELETE_FAIL,
    DESTINATION_CREATE_RESET,
    DESTINATION_CREATE_FAIL,
    DESTINATION_CREATE_SUCCESS,
    DESTINATION_CREATE_REQUEST,
    DESTINATION_UPDATE_REQUEST,
    DESTINATION_UPDATE_SUCCESS,
    DESTINATION_UPDATE_FAIL,
    DESTINATION_UPDATE_RESET,
} from '../constants/destinationConstants'

export const destinationListReducer = (state = { destinations: [] }, action) =>
{
    switch (action.type) {
        case DESTINATION_LIST_REQUEST:
            return { loading: true, destinations: [] }
        case DESTINATION_LIST_SUCCESS:
            return {
                loading: false,
                destinations: action.payload.destinations,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case DESTINATION_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const destinationDetailsReducer = (
    state = { destination: { reviews: [] } },
    action
) =>
{
    switch (action.type) {
        case DESTINATION_DETAILS_REQUEST:
            return { ...state, loading: true }
        case DESTINATION_DETAILS_SUCCESS:
            return { loading: false, destination: action.payload }
        case DESTINATION_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const destinationDeleteReducer = (state = {}, action) =>
{
    switch (action.type) {
        case DESTINATION_DELETE_REQUEST:
            return { loading: true }
        case DESTINATION_DELETE_SUCCESS:
            return { loading: false, success: true }
        case DESTINATION_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const destinationCreateReducer = (state = {}, action) =>
{
    switch (action.type) {
        case DESTINATION_CREATE_REQUEST:
            return { loading: true }
        case DESTINATION_CREATE_SUCCESS:
            return { loading: false, success: true, destination: action.payload }
        case DESTINATION_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const destinationUpdateReducer = (state = { destination: {} }, action) =>
{
    switch (action.type) {
        case DESTINATION_UPDATE_REQUEST:
            return { loading: true }
        case DESTINATION_UPDATE_SUCCESS:
            return { loading: false, success: true, destination: action.payload }
        case DESTINATION_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case DESTINATION_UPDATE_RESET:
            return { destination: {} }
        default:
            return state
    }
}
