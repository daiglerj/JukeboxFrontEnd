const initialState = {
    queue: [],
    searchTrackObjects:[]
}

const queueReducer = (state=initialState,action) => {
    switch(action.type){
        case "SET_SEARCH_TRACK_OBJECTS": {
            console.log("Test2: ")
            return {...state, searcfhTrackObjects:action.payload}
        }
        case "ADD_TO_QUEUE":{
            return {...state,queue:state.queue.concat(action.payload)}
        }
        default: {
            return state;
        }
    }
}
export default queueReducer