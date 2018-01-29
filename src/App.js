import React, { Component } from 'react';
import './App.css';
import SignInButton from './Components/SignInButton';
import {BrowserRouter, Router, Route, Switch} from 'react-router-dom';
import Welcome from './Components/WelcomeMessage'
import PartyPrompt from './Components/PartyPrompt'
import Main from './Components/Main'
class App extends Component {
  constructor(props){
      super(props); 
      //Get the access code
      let url = window.location.href.split('code=');
      //ensure the code is in the url
      var accessCode = "";
      if(url.length>1){ 
        accessCode = url[1].split('&')[0];
        console.log("Access: " + accessCode)
      }
      const URL_BASE = 'http://localhost:8080'

      
      this.state = {
          searchInput:'',
          searchTracks:[],
          accessToken: '',
          PartySearch: '',
          displayName: ''
      }
      this.handleSearchInput = this.handleSearchInput.bind(this); 
      this.createNewParty = this.createNewParty.bind(this);
      this.joinParty = this.joinParty.bind(this)
      this.AuthorizeURL = 'https://accounts.spotify.com/authorize/?client_id=a3dff10d10534805a46ac2fbbf692ea3&response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FChoosePlaylist&scope=user-read-private%20user-read-email%20streaming&state=34fFs29kd09&show_dialog=true'
      this.accessCode = accessCode
      
      this.URL_BASE = URL_BASE 
  }
    componentDidMount(event){
        let fetchURL = this.URL_BASE + '/getAccessToken'
        let fetchBody = {
            method:"post",
            headers: {
                  'Content-Type': 'application/json',                
            },
            body:JSON.stringify({
                accessCode:this.accessCode,
            })
        }
        if(this.accessCode !== ''){
             fetch(fetchURL,fetchBody).then((response,body)=>{
                 response.json().then(result=>{
                    console.log("Access Token: " + result.access_token)
                    this.setState({
                        accessToken:result.access_token
                    },()=>{
                        let userInfoURl =this.URL_BASE + '/getUserInfo'
                         var options = {
                             method:"post",
                             headers: {'Content-Type': 'application/json'},

                             body:JSON.stringify({
                                 accessToken:this.state.accessToken
                             })
                         }
                         console.log(options)
                         fetch(userInfoURl,options).then((response,body)=>{
                             console.log("Done")
                             response.json().then((data)=>{
                                 var body = JSON.parse(data.body)
                                 console.log(body)
                                 this.setState({
                                     User: body,
                                     displayName:body.display_name
                                 })
                                 console.log(this.state)
                             })
                         })
                        })
                    })
                    
                })
            }           
        }

      
    
    
    handleSearchInput(event){
        let searchInput = event.target.value
        this.setState({
            searchInput: searchInput
        })
        if (searchInput != ''){
            let fetchURL = 'https://api.spotify.com/v1/search?q=' + searchInput + '&limit=5&type=track'
        fetchURL = fetchURL.replace(' ', '%20')
        
        let authOptions = {
            headers: {
                'Authorization': 'Bearer ' + this.state.accessToken

            }
        }
        let trackObjects = []//Holds objects
        fetch(fetchURL,authOptions).then((response,body)=>{
            response.json().then(result=>{
                console.log(result)
                trackObjects = result.tracks.items //An array of up to 5 artist objects
                console.log(trackObjects)
            }).then(()=>{
                this.setState({
                    searchTracks:trackObjects
                })
                console.log(this.state.artist)
                
            })
        
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    
    handleChangePartySearch(event){
        this.setState({
            PartySearch: event.target.value
        })
    }
    
    createNewParty(){
        var user = this.state.User
        let fetchURL = this.URL_BASE + '/createParty'
        let reqOptions = {
             method:"post",
             headers: {
                  'Content-Type': 'application/json',                
             },
             body:JSON.stringify({
                User: this.state.displayName
             })           
        }
        fetch(fetchURL,reqOptions).then((response,body)=>{
            response.json().then(result=>{
                console.log(result)
                //todo: add to state
            })
        })
    }
    
    joinParty(code){
        console.log("Here " + code)
        let fetchURL = this.URL_BASE + '/joinParty'
        let reqOptions = {
            method:"put",
            headers: {
                'Content-Type': 'application/json',
            },
            body:JSON.stringify({
                Code:code,
                User: this.state.User
            })
        }
        fetch(fetchURL,reqOptions).then((response,body)=>{
            response.json().then(result=>{
                console.log(result)
                //add to state
            })
        })
    }
    
    
  render() {
    return (
      <div className="App">
        <BrowserRouter>
            <div>
                <Route exact={true} path='/' component={()=> {return <Welcome AuthorizeURL={this.AuthorizeURL}/>}} /> 
                <Route path='/ChoosePlaylist' component={()=>{return <PartyPrompt joinParty = {this.joinParty} createParty={this.createNewParty}/>}} /> 
                <Route path='/joinparty' component={()=>{return <Main displayName={this.state.displayName} accessToken={this.state.accessToken} URL_BASE={this.URL_BASE}/>}} />
                
            </div>
        </BrowserRouter>
            

      </div>
    );
  }
}

export default App;