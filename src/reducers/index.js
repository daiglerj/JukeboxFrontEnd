import { combineReducers} from "redux"

import user from "./userReducer"
import queue from "./queueReducer"

export default combineReducers({
    user,
    queue
})
