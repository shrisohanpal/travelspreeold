import
{
    PACKAGE_LIST_REQUEST,
    PACKAGE_LIST_SUCCESS,
    PACKAGE_LIST_FAIL,
    PACKAGE_DETAILS_REQUEST,
    PACKAGE_DETAILS_SUCCESS,
    PACKAGE_DETAILS_FAIL,
    PACKAGE_DELETE_REQUEST,
    PACKAGE_DELETE_SUCCESS,
    PACKAGE_DELETE_FAIL,
    PACKAGE_CREATE_RESET,
    PACKAGE_CREATE_FAIL,
    PACKAGE_CREATE_SUCCESS,
    PACKAGE_CREATE_REQUEST,
    PACKAGE_UPDATE_REQUEST,
    PACKAGE_UPDATE_SUCCESS,
    PACKAGE_UPDATE_FAIL,
    PACKAGE_UPDATE_RESET,
    PACKAGE_CREATE_REVIEW_REQUEST,
    PACKAGE_CREATE_REVIEW_SUCCESS,
    PACKAGE_CREATE_REVIEW_FAIL,
    PACKAGE_CREATE_REVIEW_RESET,
} from '../constants/packageConstants'

export const packageListReducer = (state = { packages: [] }, action) =>
{
    switch (action.type) {
        case PACKAGE_LIST_REQUEST:
            return { loading: true, packages: [] }
        case PACKAGE_LIST_SUCCESS:
            return {
                loading: false,
                packages: action.payload.packages,
                pages: action.payload.pages,
                page: action.payload.page,
            }
        case PACKAGE_LIST_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const packageDetailsReducer = (
    state = { package: { reviews: [] } },
    action
) =>
{
    switch (action.type) {
        case PACKAGE_DETAILS_REQUEST:
            return { ...state, loading: true }
        case PACKAGE_DETAILS_SUCCESS:
            return { loading: false, package: action.payload }
        case PACKAGE_DETAILS_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const packageDeleteReducer = (state = {}, action) =>
{
    switch (action.type) {
        case PACKAGE_DELETE_REQUEST:
            return { loading: true }
        case PACKAGE_DELETE_SUCCESS:
            return { loading: false, success: true }
        case PACKAGE_DELETE_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}

export const packageCreateReducer = (state = {}, action) =>
{
    switch (action.type) {
        case PACKAGE_CREATE_REQUEST:
            return { loading: true }
        case PACKAGE_CREATE_SUCCESS:
            return { loading: false, success: true, package: action.payload }
        case PACKAGE_CREATE_FAIL:
            return { loading: false, error: action.payload }
        case PACKAGE_CREATE_RESET:
            return {}
        default:
            return state
    }
}

export const packageUpdateReducer = (state = { package: {} }, action) =>
{
    switch (action.type) {
        case PACKAGE_UPDATE_REQUEST:
            return { loading: true }
        case PACKAGE_UPDATE_SUCCESS:
            return { loading: false, success: true, package: action.payload }
        case PACKAGE_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PACKAGE_UPDATE_RESET:
            return { package: {} }
        default:
            return state
    }
}

export const packageReviewCreateReducer = (state = {}, action) =>
{
    switch (action.type) {
        case PACKAGE_CREATE_REVIEW_REQUEST:
            return { loading: true }
        case PACKAGE_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true }
        case PACKAGE_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PACKAGE_CREATE_REVIEW_RESET:
            return {}
        default:
            return state
    }
}
