import React, {Component} from 'react'; 
import Modal from 'react-bootstrap-modal'
import Button from 'react-bootstrap/lib/Button';
import {Link} from 'react-router-dom'
export default class PartyPrompt extends Component {
    constructor(props){
        super(props)
        let message = 'Enter the name of an existing party, or create a new one'
        this.state={
            PartySearch: 'Enter the name of an existing party, or create a new one'
        }
        this.handleChangeText = this.handleChangeText.bind(this)
        this.handleFocus = this.handleFocus.bind(this)
        this.handleBlur = this.handleBlur.bind(this)
        this.message = message
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
    
    render(){
        return(
            <div className="welcomeMessage">
                <h1 className='introHeader'>Awesome!</h1>
                <p>Your spotify account is now linked. Let's get started!</p>
                <input type = 'text' className='largeInput' value={this.state.PartySearch} onChange={this.handleChangeText} onFocus={this.handleFocus} onBlur={this.handleBlur}/><br />
                <Link to = "/joinparty"><button className='joinParty' onClick={this.props.joinParty.bind("e", this.state.PartySearch)}>Join an existing Party</button></Link>
                <span className='bigOr'>OR</span>
                <button className = 'joinParty' onClick={this.props.createParty}>Create a new one!</button>
            </div>
        )
    }
}

