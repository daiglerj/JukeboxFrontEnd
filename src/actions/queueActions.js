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