
import {combineReducers} from 'redux'
import {reducerApi} from '../reducers/reducerApi'


const rootReducer=combineReducers({
    reducerApi:reducerApi
})
export default rootReducer;