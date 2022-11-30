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
function ListCard(props) {
    const { store } = useContext(GlobalStoreContext);
    const [editActive, setEditActive] = useState(false);
    const [text, setText] = useState("");
    const { idNamePair, selected } = props;

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
                if(!props.canEdit){
                    console.log("(!props.canEdit): user not signed in, will play playlist");
                    console.log('now sending playlist of youtube ids to player');
                    handleGetPlaylistForPlayer(idNamePair._id);
                    //store.getPlaylistForPlayer();


                }
                else{
                    console.log("(props.canEdit): user is signed in, will play playlist");
                    handleLoadList(event, idNamePair._id)
                }
                
            }}
            
        >
            <Box sx={{ p: 1, flexGrow: 1 }}>{idNamePair.name}</Box>

            {props.canEdit &&
                <Box><Button onClick={(event) => {
                            likeList(event, idNamePair._id)
                        }} variant="outlined" startIcon={< ThumbUpIcon />}>
                </Button></Box>
                }

                {props.canEdit &&
                <Box><Button onClick={(event) => {
                            duplOnClick(event, idNamePair._id)
                        }} variant="outlined" startIcon={<DifferenceIcon />}>
                Dupl
                </Button></Box>
                }
            <Box sx={{ p: 1 }}>
                
                {props.canEdit && <IconButton onClick={handleToggleEdit} aria-label='edit'>
                    <EditIcon style={{fontSize:'48pt'}} />
                </IconButton>}
                
            </Box>
            <Box> {} </Box>
            <Box sx={{ p: 1 }}>
            {props.canEdit &&
                <IconButton onClick={(event) => {
                        handleDeleteList(event, idNamePair._id)
                    }} aria-label='delete'>
                    <DeleteIcon style={{fontSize:'48pt'}} />
                </IconButton>
            }
            </Box>

            
            {/* <p style = {styleObj3}>test</p> */}

            <p style = {styleObj3}><Box> By:{idNamePair.ownerEmail} </Box> 
            <Box> <span fontSize='10'> </span> numLikes:{idNamePair.numLikes} </Box>
            <Box> numDislikes:{idNamePair.numDislikes} </Box>
            <Box>  numComments:{idNamePair.comments ? idNamePair.comments.length:0} </Box>
            
            <Box> isPublished:{String(idNamePair.isPublished)} </Box>
            {/* <Box> datePublished:{idNamePair.datePublished} </Box> */}
            <Box>Published:{(new Date(idNamePair.datePublished)).toDateString()}</Box>
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