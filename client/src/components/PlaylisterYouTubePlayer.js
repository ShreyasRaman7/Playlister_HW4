import React from 'react';
import YouTube from 'react-youtube';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Button from '@mui/material/Button';
import { useContext } from 'react'
import { GlobalStoreContext } from '../store'

export default function YouTubePlayerExample() {
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
    let testPlaylist1=playlist
    //replace playlist with playlist passed by listcard in allListsScreen

    const { store } = useContext(GlobalStoreContext);
    if(store && store.currentPlayerList){
        playlist=store.currentPlayerList    
        console.log("store.currentPlayerList : ",store.currentPlayerList )
    }

    // THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
    let currentSong = 0;

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
        myPlayer.loadVideoById(song);
        myPlayer.playVideo();

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

    }

    function onPlayerReady(event) {
        myPlayer =event.target
        loadAndPlayCurrentSong(event.target);
        event.target.playVideo();
        console.log("event target, the player",event.target)
        
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
        console.log(player)
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
    </div>
    
    )

}