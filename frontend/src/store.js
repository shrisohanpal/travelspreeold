import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import
{
    packageListReducer,
    packageDetailsReducer,
    packageDeleteReducer,
    packageCreateReducer,
    packageUpdateReducer,
    packageReviewCreateReducer,
} from './reducers/packageReducers'
import
{
    destinationListReducer,
    destinationDetailsReducer,
    destinationDeleteReducer,
    destinationCreateReducer,
    destinationUpdateReducer,
} from './reducers/destinationReducers'
import
{
    userLoginReducer,
    userRegisterReducer,
    userDetailsReducer,
    userUpdateProfileReducer,
    userForgotPasswordReducer,
    userListReducer,
    userDeleteReducer,
    userUpdateReducer,
} from './reducers/userReducers'


const reducer = combineReducers({
    packageList: packageListReducer,
    packageDetails: packageDetailsReducer,
    packageDelete: packageDeleteReducer,
    packageCreate: packageCreateReducer,
    packageUpdate: packageUpdateReducer,
    packageReviewCreate: packageReviewCreateReducer,

    destinationList: destinationListReducer,
    destinationDetails: destinationDetailsReducer,
    destinationDelete: destinationDeleteReducer,
    destinationCreate: destinationCreateReducer,
    destinationUpdate: destinationUpdateReducer,

    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailsReducer,
    userUpdateProfile: userUpdateProfileReducer,
    userForgotPassword: userForgotPasswordReducer,
    userList: userListReducer,
    userDelete: userDeleteReducer,
    userUpdate: userUpdateReducer,
})

const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null

const initialState = {
    userLogin: { userInfo: userInfoFromStorage },
}

const middleware = [thunk]

const store = createStore(
    reducer,
    initialState,
    composeWithDevTools(applyMiddleware(...middleware))
)

export default store