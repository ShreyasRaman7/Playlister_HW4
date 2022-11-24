import React from 'react';
import YouTube from 'react-youtube';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Button from '@mui/material/Button';
import { useContext, useState } from 'react';
import { GlobalStoreContext } from '../store'
import { Paper } from '@mui/material';
import Box from '@mui/material/Box';


// let currentSong = 0;
// let artist1 ;
// let title1;
let currentSong_1=0
export default function YouTubePlayerExample() {
    const [title_state, setTitle_state] = useState('');
let currentSong=0;
let artist1=''
let title1 = ""
let artist2="testAdele"
    // THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
    // YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
    // DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
    // FROM ONE SONG TO THE NEXT
    let myPlayer= null
    // THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
    let playlist = [
        "mqmxkGjow1A",
        "8RbXIMZmVv8",
        "8UbNbor3OqQ"
    ];
    let titleArray=['Fast Train','Set the Controls for the Heart of the Sun','Astronomy Domine' ]
    let artistArray=['Solomon Burke','Pink Floyd','Pink Floyd']
    //let testPlaylist1=playlist
    //replace playlist with playlist passed by listcard in allListsScreen

    const { store } = useContext(GlobalStoreContext);
    //playlist=store.currentPlayerList[0]
    
    if(store && store.currentPlayerList){
        //console.log("store.currentPlayerlist: ",store.currentPlayerList);
        // for(i;i<store.currentPlayerList.songs.length;i++) {
        //           songsYtArray.push(store.currentPlayerList.songs[i].youTubeId)
        //       }
        playlist=store.currentPlayerList[0]
        titleArray=store.currentPlayerList[1]
        artistArray =store.currentPlayerList[2]
        console.log("line 41 : ",store.currentPlayerList)
        console.log("line 42 : ",titleArray)
        //console.log("line 29 store.currentPlayerList : ",store.currentPlayerList )
    }
    console.log("line 31 playlist:",playlist)
    //console.log("playlist.songs line 32",playlist.songs)
    
    
    //  for(i;i<playlist.songs.length;i++) {
    //      songsYtArray.push(playlist.songs[i].youTubeId)
    //  }
    //console.log("songsYtArray: ",songsYtArray)
    //playlist=songsYtArray
    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    

    const playerOptions = {
        height: '390',
        width: '640',
        playerVars: {
            // https://developers.google.com/youtube/player_parameters
            autoplay: 0,
        },
    };

    // THIS FUNCTION LOADS THE CURRENT SONG INTO
    // THE PLAYER AND PLAYS IT
    function loadAndPlayCurrentSong(player) {
        let song = playlist[currentSong];
        player.loadVideoById(song);
        player.playVideo();
    }

    // THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
    function incSong() {
        currentSong++;
        currentSong = currentSong % playlist.length;
        let song = playlist[currentSong];
        //let song = playlist[currentSong_state];
        myPlayer.loadVideoById(song);
        myPlayer.playVideo();
        console.log("current song: ",currentSong)
        console.log("current song artist: ",artistArray[currentSong])
        artist1=artistArray[currentSong]
        title1=titleArray[currentSong]
        artist2="testBobMarley"
        artist2=titleArray[currentSong]
        console.log("artist2: ",artist2)

        //setCurrentSong_state(currentSong_state+1)
        //setTitle_state(titleArray[currentSong])
        currentSong_1+=1
        console.log('curr song_1->',currentSong_1)
        
        //console.log("test3 currentSong_state : ",currentSong_state)
        
        
        
        

    }

    function decSong() {
        
        if(currentSong!=0){
            console.log("current song: ",currentSong)
            currentSong-=1;
            
        }
        else{
            currentSong=playlist.length-1
        }
            //currentSong = currentSong % playlist.length;
            let song = playlist[currentSong];
            myPlayer.loadVideoById(song);
            myPlayer.playVideo();
            artist1=artistArray[currentSong]
            title1=titleArray[currentSong]    

    }

    function onPlayerReady(event) {
        myPlayer =event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        //console.log("event target, the player",event.target)
        
    }


    function prevClickHandler(){
        console.log(" prev clicked, now in prevClickHandler ");
        decSong();
      }
      function pauseClickHandler(){
        console.log(" pause clicked, now in pauseClickHandler ");
        myPlayer.pauseVideo();
      }
      function playClickHandler(){
        console.log(" play clicked, now in playClickHandler ");
        myPlayer.playVideo();
        
      }
      function nextClickHandler(){
        console.log(" next clicked, now in nextClickHandler ");
        incSong();
      }
    // THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
    // CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
    // VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
    // VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
    function onPlayerStateChange(playerStatus,player) {
        //console.log(player)
        // let playerStatus = event.data;
        // let player = event.target;
        if (playerStatus === -1) {
            // VIDEO UNSTARTED
            console.log("-1 Video unstarted");
        } else if (playerStatus === 0) {
            // THE VIDEO HAS COMPLETED PLAYING
            console.log("0 Video ended");
            incSong();
            loadAndPlayCurrentSong(player);
        } else if (playerStatus === 1) {
            // THE VIDEO IS PLAYED
            
            console.log("1 Video played");
        } else if (playerStatus === 2) {
            // THE VIDEO IS PAUSED
            console.log("2 Video paused");
        } else if (playerStatus === 3) {
            // THE VIDEO IS BUFFERING
            console.log("3 Video buffering");
        } else if (playerStatus === 5) {
            // THE VIDEO HAS BEEN CUED
            console.log("5 Video cued");
        }
    }

    //console.log()
    return (
    <div>
    <YouTube
        videoId={playlist[currentSong]}
        opts={playerOptions}
        onReady={onPlayerReady}
        onStateChange={(e)=>onPlayerStateChange(e.data,e.target)} />
    <Button onClick={prevClickHandler} variant="contained"><FastRewindIcon /></Button>
        <Button onClick={pauseClickHandler} variant="contained"><PauseIcon /></Button>
        <Button onClick={playClickHandler} variant="contained"><PlayArrowIcon /></Button>
        <Button onClick={nextClickHandler} variant="contained"><FastForwardIcon /></Button>

        <Paper elevation={16}>
        { title1&&<Box>{title1}</Box>  }
        {currentSong_1}
        {/* { titleArray&&<Box>{titleArray}</Box>  }
        { artistArray&&<Box>{artistArray}</Box>  } */}
        <span>by</span>
        { artistArray&&<Box>{artist1}</Box>  }
        { artistArray&&<Box>{artistArray[currentSong]}</Box>  }
        {/* {currentSong_state} */}
        </Paper>
    </div>
    
    )

}