// THIS EXAMPLE DEMONSTRATES HOW TO DYNAMICALLY MAKE A
// YOUTUBE PLAYER AND EMBED IT IN YOUR SITE. IT ALSO
// DEMONSTRATES HOW TO IMPLEMENT A PLAYLIST THAT MOVES
// FROM ONE SONG TO THE NEXT

import { useEffect } from "react";

// THIS WILL STORE OUR YOUTUBE PLAYER
let player;
let PLAYER_NAME = 'youtube_player';

// THIS HAS THE YOUTUBE IDS FOR THE SONGS IN OUR PLAYLIST
let playlist = [
  "mxygNM3b95M",
  "mqmxkGjow1A",
  "8RbXIMZmVv8",
  "8UbNbor3OqQ"
];

// THIS IS THE INDEX OF THE SONG CURRENTLY IN USE IN THE PLAYLIST
let currentSong;

// DYNAMICALLY LOAD THE YOUTUBE API FOR USE
let tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
let firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);  


// //trying stuff
// var scriptUrl = 'https:\/\/www.youtube.com\/s\/player\/b50b69c9\/www-widgetapi.vflset\/www-widgetapi.js';try{var ttPolicy=window.trustedTypes.createPolicy("youtube-widget-api",{createScriptURL:function(x){return x}});scriptUrl=ttPolicy.createScriptURL(scriptUrl)}catch(e){}var YT;if(!window["YT"])YT={loading:0,loaded:0};var YTConfig;if(!window["YTConfig"])YTConfig={"host":"https://www.youtube.com"};
// if(!YT.loading){YT.loading=1;(function(){var l=[];YT.ready=function(f){if(YT.loaded)f();else l.push(f)};window.onYTReady=function(){YT.loaded=1;for(var i=0;i<l.length;i++)try{l[i]()}catch(e$0){}};YT.setConfig=function(c){for(var k in c)if(c.hasOwnProperty(k))YTConfig[k]=c[k]};var a=document.createElement("script");a.type="text/javascript";a.id="www-widgetapi-script";a.src=scriptUrl;a.async=true;var c=document.currentScript;if(c){var n=c.nonce||c.getAttribute("nonce");if(n)a.setAttribute("nonce",n)}var b=
// document.getElementsByTagName("script")[0];b.parentNode.insertBefore(a,b)})()};


//trying stuff^^

// THE onYouTubeIframeAPIReady FUNCTION IS GLOBAL AND GETS CALLED
// WHEN WHEN THE YOUTUBE API HAS BEEN LOADED AS A RESULT OF
// OUR DYNAMICALLY LOADING INTO OUR PAGE'S SCRIPT
function onYouTubeIframeAPIReady() {
  // START OUR PLAYLIST AT THE BEGINNING
  currentSong = 0;

  // NOW MAKE OUR PLAYER WITH OUR DESIRED PROPERTIES
  if (currentSong >= 0) {
    player = new window.YT.Player(PLAYER_NAME, {
      height: '390',
      width: '640',
      playerVars: {
        'playsinline': 1,
        'origin': "https://www.youtube.com"
      },
      events: {
        // NOTE OUR EVENT HANDLER FUNCTIONS HERE
        'onReady': onPlayerReady,
        'onStateChange': onPlayerStateChange
      }
    });
  }
}

// THIS EVENT HANDLER GETS CALLED ONCE THE PLAYER IS CREATED
function onPlayerReady(event) {
  loadAndPlayCurrentSong();
  event.target.playVideo();
}

// THIS FUNCTION LOADS THE CURRENT SONG INTO
// THE PLAYER AND PLAYS IT
function loadAndPlayCurrentSong() {
  let song = playlist[currentSong];
  player.loadVideoById(song);
  player.playVideo();
}

// THIS FUNCTION INCREMENTS THE PLAYLIST SONG TO THE NEXT ONE
function incSong() {
  currentSong++;
  currentSong = currentSong % playlist.length;
}

// THIS IS OUR EVENT HANDLER FOR WHEN THE YOUTUBE PLAYER'S STATE
// CHANGES. NOTE THAT playerStatus WILL HAVE A DIFFERENT INTEGER
// VALUE TO REPRESENT THE TYPE OF STATE CHANGE. A playerStatus
// VALUE OF 0 MEANS THE SONG PLAYING HAS ENDED.
function onPlayerStateChange(event) {
  let playerStatus = event.data;
  let color;
  if (playerStatus == -1) {
    // VIDEO UNSTARTED
    color = "#37474F";
    console.log("-1 Video unstarted");
  } else if (playerStatus == 0) {
    // THE VIDEO HAS COMPLETED PLAYING
    color = "#FFFF00";
    console.log("0 Video ended");
    incSong();
    loadAndPlayCurrentSong();
  } else if (playerStatus == 1) {
    // THE VIDEO IS PLAYED
    color = "#33691E";
    console.log("1 Video played");
  } else if (playerStatus == 2) {
    // THE VIDEO IS PAUSED
    color = "#DD2C00";
    console.log("2 Video paused");
  } else if (playerStatus == 3) {
    // THE VIDEO IS BUFFERING
    color = "#AA00FF";
    console.log("3 Video buffering");
  } else if (playerStatus == 5) {
    // THE VIDEO HAS BEEN CUED
    color = "#FF6DOO";
    console.log("5 Video cued");
  }
  if (color) {
    document.getElementById(PLAYER_NAME).style.borderColor = color;
  }
}