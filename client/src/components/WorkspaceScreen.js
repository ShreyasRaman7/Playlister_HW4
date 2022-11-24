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
         { isPublished && <Box component="span" sx={{ p: 2, backgroundColor:'#32CD32',border: '1px dashed grey' }}>Is Published</Box>}
         
        <Button onClick= {publishButtonClickHandler} variant="contained">Publish Playlist</Button>      
         { modalJSX }
         </Box>
    )
}

export default WorkspaceScreen;


// import { useContext, useState } from 'react'
// import { useHistory } from 'react-router-dom'
// import SongCard from './SongCard.js'
// import MUIEditSongModal from './MUIEditSongModal'
// import MUIRemoveSongModal from './MUIRemoveSongModal'
// import Box from '@mui/material/Box';
// import Button from "@mui/material/Button"
// import List from '@mui/material/List';
// import Alert from '@mui/material/Alert';
// import { GlobalStoreContext } from '../store/index.js'


// /*
//     This React component lets us edit a loaded list, which only
//     happens when we are on the proper route.
    
//     @author McKilla Gorilla
// */

// let publishClicked =false
// let showAgain= true
// function WorkspaceScreen() {
//     let publishClicked =false
//     const { store } = useContext(GlobalStoreContext);
//     store.history = useHistory();
//     // // store.publishClicked = publishClicked
//     // // store.numPublishClick = 0

//     // //const [ publishClicked, setPublishClicked ] = useState(store.publishClicked);

//     // function setStorePublishClickedtoFalse(){
//     //     store.publishClicked = false
//     // }
    
//     let modalJSX = "";
//     if (store.isEditSongModalOpen()) {
//         modalJSX = <MUIEditSongModal />;
//     }
//     else if (store.isRemoveSongModalOpen()) {
//         modalJSX = <MUIRemoveSongModal />;
//     }

//     function publishButtonClickHandler(event){
//         console.log('publish button clicked')
//         console.log(store.currentList)
//         publishClicked=true
//         console.log("publish click: ",publishClicked)
//         store.publishPlaylist()
//         store.numPublishClick+=1
        
//     }
//     function closeAlert1(event){
//         console.log("close alert button clicekd")
//         store.publishClicked=false
//         //setStorePublishClickedtoFalse()
//         showAgain=false
//         console.log('store.publishClicked ',store.publishClicked)
//     }
//     console.log('store.publishClicked before return : ',store.publishClicked)
//     console.log('store.numPublishClicked before return : ',store.numPublishClick)

//     return (
//         <Box>
//         <span>Workspace Screen</span>    
//         <h2>YouTube Playlist Example</h2>
            
//             <div id="youtube_player"></div>
//         <List 
//             id="playlist-cards" 
//             sx={{ width: '100%', bgcolor: 'background.paper' }}
//         >
//             {
//                 store.currentList.songs.map((song, index) => (
//                     <SongCard
//                         id={'playlist-song-' + (index)}
//                         key={'playlist-song-' + (index)}
//                         index={index}
//                         song={song}
//                     />
//                 ))  
//             }
//          </List> 
//          {/* {props.canEdit && <IconButton onClick={handleToggleEdit} aria-label='edit'></IconButton> */}
//         {<Button onClick= {publishButtonClickHandler} variant="contained">Publish Playlist</Button>     } 
//         {/* {publishClicked && <Alert onClose={() => {}}>This is a success alert — check it out!</Alert>} */}
//         { publishClicked &&<Alert
//         action={
//           <Button color="inherit" size="small" onClick={closeAlert1}>
//             X
//           </Button>
//         }
//       >
//         Playlist is Successfully Published!
//       </Alert>}
//          { modalJSX }
//          </Box>
//     )
// }

// export default WorkspaceScreen;