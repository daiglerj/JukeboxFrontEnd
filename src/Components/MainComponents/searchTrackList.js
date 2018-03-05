import React, {Component} from 'react'
import { connect } from "react-redux"
import store from "./../../store"
import { addToQueue, setQueue } from "./../../actions/queueActions"

const mapStateToProps = state =>{
    return{
        searchTrackObjects: state.queue.searchTrackObjects,
        queue:state.queue.queue,
        URL_BASE : state.user.URL_BASE,
        code: state.queue.code
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        queueSong: (song) => dispatch(addToQueue(song)),
        setQueue: (queue) => dispatch(setQueue(queue))

    }
}
class searchTrackList extends Component{
    constructor(props){
        super(props)
    }
    queueSong(track,event){
        //add track to db
        let fetchURL = this.props.URL_BASE + "/addToQueue" 
        let fetchOptions = {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json',                
            },
            body: JSON.stringify({
                Code: this.props.code,
                Track: track
            })
        }
        fetch(fetchURL,fetchOptions).then((response,body)=>{
            console.log(response)
            response.json().then(result=>{
                console.log(result)
                this.props.setQueue(result.Queue)
            })
        }).then(()=>{
            console.log("Queue: " + this.props.queue.length)
            if(this.props.queue.length<1){
                this.props.playTrack(track.id)
            }
        })
    
    }
    

    render(){
        return(
            <div className="searchTracksDiv">
            <ul id="searchResults">
                {this.props.searchTrackObjects.map(track => {
                    var trackId = track.id
                    return <li key={track.id} className="searchSongList" onClick={()=>{this.queueSong(track,"e")}}><img className="searchAlbumImage" src={track.album.images[2].url} />{track.name} by {track.artists[0].name}</li>
                })}
            </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(searchTrackList)