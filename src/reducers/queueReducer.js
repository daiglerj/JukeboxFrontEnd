const initialState = {
    searchTrackObjects:[]
}

const queueReducer = (state=initialState,action) => {
    switch(action.type){
        case "SET_SEARCH_TRACK_OBJECTS": {
            return {...state, searchTrackObjects:action.payload}
        }
        default: {
            return state;
        }
    }
}