import { useContext, useState } from 'react'
import { GlobalStoreContext } from '../store'
import Box from '@mui/material/Box';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import IconButton from '@mui/material/IconButton';
import ListItem from '@mui/material/ListItem';
import TextField from '@mui/material/TextField';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import ThumbDownIcon from '@mui/icons-material/ThumbDown';
import DifferenceIcon from '@mui/icons-material/Difference';
import Button from '@mui/material/Button';
import AuthContext from '../auth';
import InsertCommentIcon from '@mui/icons-material/InsertComment';
import PublishedWithChangesIcon from '@mui/icons-material/PublishedWithChanges';
import UnpublishedIcon from '@mui/icons-material/Unpublished';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import CardActions from '@mui/material/CardActions';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import SongCard from './SongCard.js'
import HearingIcon from '@mui/icons-material/Hearing';
import List from '@mui/material/List';
import MUIDeleteModal from './MUIDeleteModal';
import MUIEditSongModal from './MUIEditSongModal';
import MUIRemoveSongModal from './MUIRemoveSongModal';

import * as React from 'react';
import WorkspaceScreen from './WorkspaceScreen';
/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/
const styleObj3 = {
    fontSize: 14,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "100px",
}


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));





function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const { auth } = useContext(AuthContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;
    const [expanded, setExpanded] = React.useState(false);

    const handleExpandClick = () => {
      setExpanded(!expanded);
      console.log("id for expand: ",idNamePair._id);
      console.log("store.currentList for expand: ",store.currentList);
      console.log('idNamePair._id: ',idNamePair._id);
      //store.getPlaylistForPlayer(idNamePair._id);
      console.log("store.currentList Line 69:",store.currentList)
  
    };


const ExpandMore = styled((props) => {
    const { expand, ...other } = props;
    return <IconButton {...other} />;
  })(({ theme, expand }) => ({
    transform: !expand ? 'rotate(0deg)' : 'rotate(180deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  }));





    //console.log(idNamePair)

    
        
      
    //console.log(props)

    function handleLoadList(event, id) {
        console.log("handleLoadList for " + id);
        if (!event.target.disabled) {
            let _id = event.target.id;
            if (_id.indexOf('list-card-text-') >= 0)
                _id = ("" + _id).substring("list-card-text-".length);

            console.log("load " + event.target.id);

            // CHANGE THE CURRENT LIST

            store.setCurrentList(id); 
            //store.setCurrentList1(id); // does not push history /playlist
        }
    }



    function handleToggleEdit(event) {
        event.stopPropagation();
        toggleEdit();
    }

    function toggleEdit() {
        let newActive = !editActive;
        if (newActive) {
            store.setIsListNameEditActive();
        }
        setEditActive(newActive);
    }

    async function handleDeleteList(event, id) {
        event.stopPropagation();
        let _id = event.target.id;
        _id = ("" + _id).substring("delete-list-".length);
        store.markListForDeletion(id);
    }

    function handleKeyPress(event) {
        if (event.code === "Enter") {
            let id = event.target.id.substring("list-".length);
            store.changeListName(id, text);
            toggleEdit();
        }
    }
    function handleUpdateText(event) {
        setText(event.target.value);
    }

    

    function handleGetPlaylistForPlayer(id){ //using to get playlist to play in player
        console.log("handleGetPlaylistForPlayer for id: " + id);
        store.getPlaylistForPlayer1(id); //keeps track of active player updates playlist id, accessible elsewhere
        // console.log(store.getPlaylistForPlayer(id));
    }

    function duplOnClick(event,id){ //handler for duplicate playlist button clicked
        event.stopPropagation();
        console.log("entered duplOnClick")
        let _id = event.target.id;
        console.log("id: ",id);
        store.duplicateList(id);
    }

    function likeList(event,id){
        event.stopPropagation();
        console.log('likeList entered')
        store.likeList(id);
    }
    function dislikeList(event,id){
        event.stopPropagation();
        console.log('dislikeList entered')
        store.dislikeList(id);
    }

    let selectClass = "unselected-list-card";
    
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }

    let modalJSX = "";
    if (store.isEditSongModalOpen()) {
        modalJSX = <MUIEditSongModal />;
    }
    else if (store.isRemoveSongModalOpen()) {
        modalJSX = <MUIRemoveSongModal />;
    }

    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 ,borderRadius: "25px" ,borderColor: "black", borderStyle: "",bgcolor: "lightgray", borderColor: "black",}}
            style={{ width: '100%', fontSize: '20pt' }}
            button
            onClick={(event) => {
                if(!props.canEdit){
                    console.log("(!props.canEdit): user not signed in, will play playlist");
                    console.log('now sending playlist of youtube ids to player');
                    handleGetPlaylistForPlayer(idNamePair._id);
                    //store.getPlaylistForPlayer();
                    //handleLoadList(event, idNamePair._id)

                }
                else{
                    console.log("(props.canEdit): user is signed in, will play playlist");

                    handleLoadList(event, idNamePair._id)
                    //i commented handleLoadList on Dec4
                }
                
            }}
            
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>

            {auth.loggedIn  && 
                <Box><Button onClick={(event) => { //replaced props.canedit with auth
                            likeList(event, idNamePair._id)
                        }} variant="outlined" startIcon={< ThumbUpIcon /> }>
                            <span>#likes:{idNamePair.numLikes ? idNamePair.numLikes :0}</span>
                </Button>
                
                
                </Box>
                }
            {auth.loggedIn  &&
                <Box><Button onClick={(event) => { //replaced props.canedit with auth
                            dislikeList(event, idNamePair._id)
                        }} variant="outlined" startIcon={< ThumbDownIcon />}>
                            <span>#dislikes:{idNamePair.numDislikes ? idNamePair.numDislikes :0}</span>
                </Button></Box>
                }
                {auth.loggedIn && // replaced props.canedit with auth
                <Box><Button onClick={(event) => {
                            duplOnClick(event, idNamePair._id)
                        }} variant="outlined" startIcon={<DifferenceIcon />}>
                Dupl
                </Button></Box>
                }
            <Box sx={{ p: 1 }}>
                
                {props.canEdit && <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'25pt'}} />
                </IconButton>}
                
            </Box>
            <Box> {} </Box>
            <Box sx={{ p: 1 }}>
            {props.canEdit &&
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'25pt'}} />
                </IconButton>
            }
            </Box>
            <ExpandMore
          expand={expanded}
          onClick={handleExpandClick}
          aria-expanded={expanded}
          aria-label="show more"
        >
          <ExpandMoreIcon />
        </ExpandMore>

        <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Typography paragraph>

            

            test


            <span>NumSongs:</span> 
            { store.currentPlayerList &&   store.currentPlayerList[4].songs.length }
            {/* <p></p>
            {' '}

            {store.currentPlayerList && store.currentPlayerList[4].songs[0].title }
            {' by '}
            {store.currentPlayerList && store.currentPlayerList[4].songs[0].artist }
            {'\n '}
            <p></p>
            {store.currentPlayerList && store.currentPlayerList[4].songs[1].title }
            {' by '}
            {store.currentPlayerList && store.currentPlayerList[4].songs[1].artist } */}

            <Box>---------</Box>
            {/* {store.currentPlayerList && store.currentPlayerList[4].songs.toString() } */}
            {store.currentPlayerList && 

            <Box>
                    <List 
                id="playlist-cards" 
                sx={{overflow: 'scroll', height: '87%', width: '100%', bgcolor: '#8000F00F'}}
            >
                { 
                    store.currentPlayerList[4].songs.map((song, index) => ( // store.currentPlayerList[4] is current playlist
                        <SongCard
                            id={'playlist-song-' + (index)}
                            key={'playlist-song-' + (index)}
                            index={index}
                            song={song}
                        />
                    ))  
                }
            </List>   
            { modalJSX } 
            </Box>
        }           


          </Typography>
        </CardContent>
      </Collapse>


            
            {/* <p style = {styleObj3}>test</p> */}
            <div className='ListInfo'>
            
            <p style = {styleObj3}>
                
            <Box> ListID:{idNamePair._id ? idNamePair._id: ''} </Box> 
            <Box> ListName:{idNamePair.name ? idNamePair.name: ''} </Box> 
                <Box> By userEmail:{idNamePair.ownerEmail ? idNamePair.ownerEmail: ''} </Box> 
            <Box >
                <Box> <ThumbUpIcon/>  numUserLikesLen:{idNamePair.userLikes ? idNamePair.userLikes.length :0} </Box>
                <Box> <ThumbUpIcon/>  numLikes:{idNamePair.numLikes ? idNamePair.numLikes :0} </Box>
                <Box> <ThumbDownIcon/>  numDislikes:{idNamePair.numDislikes ? idNamePair.numDislikes :0} </Box>
                <Box> <InsertCommentIcon />  numComments:{idNamePair.comments ? idNamePair.comments.length:0} </Box>
                <Box> <HearingIcon /> numListens: {idNamePair.numListens ? idNamePair.comments.length:0}</Box>
                <Box> <PublishedWithChangesIcon /> isPublished: {idNamePair.isPublished ? String(idNamePair.isPublished) :  false}</Box>
                <Box> < UnpublishedIcon  />  datePublished:{ idNamePair.datePublished &&(new Date(idNamePair.datePublished)).toDateString()}</Box>
                <Box> < UnpublishedIcon  />  lastUpdatedAt:{ idNamePair.updatedAt &&(new Date(idNamePair.updatedAt)).toDateString()}</Box>
            </Box>
            
            </p>
            </div>

        </ListItem>
        
    if (editActive) {
        cardElement =
            <TextField
                margin="normal"
                required
                fullWidth
                id={"list-" + idNamePair._id}
                label="Playlist Name"
                name="name"
                autoComplete="Playlist Name"
                className='list-card'
                onKeyPress={handleKeyPress}
                onChange={handleUpdateText}
                defaultValue={idNamePair.name}
                inputProps={{style: {fontSize: 48}}}
                InputLabelProps={{style: {fontSize: 24}}}
                autoFocus
            />
    }
    return (
        cardElement
    );
}

export default ListCard;