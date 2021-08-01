import { combineReducers, createStore, applyMiddleware } from 'redux'
import{ ecommerceReducer} from './ecommerceReducer'
import reduxThunk from 'redux-thunk'
import { adminReducer } from './adminReducer'
const rootReducer = combineReducers({
    ecommerceReducer,
    adminReducer
})
export const store = createStore(rootReducer, applyMiddleware(reduxThunk))