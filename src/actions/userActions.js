export function increment(){
    return {
        type: "INC",
        payload:1
    }
}

export function changeMessage(){
    return {
        type: "CHANGE_MESSAGE"
    }
}


export function changeDisplayName(name){
    return{
        type:"CHANGE_DISPLAY_NAME",
        payload: name
    }
}

export function changeUserObject(userObject){
    return{
        type: "CHANGE_USER_OBJECT",
        payload:userObject
    }
}

export function setAccessToken(accessToken){
    return{
        type: "SET_ACCESS_TOKEN",
        payload:accessToken
    }
}