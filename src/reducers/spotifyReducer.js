const initialState = {
    message: "Hello",
    currentTrack: "https://open.spotify.com/embed?uri=spotify:track:",
    queue: [],
    displayName: "",
    userObject: "",
    partyMembers: [],
    URL_BASE: 'http://localhost:8080',
    accessToken: ''
}

const myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case "INC": {
            return {...state,count:action.payload}
        }
        case "CHANGE_MESSAGE":{
            return {...state,message:"New Message"}
        }
        case "ADD_TO_QUEUE":{
            return {...state,queue:state.queue.concat(action.payload)}
        }
        case "CHANGE_DISPLAY_NAME":{
            return {...state,displayName:action.payload}
        }
        case "CHANGE_USER_OBJECT":{
            return {...state, userObject:action.payload}
        }
        case "CHANGE_PARTY_MEMBERS":{
            return {...state, partyMembers:action.payload}
        }
        case "SET_ACCESS_TOKEN":{
            return {...state, accessToken:action.payload}
        }
        default:{
            return state;
        }
    }
}
export default myReducer