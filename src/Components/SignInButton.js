import React, {Component} from 'react'

export default class SignInButton extends Component{
    render (){
        return (
            <center>
            <div className = 'authorizationButton'>
                <a className = 'authorizationLink' href={this.props.AuthorizeURL}>Log In with Spotify</a>
            </div>
            </center>
        )
    }
}