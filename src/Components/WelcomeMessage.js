import React, {Component} from 'react'
import SignInButton from './SignInButton';

export default class Welcome extends Component {
    render(){
        return(
            <div className = 'welcomeMessage'>
                
                <h1 className='introHeader'>Welcome to Jukebox</h1>
                <p>Finally a pregame where everyone gets to be the DJ</p>
                <SignInButton AuthorizeURL = {this.props.AuthorizeURL} />
            </div>        
        )
    }
}
