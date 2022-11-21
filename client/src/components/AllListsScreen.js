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
import Typography from '@mui/material/Typography'
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
/*
    This React component lists all the top5 lists in the UI.
    this is currently copied from homscreen view where we are usually signed in
    @author McKilla Gorilla
*/
const AllListsScreen = () => {
    const { store } = useContext(GlobalStoreContext);

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
    



    return(
    <div class="grid-container">
    
    <div class="grid-child-purple">
        {/* Grid Column 1 */}
        <span>AllListsScreen -user is like a guest</span>
        <div id="list-selector-list">
            {listCard}
            <MUIDeleteModal />
        </div>
    </div>

    <div class="grid-child-green">
        {/* Grid Column 2 */}
        
        
        {/* <ButtonGroup variant="contained" aria-label="outlined primary button group">
  <Button>Youtube Player</Button>
  <Button>Comments</Button>
</ButtonGroup> */}

        {/* insert tab code here */}


        <div id="playlist-selector"></div>
        <div id='youtube_tab'>
        <YouTubePlayerExample />
        </div>

    </div>
  
</div>)
    // return (
        
    //     <div id="playlist-selector">
    //         <div id='youtube_tab'>
    //             <h2>YouTube Playlist Example</h2>
    //             <YouTubePlayerExample />
    //         </div>
            
            

    //         <div id="list-selector-list">
    //             {
    //                 listCard
    //             }
    //             <MUIDeleteModal />
    //         </div>
    //         <div id="list-selector-heading">
            
    //         </div>
            
    //     </div>)
}

export default AllListsScreen;