import React, {Component} from 'react'; 
import Modal from 'react-bootstrap-modal'
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux'
import store from "./../store"
import { changeDisplayName, changeUserObject } from "./../actions/userActions"
import { setCode, setUsersInQueue } from "./../actions/queueActions"
const mapStateToProps = state=>{
    return {
        displayName: state.user.displayName,
        userObject: state.user.userObject,
        URL_BASE: state.user.URL_BASE,
        accessToken: state.user.accessToken,
        code: state.queue.code,
        usersInQueue: state.queue.usersInQueue
    };
}
const mapDispatchToProps = dispatch=>{
    return{
        changeDisplayName: (name)=>dispatch(changeDisplayName(name)),
        changeUserObject: (user)=>dispatch(changeUserObject(user)),
        setCode: (code)=>dispatch(setCode(code)),
        setUsersInQueue: (users)=>dispatch(setUsersInQueue(users))
    }
}

class PartyPrompt extends Component {
    constructor(props){
        super(props)
        let message = 'Enter the code of an existing party, or create a new one'
        this.state={
            PartySearch: message
        }
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.joinParty = this.joinParty.bind(this)
        this.createNewParty = this.createNewParty.bind(this)
        this.message = message
    }
    componentDidMount(event){
        console.log(this.props)
        console.log("ALERT:" + this.props.userObject)
        
         let userInfoURl =this.props.URL_BASE + '/getUserInfo'
         var options = {
             method:"post",
             headers: {'Content-Type': 'application/json'},

             body:JSON.stringify({
                 accessToken:this.props.accessToken
             })
         }
         
         console.log("TEST: " + this.props.accessToken)
        /*
         fetch(userInfoURl,options).then((response,body)=>{
             response.json().then(function(data){
                 var body = JSON.parse(data.body)
                 this.props.changeDisplayName(body.display_name)
                 store.getState()
                 this.props.changeUserObject(body)

             })
         })
         */
    }
    handleChangeText(event){
        this.setState({
            PartySearch: event.target.value
        })
    }
    
    handleFocus(event){
        if(event.target.value === this.message){
            this.setState({
                PartySearch: ''
            })            
        }
    }
    handleBlur(event){
        if(event.target.value===''){
            this.setState({
                PartySearch:this.message
            })
        }
    }
    
    joinParty(code){
        //Set code in the state
        console.log("Joining Party " + code)
        this.props.setCode(code)
            
    
        let fetchURL = this.props.URL_BASE + '/joinParty'
        let reqOptions = {
            method:"put",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Code:code,
                User: this.props.userObject
            })
        }
        fetch(fetchURL,reqOptions).then((response,body)=>{
            console.log(response)
            response.json().then(result=>{
                console.log(result)
                //add to state
                let fetchURL = this.props.URL_BASE + "/getUsers/" + code
                let userObjects = [] 
                fetch(fetchURL).then((response,body)=>{
                    console.log(response)
                    response.json().then(result=>{
                        console.log(result.length)
                        userObjects = result
                    }).then(()=>{
                        console.log(userObjects)
                        this.props.setUsersInQueue(userObjects)
                    })
                })
            })
        })          
    }
    
    createNewParty(){
        console.log("New Party")
        var user = this.state.User
        let fetchURL = this.props.URL_BASE + '/createParty'
        let reqOptions = {
             method:"post",
             headers: {
                  'Content-Type': 'application/json',                
             },
             body:JSON.stringify({
                User: this.props.displayName,
                UserObject: this.props.userObject
             })           
        }
        fetch(fetchURL,reqOptions).then((response,body)=>{
            console.log(response)
            response.json().then(result=>{
                console.log("Result: " + result.Code)
                this.joinParty(result.Code)
                
                //todo: add to state
            })
        })
    }
    
    

    
    
    render(){
        return(
            <div className="welcomeMessage">
                <h1 className='introHeader'>Awesome!</h1>
                <p>Your spotify account is now linked. Let's get started!</p>
                <input type = 'text' className='largeInput' value={this.state.PartySearch} onChange={this.handleChangeText} onFocus={this.handleFocus} onBlur={this.handleBlur}/><br />
                <Link to = "/joinparty"><button className='joinParty' onClick={this.joinParty.bind("e", this.state.PartySearch)}>Join an existing Party</button></Link>
                <span className='bigOr'>OR</span>
                <Link to = "/joinparty"><button className = 'joinParty' onClick={this.createNewParty}>Create a new one!</button></Link>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(PartyPrompt);