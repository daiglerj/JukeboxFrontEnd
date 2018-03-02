import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'
import { connect } from "react-redux"
import { addToQueue } from "./../actions/queueActions"
import store from "./../store"
import Navbar from "./MainComponents/Navbar"
import SearchTrackList from "./MainComponents/searchTrackList"
import {setUsersInQueue} from "./../actions/queueActions"

const mapStateToProps = state=>{
    return {
        queue: state.queue.queue,
        displayName: state.user.displayName,
        userObject: state.user.userObject,
        URL_BASE: state.user.URL_BASE,
        searchTrackObjects: state.queue.searchTrackObjects,
        code: state.queue.code,
        usersInQueue: state.queue.usersInQueue,
        Owner: state.queue.owner
    }
}

const mapDispatchToProps = dispatch=>{
    return {
        queueSong: (song) => dispatch(addToQueue(song)),
        setUsersInQueue: (users) => dispatch(setUsersInQueue(users))
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
        //TODO test if the user exits. If not, redirect
    }
    componentDidMount(){
        //Load all users in the queue

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
                    <li>{this.props.Owner}</li>
                    <ul  className="usersInQueueList">
                        {this.props.usersInQueue.map(user=>{
                            return <li><img src={user.images[0].url} />{user.display_name}</li>
                        })}
                    </ul>
                </div>
            </div>
        )
    }
}
export default connect(mapStateToProps,mapDispatchToProps)(Main);