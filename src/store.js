import {applyMiddleware,createStore,combineReducers} from "redux"

import {createLogger} from "redux-logger"
import thunk from "redux-thunk"
import promise from "redux-promise-middleware"

import spotifyReducer from "./reducers/spotifyReducer"
import queueReducer from "./reducers/queueReducer"
const middleware = applyMiddleware(promise(),thunk,createLogger())
const combinedReducers = combineReducers(spotifyReducer,queueReducer)
export default createStore(combinedReducers,middleware)