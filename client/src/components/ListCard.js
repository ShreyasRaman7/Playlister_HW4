import { useContext, useState } from 'react'

import * as React from 'react';
import AuthContext from '../auth';
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

/*
    This is a card in our list of top 5 lists. It lets select
    a list for editing and it has controls for changing its 
    name or deleting it.
    
    @author McKilla Gorilla
*/

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

  
  

const styleObj3 = {
    fontSize: 14,
    color: "#4a54f1",
    textAlign: "center",
    paddingTop: "100px",
}
function ListCard(props) {

    const { auth } = useContext(AuthContext);

    const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
    console.log("id for expand: ",idNamePair._id);
    console.log("store.currentList for expand: ",store.currentList);
    console.log('idNamePair._id: ',idNamePair._id);
    //store.getPlaylistForPlayer(idNamePair._id);
    console.log("store.currentList Line 69:",store.currentList)
    
  };

    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

    // let tempExpandList=idNamePair.songs
    // const tempExpandList2= []
    // tempExpandList.forEach(element => {
    //     //console.log("->",element.title, " by ",element.artist);
    //     //tempExpandList2.push(("->",element.title, " by ",element.artist))
    // })
    //console.log("line 77:",tempExpandList2)

    
        
      
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
        //store.setCurrentList(id)
        store.likeList(id);
    }

    let selectClass = "unselected-list-card";
    
    if (selected) {
        selectClass = "selected-list-card";
    }
    let cardStatus = false;
    if (store.isListNameEditActive) {
        cardStatus = true;
    }
    let cardElement =
        <ListItem
            id={idNamePair._id}
            key={idNamePair._id}
            sx={{ marginTop: '15px', display: 'flex', p: 1 }}
            style={{ width: '100%', fontSize: '20pt' }}
            button
            onClick={(event) => {
                // store.setCurrentList(idNamePair._id)
                // store.currentList.numListens +=1
                // console.log("test9--->store.currentList NumListens",store.currentList.numListens)
                if(!props.canEdit){
                    console.log("test9--->(!props.canEdit): user not signed in, will play playlist");
                    console.log('test9--->now sending playlist of youtube ids to player');
                    handleGetPlaylistForPlayer(idNamePair._id);
                    store.setCurrentList1(idNamePair._id)
                    store.currentList.numListens +=1
                    //store
                    console.log('test9---> numListens',store.currentList.numListens );
                    event.stopPropagation(); //i added this
                    store.getPlaylistForPlayer(idNamePair._id);


                }
                else{
                    console.log("test9--->(props.canEdit): user is signed in, will play playlist");
                    store.getPlaylistForPlayer(idNamePair._id);
                    //handleLoadList(event, idNamePair._id) 
                    // ^^^ we should probably comment this and simply handle opening list
                    //     with the extend menu button
                }
                
            }}
            
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>
            { props.canEdit && <p>test</p>}
            {props.canEdit &&
                <Box><Button onClick={(event) => {
                            likeList(event, idNamePair._id)
                        }} variant="outlined" startIcon={< ThumbUpIcon  style={{fontSize:'15pt' }}  />}>
                </Button></Box>
                }

                {props.canEdit &&
                <Box><Button onClick={(event) => {
                            duplOnClick(event, idNamePair._id)
                        }} variant="outlined" startIcon={<DifferenceIcon style={{fontSize:'12pt' }} />}>
                Dupl
                </Button></Box>
                }
            <Box sx={{ p: 1 }}>
                
                {props.canEdit && <IconButton onClick={handleToggleEdit} aria-label='edit' size='small' >
                    <EditIcon style={{fontSize:'30pt'}  } />
                </IconButton>}
                
            </Box>
            <Box> {} </Box>
            <Box sx={{ p: 1 }}>
            {props.canEdit &&
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'30pt' }}  />
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
            

            {/* {console.log('test current list1',store.currentList)} */}
            {/* insert song cards here */}
            {console.log("testStore CurrPlayerList: ",store.currentPlayerList)}
            {console.log("testStore CurrList: ",store.currentList)}
            {/* {console.log("store.currentPlayerList : ", store.currentPlayerList[4].name)} */}
            <b>replace this with the songcards</b>
            <span>NumSongs:</span> 
            { store.currentPlayerList &&   store.currentPlayerList[4].songs.length }
            <p></p>
            {' '}
            
            {store.currentPlayerList && store.currentPlayerList[4].songs[0].title }
            {' by '}
            {store.currentPlayerList && store.currentPlayerList[4].songs[0].artist }
            {'\n '}
            <p></p>
            {store.currentPlayerList && store.currentPlayerList[4].songs[1].title }
            {' by '}
            {store.currentPlayerList && store.currentPlayerList[4].songs[1].artist }

            {/* {store.currentPlayerList[4] &&  console.log(store.currentPlayerList[4])} */}
            {/* {store.currentPlayerList[4].songs && console.log('songs1:',store.currentPlayerList[4].songs )} */}
            {/* {store.currentPlayerList && 
            <Box>
                store.currentPlayerList[4].songs.map((song, index) => (
                    <SongCard
                        id={'playlist-song-' + (index)}
                        key={'playlist-song-' + (index)}
                        index={index}
                        song={song}
                    />
                ))  
                </Box>
            } */}

        
            
          </Typography>
        </CardContent>
      </Collapse>

            {/* <p style = {styleObj3}>test</p> */}

            <p style = {styleObj3}><Box> By:{idNamePair.ownerEmail} </Box> 
            <Box> <ThumbUpIcon  /> <span fontSize='10'> </span>  numLikes:{ idNamePair.numLikes ? idNamePair.numLikes :0 } </Box>
            <Box> <ThumbDownIcon  /> numDislikes:{idNamePair.numDislikes ? idNamePair.numDislikes :0 } </Box>
            
            <Box> <InsertCommentIcon />  numComments:{idNamePair.comments ? idNamePair.comments.length:0} </Box>
            <Box> <HearingIcon /> numListens: {idNamePair.numListens ? idNamePair.comments.length:0}</Box>
            <Box> <PublishedWithChangesIcon/> isPublished:{String(idNamePair.isPublished)} </Box>
            <Box> < UnpublishedIcon />  datePublished:{ idNamePair.datePublished &&(new Date(idNamePair.datePublished)).toDateString()}</Box>
            </p>
            
            
            
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