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