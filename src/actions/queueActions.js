export function setSearchTrackObjects(trackObjects){
    return{
        type: "SET_SEARCH_TRACK_OBJECTS",
        payload: trackObjects
    }
}

export function addToQueue(song){
    return{
        type: "ADD_TO_QUEUE",
        payload: song
    }
}

export function setCode(code){
    return ()=>{
        return {
            type: "SET_CODE",
            payload: code
        }
    }
}

export function setUsersInQueue(users){
    return {
        type: "SET_USERS_IN_QUEUE",
        payload: [].concat(users)
    }
}

export function setOwner(owner){
    return{
        type: "SET_OWNER",
        payload: (owner)
    }
}