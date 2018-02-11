const initialState = {
    message: "Hello"
}

const myReducer=(state=initialState,action)=>{
    switch(action.type) {
        case "INC": {
            return {...state,count:action.payload}
        }
        case "CHANGE_MESSAGE":{
            return {...state,message:"New Message"}
        }
        default:{
            return state;
        }
    }
}
export default myReducer