import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
export default class Main extends Component {
    constructor(props){
        super(props)
        this.state = {
            songSearch: '',
            searchTracks:[],
            queue: [],
            currentTrack: "https://open.spotify.com/embed?uri=spotify:track:",
        }
        this.URL_BASE = this.props.URL_BASE
        this.handleSearchInput = this.handleSearchInput.bind(this)
        this.queueSong = this.queueSong.bind(this)
        this.playTrack = this.playTrack.bind(this)
    }
    componentWillMount(){
        //TODO test if the user exits. If not, redirect
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
        let fetchURL = this.URL_BASE + '/play'
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
                <div id="navbar">
                    <input className='searchSongs' type="text"  onChange={this.handleSearchInput} />
                    <span className= "username">Welcome, {this.props.displayName}</span>
            <iframe src={this.state.currentTrack}
        frameborder="0" allowtransparency="true"></iframe>
                </div>
                    <div>
            <ul id="searchResults">
                {this.state.searchTracks.map(track => {
                    var trackId = track.id
                    return <li key={track.id} className="searchSongList" onClick={()=>{this.queueSong(trackId,"e")}}><img className="searchAlbumImage" src={track.album.images[2].url} />{track.name} by {track.artists[0].name}</li>
                })}
            </ul>
        </div>
            </div>
        )
    }
}