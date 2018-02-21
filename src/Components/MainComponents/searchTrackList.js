import React, {Component} from 'react'
import { connect } from "react-redux"
import store from "./../../store"
import { addToQueue } from "./../../actions/queueActions"

const mapStateToProps = state =>{
    return{
        searchTrackObjects: state.queue.searchTrackObjects,
        queue:state.queue.queue
    }
}

const mapDispatchToProps = dispatch =>{
    return{
        queueSong: (song) => dispatch(addToQueue(song))  

    }
}
class searchTrackList extends Component{
    constructor(props){
        super(props)
        this.queueSong = this.queueSong.bind(this)
    }
    queueSong(trackId,event){
        console.log("24" + trackId)
        this.props.queueSong(trackId)
        store.getState();
        this.setState({
            //queue: this.state.queue.concat([trackId]),
            currentTrack: "https://open.spotify.com/embed?uri=spotify:track:" + trackId
        }, ()=>{
            console.log(this.state.queue)
            if(this.props.queue.length <= 1){
                this.props.playTrack(trackId)
            }            
        }) 
    }
    render(){
        return(
            <div>
            <ul id="searchResults">
                {this.props.searchTrackObjects.map(track => {
                    var trackId = track.id
                    return <li key={track.id} className="searchSongList" onClick={()=>{this.queueSong(track.id,"e")}}><img className="searchAlbumImage" src={track.album.images[2].url} />{track.name} by {track.artists[0].name}</li>
                })}
            </ul>
            </div>
        )
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(searchTrackList)