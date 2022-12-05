import React, { useContext, useEffect } from 'react'
import { GlobalStoreContext } from '../store'
import ListCard from './ListCard.js'
import MUIDeleteModal from './MUIDeleteModal'
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import logo from './logo.svg';
import './AppYT.css';
import YouTubePlayerExample from './PlaylisterYouTubePlayer.js'
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import AddIcon from '@mui/icons-material/Add';
import Fab from '@mui/material/Fab'
import List from '@mui/material/List';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import FastForwardIcon from '@mui/icons-material/FastForward';
import FastRewindIcon from '@mui/icons-material/FastRewind';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { useState } from 'react';
import TextField from '@mui/material/TextField';
import AuthContext from '../auth';
/*
    This React component lists all the top5 lists in the UI.
    this is currently copied from homscreen view where we are usually signed in
    @author McKilla Gorilla
*/
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    useEffect(() => {
         store.loadPublishedPlaylists(); //need to uncomment or replace later for working
    }, []);

    function handleCreateNewList() {
        store.createNewList();
    }
    let listCard = "";
    if (store) {
        listCard = 
            <List sx={{ width: '90%',left: '5%', bgcolor: 'background.paper' }}>
            {
                store.idNamePairs.map((pair) => (
                    <ListCard
                        key={pair._id}
                        idNamePair={pair}
                        selected={false}
                        canEdit={false}
                    />
                ))
            }
            </List>;
    }
    
    const[userComment,setUserComment]=useState("");

  //const [query,setQuery] = useState('');

    //const [tempQuery,setTempQuery] = useState(''); //trying to set state for tempQuery
    
    
    
    function enterKey_Listener_for_Search(event){
        console.log('enterKey_Listener_for_Search has been entered')
        const tempUserComment=userComment
        //console.log("tempQuery: ", tempUserComment)
        setUserComment('');
        console.log("tempQuery: ", tempUserComment)

        //setTempQuery(tempQuery);
       
        console.log("line78 comment: ",userComment,store.currentPlayerList[3])
        store.commitUserComment(userComment, store.currentPlayerList[3] ) //passes current playlist id


    }

    function handleQueryChange(event){
        console.log("entered handleQueryChange");
        setUserComment(event.target.value); 
        console.log("setQuery",event.target.value )
        if (event.key === 'Enter') { 
            console.log('do validate')
            enterKey_Listener_for_Search(event)
          }
        
        //to submit the query
        // console.log("line92: ",userComment,store.currentPlayerList[3])
        // store.setUserComment(userComment, store.currentPlayerList[3] ) //passes current playlist id
        
    }
    
    function handleEnterKeyPress(e){
        if (e.key === "Enter"){
            console.log('enter key has been pressed')
            enterKey_Listener_for_Search(e)
        }
    }


  const handleSetUserComment = (event) => {
    setUserComment(event.target.value);
  };

  const handleSubmit = () => {
    
    console.log('submitted comment')

  }
  
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = (event, newTabIndex) => {
    setTabIndex(newTabIndex);
  };

  

  function prevClickHandler(){
    console.log(" prev clicked, now in prevClickHandler ");
  }
  function pauseClickHandler(){
    console.log(" pause clicked, now in pauseClickHandler ");
  }
  function playClickHandler(){
    console.log(" play clicked, now in playClickHandler ");

  }
  function nextClickHandler(){
    console.log(" next clicked, now in nextClickHandler ");
  }


    return(
    <div class="grid-container">
    
    <div class="grid-child-purple">
        {/* Grid Column 1 */}
        <span>AllListsScreen -user is like a guest, click on a playlist first to load it</span>
        { auth.loggedIn && <p> <b> User Is Logged In </b></p>}
        <div id="list-selector-list">
            {listCard}
            <MUIDeleteModal />
        </div>
    </div>

    <div class="grid-child-green">
    <div className="App">
      <div className="YtPlayerandComments">
      <Box>
      <Box>
        <Tabs value={tabIndex} onChange={handleTabChange}>
          <Tab label="Youtube Player" />
          <Tab label="Comments Section" />\
        </Tabs>
      </Box>
      <Box sx={{ padding: 2 }}>
        {tabIndex === 0 && (
          <Box>
            <Typography>The first tab</Typography>
            <header className="YoutubePlayerTab">
        Youtube Player:
        <YouTubePlayerExample />
        {/* <Button onClick={prevClickHandler} variant="contained"><FastRewindIcon /></Button>
        <Button onClick={pauseClickHandler} variant="contained"><PauseIcon /></Button>
        <Button onClick={playClickHandler} variant="contained"><PlayArrowIcon /></Button>
        <Button onClick={nextClickHandler} variant="contained"><FastForwardIcon /></Button> */}
      </header>
          </Box>
        )}
        
        {tabIndex === 1 && (
          <Box>
            <Typography>The Comments tab</Typography>
            <Box>

            <Paper style={{maxHeight: 400, overflow: 'auto'}}>
              <List>
              {/* <ListItem>test</ListItem>
              <ListItem>test</ListItem> */}
              </List>
            </Paper>
            
            <TextField id="filled-basic" label="Enter Comment:" variant="filled" value={userComment}
                        onChange={handleQueryChange}
                        onKeyDown={(e)=>handleEnterKeyPress(e)} onSubmit={handleSubmit}/>
            
            </Box>
          </Box>
        )}
        
      </Box>
    </Box>
    
      
    </div>
    </div>
        </div>


       
  
</div>)
    
            
            

    
}

export default AllListsScreen;