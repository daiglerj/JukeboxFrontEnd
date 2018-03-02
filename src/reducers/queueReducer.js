const initialState = {
    queue: [],
    searchTrackObjects:[],
    usersInQueue: [],
    owner: ""
}

const queueReducer = (state=initialState,action) => {
    switch(action.type){
        case "SET_SEARCH_TRACK_OBJECTS": {
            return {...state, searchTrackObjects:action.payload}
        }
        case "ADD_TO_QUEUE":{
            return {...state,queue:state.queue.concat(action.payload)}
        }
        case "SET_CODE":{
            return {...state, code:action.payload}
        }
            
        case "SET_USERS_IN_QUEUE":{
            return {...state, usersInQueue: action.payload}
        }
        case "SET_OWNER":{
            return {...state, owner: action.payload}
        }
        default: {
            return state;
        }
    }
}
export default queueReducer