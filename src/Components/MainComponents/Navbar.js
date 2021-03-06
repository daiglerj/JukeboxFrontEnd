import React, { Component } from 'react';
import { connect } from "react-redux"
import store from './../../store.js';
import {setSearchTrackObjects} from "./../../actions/queueActions"

const mapStateToProps = (state)=>{
    return {
        displayName: state.user.displayName,
        accessToken: state.user.accessToken,
        searchTrackObjects: state.queue.searchTrackObjects,
        code: state.queue.code
    }
}
const mapDispatchToProps = (dispatch)=>{
    return {
        setSearchTrackObjects: (tracks)=>dispatch(setSearchTrackObjects(tracks))
    }
}
class Navbar extends Component {
    constructor(props){
        super(props)
        this.state = {
            songSearch: '',
        }
        this.handleSearchInput = this.handleSearchInput.bind(this)
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
                    this.props.setSearchTrackObjects(trackObjects)
                    console.log(this.props.searchTrackObjects)
                    /*
                    this.setState({
                        searchTracks:trackObjects
                    })
                    */
                })

                }).catch(error=>{
                    console.log(error)
            })
        }
        else{
            this.props.setSearchTrackObjects([])
        }
    }
    
    render(){
        return(
            <div id="navbar">
                <input className='searchSongs' type="text"  onChange={this.handleSearchInput} />
                <span className="code">Your party code is {this.props.code}</span>
                <span className= "username">Welcome, {this.props.displayName}</span>
                <iframe src={this.state.currentTrack} frameborder="0" allowtransparency="true"></iframe>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Navbar)