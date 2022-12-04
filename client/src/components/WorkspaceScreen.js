import { useContext } from 'react'
import { useHistory } from 'react-router-dom'
import SongCard from './SongCard.js'
import MUIEditSongModal from './MUIEditSongModal'
import MUIRemoveSongModal from './MUIRemoveSongModal'
import Box from '@mui/material/Box';
import Button from "@mui/material/Button"
import List from '@mui/material/List';
import { GlobalStoreContext } from '../store/index.js'
import { Paper } from '@mui/material'


/*
    This React component lets us edit a loaded list, which only
    happens when we are on the proper route.
    
    @author McKilla Gorilla
*/
let isPublished=false
function WorkspaceScreen() {
    const { store } = useContext(GlobalStoreContext);
    store.history = useHistory();
    

    //isPublished = false;
    
    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    function publishButtonClickHandler(event){
        console.log('publish button clicked')
        console.log(store.currentList)
        
        store.publishPlaylist()
        isPublished=true
        console.log("isPublished: ",isPublished)



    }

    return (
        <Box>
        <span>Workspace Screen</span> 
        { store.currentList.songs.length >0 && <p>test</p>}
        <h2>YouTube Playlist Example</h2>
            
            <div id="youtube_player"></div>
        <List 
            id="playlist-cards" 
            sx={{ width: '100%', bgcolor: 'background.paper' }}
        >
            {
                store.currentList.songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
            }
         
         </List> 
         
         {  isPublished && <Box component="span" sx={{ p: 2, backgroundColor:'#32CD32',border: '1px dashed grey' }}>Is Published</Box>}
         
         { store.currentList.songs.length>0 &&  <Button onClick= {publishButtonClickHandler} variant="contained">Publish Playlist</Button>   }
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;


