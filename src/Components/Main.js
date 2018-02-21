import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from "react-redux"
import { addToQueue } from "./../actions/queueActions"
import store from "./../store"
import Navbar from "./MainComponents/Navbar"
import SearchTrackList from "./MainComponents/searchTrackList"
const mapStateToProps = state=>{
    return {
        queue: state.queue.queue,
        displayName: state.user.displayName,
        userObject: state.user.userObject,
        URL_BASE: state.user.URL_BASE,
        searchTrackObjects: state.queue.searchTrackObjects
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        queueSong: (song) => dispatch(addToQueue(song))  
    }
}
class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            songSearch: '',
            searchTracks:[],
            queue: [],
            currentTrack: "https://open.spotify.com/embed?uri=spotify:track:",
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.queueSong = this.queueSong.bind(this)
        this.playTrack = this.playTrack.bind(this)
    }
    componentWillMount(){
        console.log("Hello" + this.props.searchTrackObjects)
        //TODO test if the user exits. If not, redirect
    }
    componentDidMount(){
        console.log(store.getState())
        console.log(this.props)
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
                'Authorization': 'Bearer ' + this.props.accessToken
            }
        }
        let trackObjects = []//Holds objects
        fetch(fetchURL,authOptions).then((response,body)=>{
            response.json().then(result=>{
                //console.log(result)
                trackObjects = result.tracks.items //An array of up to 5 artist objects
                //console.log(trackObjects)
            }).then(()=>{
                this.setState({
                    searchTracks:trackObjects
                })
                
            })
        
            }).catch(error=>{
                console.log(error)
            })
        }
    }
    
    queueSong(trackId,event){
        this.props.queueSong(trackId)
        store.getState();
        this.setState({
            queue: this.state.queue.concat([trackId]),
            currentTrack: "https://open.spotify.com/embed?uri=spotify:track:" + trackId
        }, ()=>{
            console.log(this.state.queue)
            if(this.state.queue.length <= 1){
                this.playTrack(trackId)
            }            
        }) 
    }
        
    
    playTrack(trackId){
      let fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify({
                trackId: trackId,
                accessToken: this.props.accessToken
            })
        }
        let fetchURL = this.props.URL_BASE + '/play'
        fetch(fetchURL,fetchOptions).then((error,response)=>{
            if(error){
                console.log(error)
            }
            else{
                console.log(response)
            }
        })
    }  
    
    render(){
        return(
            <div>
                <Navbar />
                <SearchTrackList playTrack={this.playTrack}/>
                <div>
                    <ul>
                        
                    </ul>
                </div>

            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);