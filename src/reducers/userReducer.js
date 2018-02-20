const initialState = {
    currentTrack: "https://open.spotify.com/embed?uri=spotify:track:",
    queue: [],
    displayName: "",
    userObject: "",
    partyMembers: [],
    URL_BASE: 'http://localhost:8080',
    accessToken: 'test',
}

const myReducer=(state=initialState,action)=>{
    switch(action.type) {

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