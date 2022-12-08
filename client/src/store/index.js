import { createContext, useContext, useState } from 'react'
import { useHistory } from 'react-router-dom'
import jsTPS from '../common/jsTPS'
import api from './store-request-api'
import CreateSong_Transaction from '../transactions/CreateSong_Transaction'
import MoveSong_Transaction from '../transactions/MoveSong_Transaction'
import RemoveSong_Transaction from '../transactions/RemoveSong_Transaction'
import UpdateSong_Transaction from '../transactions/UpdateSong_Transaction'
import AuthContext from '../auth'
/*
    This is our global data store. Note that it uses the Flux design pattern,
    which makes use of things like actions and reducers. 
    
    @author McKilla Gorilla
*/

// THIS IS THE CONTEXT WE'LL USE TO SHARE OUR STORE
export const GlobalStoreContext = createContext({});
console.log("create GlobalStoreContext");
let dupeCounter =0
// THESE ARE ALL THE TYPES OF UPDATES TO OUR GLOBAL
// DATA STORE STATE THAT CAN BE PROCESSED
export const GlobalStoreActionType = {
    LIKE_LIST: "LIKE_LIST",
    DISLIKE_LIST: "DISLIKE_LIST",
    COMMENT_LIST: "COMMENT_LIST",
    LISTEN_LIST: "LISTEN_LIST",
    CHANGE_LIST_NAME: "CHANGE_LIST_NAME",
    CLOSE_CURRENT_LIST: "CLOSE_CURRENT_LIST",
    CREATE_NEW_LIST: "CREATE_NEW_LIST",
    LOAD_ID_NAME_PAIRS: "LOAD_ID_NAME_PAIRS",
    MARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    UNMARK_LIST_FOR_DELETION: "MARK_LIST_FOR_DELETION",
    SET_CURRENT_LIST: "SET_CURRENT_LIST",
    SET_LIST_NAME_EDIT_ACTIVE: "SET_LIST_NAME_EDIT_ACTIVE",
    EDIT_SONG: "EDIT_SONG",
    REMOVE_SONG: "REMOVE_SONG",
    HIDE_MODALS: "HIDE_MODALS",
    PUBLISH_PLAYLIST: "PUBLISH_PLAYLIST",
    SET_CURRENT_PLAYER_LIST: "SET_CURRENT_PLAYER_LIST",
}

// WE'LL NEED THIS TO PROCESS TRANSACTIONS
const tps = new jsTPS();

const CurrentModal = {
    NONE : "NONE",
    DELETE_LIST : "DELETE_LIST",
    EDIT_SONG : "EDIT_SONG",
    REMOVE_SONG : "REMOVE_SONG"
}

// WITH THIS WE'RE MAKING OUR GLOBAL DATA STORE
// AVAILABLE TO THE REST OF THE APPLICATION
function GlobalStoreContextProvider(props) {
    // THESE ARE ALL THE THINGS OUR DATA STORE WILL MANAGE
    const [store, setStore] = useState({
        currentModal : CurrentModal.NONE,
        idNamePairs: [],
        currentList: [],
        currentSongIndex : -1,
        currentSong : null,
        newListCounter: 0,
        listNameActive: false,
        listIdMarkedForDeletion: null,
        listMarkedForDeletion: null,
        currentPlayerList:[['mqmxkGjow1A'],[],[],[],[],[]]
    });
    const history = useHistory();

    console.log("inside useGlobalStore");

    // SINCE WE'VE WRAPPED THE STORE IN THE AUTH CONTEXT WE CAN ACCESS THE USER HERE
    const { auth } = useContext(AuthContext);
    console.log("auth: " + auth);

    // HERE'S THE DATA STORE'S REDUCER, IT MUST
    // HANDLE EVERY TYPE OF STATE CHANGE
    const storeReducer = (action) => {
        const { type, payload } = action;
        switch (type) {

            case GlobalStoreActionType.LIKE_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.DISLIKE_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.COMMENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            case GlobalStoreActionType.LISTEN_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            // LIST UPDATE OF ITS NAME
            case GlobalStoreActionType.CHANGE_LIST_NAME: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.PUBLISH_PLAYLIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload.idNamePairs,
                    currentList: payload.playlist,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // STOP EDITING THE CURRENT LIST
            case GlobalStoreActionType.CLOSE_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: null, //editing 
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // CREATE A NEW LIST
            case GlobalStoreActionType.CREATE_NEW_LIST: {                
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter + 1,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                })
            }
            // GET ALL THE LISTS SO WE CAN PRESENT THEM
            case GlobalStoreActionType.LOAD_ID_NAME_PAIRS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: payload,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // PREPARE TO DELETE A LIST
            case GlobalStoreActionType.MARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist
                });
            }
            case GlobalStoreActionType.UNMARK_LIST_FOR_DELETION: {
                return setStore({
                    currentModal : CurrentModal.DELETE_LIST,
                    idNamePairs: store.idNamePairs,
                    currentList: null,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: payload.id,
                    listMarkedForDeletion: payload.playlist
                });
            }
            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }

            // UPDATE A LIST
            case GlobalStoreActionType.SET_CURRENT_PLAYER_LIST: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                    currentPlayerList: payload
                });
            }

            // START EDITING A LIST NAME
            case GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: payload,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: true,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            // 
            case GlobalStoreActionType.EDIT_SONG: {
                return setStore({
                    currentModal : CurrentModal.EDIT_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong, //i now check for current song in editsong modal
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null,
                });
            }
            case GlobalStoreActionType.REMOVE_SONG: {
                return setStore({
                    currentModal : CurrentModal.REMOVE_SONG,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: payload.currentSongIndex,
                    currentSong: payload.currentSong, //check for current song when in the delete song modal
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            case GlobalStoreActionType.HIDE_MODALS: {
                return setStore({
                    currentModal : CurrentModal.NONE,
                    idNamePairs: store.idNamePairs,
                    currentList: store.currentList,
                    currentSongIndex: -1,
                    currentSong: null,
                    newListCounter: store.newListCounter,
                    listNameActive: false,
                    listIdMarkedForDeletion: null,
                    listMarkedForDeletion: null
                });
            }
            default:
                return store;
        }
    }

    // THESE ARE THE FUNCTIONS THAT WILL UPDATE OUR STORE AND
    // DRIVE THE STATE OF THE APPLICATION. WE'LL CALL THESE IN 
    // RESPONSE TO EVENTS INSIDE OUR COMPONENTS.


    

    // THIS FUNCTION PROCESSES CHANGING A LIST NAME
    store.changeListName = function (id, newName) {
        // GET THE LIST
        async function asyncChangeListName(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                playlist.name = newName;
                async function updateList(playlist) {
                    response = await api.updatePlaylistById(playlist._id, playlist);
                    if (response.data.success) {
                        async function getListPairs(playlist) {
                            response = await api.getPlaylistPairs();
                            if (response.data.success) {
                                let pairsArray = response.data.idNamePairs;
                                storeReducer({
                                    type: GlobalStoreActionType.CHANGE_LIST_NAME,
                                    payload: {
                                        idNamePairs: pairsArray,
                                        playlist: null
                                    }
                                });
                            }
                        }
                        getListPairs(playlist);
                    }
                }
                updateList(playlist);
            }
        }
        asyncChangeListName(id);
    }


    // store.dislikeList = function (id) {
    //     // GET THE LIST
    //     async function asyncChangeListName(id) {
    //         let response = await api.getPlaylistById(id);
    //         if (response.data.success) {
    //             let playlist = response.data.playlist;
    //             //playlist.numDislikes +=1
    //             async function updateList(playlist) {
    //                 response = await api.updatePlaylistById(playlist._id, playlist);
    //                 if (response.data.success) {
    //                     async function getListPairs(playlist) {
    //                         response = await api.getPlaylistPairs();
    //                         if (response.data.success) {
    //                             let pairsArray = response.data.idNamePairs;
    //                             storeReducer({
    //                                 type: GlobalStoreActionType.CHANGE_LIST_NAME,
    //                                 payload: {
    //                                     idNamePairs: pairsArray,
    //                                     playlist: null
    //                                 }
    //                             });
    //                         }
    //                     }
    //                     getListPairs(playlist);
    //                 }
    //             }
    //             updateList(playlist);
    //         }
    //     }
    //     asyncChangeListName(id);
    // }

    // store.dislikeList = function (id) {
    //     let user = auth.user.email;
         
    //     async function asyncDisLikes(id){
    //         let response = await api.dislikePlaylists(id, user);
    //         console.log("Response: ", response)
    //         if(response.status === 200){
    //             storeReducer({
    //                 //type:GlobalStoreActionType.DISLIKE_LIST,
    //                 payload:user
    //             })
    //             store.loadIdNamePairs()
    //             history.push('/allLists')
    //             store.loadIdNamePairs()
    //             history.push('/')
    //             history.push('/allLists')
    //         }
    //     }
    //     asyncDisLikes(id)
       
            
    // }

    store.dislikeList = function (id) {
        let user = auth.user.email;
         
        async function asyncDisLikes(id){
            let response = await api.dislikePlaylists(id, user);
            console.log("Response: ", response)
            if(response.status === 200){
                storeReducer({
                    
                    payload:user
                })
                store.loadPublishedPlaylists()
                store.hideModals()
                //history.push('/')
                history.push('/allLists')
            }
        }
        asyncDisLikes(id)
       
            
    }

    

    store.likeList = function (id) {
        let user = auth.user.email;
         
        async function asyncLikes(id){
            let response = await api.likePlaylist(id, user);
            console.log("Response: ", response)
            if(response.status === 200){
                storeReducer({
                    payload:user
                })
                //store.loadIdNamePairs()
                store.loadPublishedPlaylists()
                store.hideModals()
                //history.push('/')
                history.push('/allLists')
            }
        }
        asyncLikes(id)
       
            
    }



    store.sortByName = async function () {
        store.idNamePairs.sort(function(a, b){
            
            if( a.name.toLowerCase() < b.name.toLowerCase()) 
            { 
                return  -1; //this is the case of a
             }
            if(a.name.toLowerCase > b.name.toLowerCase) 
            { 
                return 1; 
            }
            return 0;
        } ); 
        history.push('/allLists');
    }

    
    store.sortByEditDate = async function () {
        store.idNamePairs.sort(function(a,b) {
            if (!a.isPublished) return 1;
            if (!b.isPublished) return -1;
            return new Date(b.updatedAt) - new Date(a.updatedAt);
        })
        history.push('/allLists');
    }

    store.sortByListens = async function () {
        store.idNamePairs.sort(function(a, b){
            return b.numListens - a.numListens;
        })
        history.push('/allLists');
    }
    store.sortByLikes = async function () {
        console.log("store.idNamePairs: ",store.idNamePairs);
        store.idNamePairs.sort(function(a, b){
            return b.numLikes - a.numLikes;
        })
        history.push('/allLists');
    }
    store.sortByDislikes = async function () {
        store.idNamePairs.sort(function(a, b){
            return b.numDislikes - a.numDislikes;
        })
        history.push('/allLists');
    }
    store.sortByDate = async function () {
        store.idNamePairs.sort(function(a,b) {
            if (!a.isPublished) return 1;
            if (!b.isPublished) return -1;
            return new Date(b.datePublished) - new Date(a.datePublished);
        })
        history.push('/allLists');
    }

    store.searchHandler = async function (query) {
        console.log('entered store.searchHandler')
        console.log('store.searchHandler query:',query)
       
        let searchFilter = function(idNamePair)  {
            let name = idNamePair.name.toLowerCase();
            let search = query.toLowerCase();
            return name.includes(search);
        }
        
        if (query != '') {
            let response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                store.idNamePairs = pairsArray.filter(searchFilter);
                console.log(store.idNamePairs);
            }

        }
        else {
            store.loadIdNamePairs();
        }
        history.push('/allLists')
    }


    store.toggleSearchForUser= function(){
        console.log("entered store.toggleSearchForUser")
    }


    store.publishPlaylist = function (){
        store.currentList.isPublished = true
        console.log("store.currentList in store.publishPlaylist: ",store.currentList)
        
        storeReducer({
            type: GlobalStoreActionType.PUBLISH_PLAYLIST,
            payload:{
                playlist: store.currentList
            }
        });
        store.updateCurrentList()
        //history.push('/')

    }

    // THIS FUNCTION PROCESSES CLOSING THE CURRENTLY LOADED LIST
    store.closeCurrentList = function () {
        console.log("entered store.closeCurrentList");
        storeReducer({
            type: GlobalStoreActionType.CLOSE_CURRENT_LIST,
            payload: {}
        });
        tps.clearAllTransactions();
        console.log(store.canUndo())
        history.push('/')
    }

    // store.commitUserComment = async function(comment,id){
    //     //console.log("test")
    //     console.log("commitUserComment->",comment)
    //     //console.log(auth.user.email)
    //     //console.log(id)
    //     //console.log(comment)
    //     //store.currentList =['test']
    //     //store.setCurrentList1(id)
    //     //console.log('store current list: ',store.currentList)
    //     store.setCurrentList1(id)
    //     store.getPlaylistForPlayer1(id)
    //     console.log("store.currentList - index 4 contains actual playlist",store.currentList[4])
    //     store.currentList[4].comments.push(comment)
    //     console.log("store.currentList after push - index 4 contains actual playlist",store.currentList[4])

    //     let newCommentList=store.currentList[4]

    //     storeReducer({
    //         type: GlobalStoreActionType.COMMENT_LIST,
    //         payload: newCommentList
    //     });


    //     //tps.clearAllTransactions();
    //     //console.log(store.canUndo())
    //     //history.push('/')
        
    //     //shows the right email, but only if signed in, as only signed in users can comment
    // }

    store.comments = function (comment, id) {
        let user = auth.user.email;
       let commentTemp= comment
        async function asyncLikes(id, commentTemp){
            let response = await api.commentList(id, user, commentTemp); //api.comment list not a function yet
            console.log("Response: ", response)
            if(response.status === 200){
                storeReducer({
                    payload:{user, commentTemp}
                })
                
                 history.push('/')
            }
        }
        asyncLikes(id,commentTemp)
       
            
    }

    store.listens = function (id){
        async function asyncListen(id){
           let response = await api.listensClicks(id);
           console.log("Response: ", response)
            console.log("ID:", id)
           if(response.status === 200){
              
            //    store.loadIdNamePairs()
            //    history.push('/')
           }else{
               console.log(id)
           }
       }
       asyncListen(id)

   }
    
    store.duplicateList = async function(id){
        console.log("id for duplicate in store: ",id)
        async function duplicateList1(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log(playlist);
                console.log(playlist.name);
                dupeCounter +=1
                let newListName= (playlist.name + ' copy'+dupeCounter)
                const responseCreateDupe = await api.createPlaylist(newListName, playlist.songs, auth.user.email);
                console.log("responseCreateDupe response data: " + responseCreateDupe);
                
                history.push('/allLists');
            }
            
        }
        duplicateList1(id);
    }

    // THIS FUNCTION CREATES A NEW LIST
    store.createNewList = async function () {
        let newListName = "Untitled" + store.newListCounter;
        const response = await api.createPlaylist(newListName, [], auth.user.email);
        //need to check if list with same name already exists for this user email
        console.log("createNewList response: " + response);
        if (response.status === 201) {
            tps.clearAllTransactions();
            let newList = response.data.playlist;
            storeReducer({
                type: GlobalStoreActionType.CREATE_NEW_LIST,
                payload: newList
            }
            );

            // IF IT'S A VALID LIST THEN LET'S START EDITING IT
            history.push("/playlist/" + newList._id);
        }
        else {
            console.log("API FAILED TO CREATE A NEW LIST");
        }
    }

    // THIS FUNCTION LOADS ALL THE ID, NAME PAIRS SO WE CAN LIST ALL THE LISTS
    store.loadIdNamePairs = function () {
        async function asyncLoadIdNamePairs() {
            const response = await api.getPlaylistPairs();
            if (response.data.success) {
                let pairsArray = response.data.idNamePairs;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE LIST PAIRS");
            }
        }
        asyncLoadIdNamePairs();
    }

    // THE FOLLOWING 5 FUNCTIONS ARE FOR COORDINATING THE DELETION
    // OF A LIST, WHICH INCLUDES USING A VERIFICATION MODAL. THE
    // FUNCTIONS ARE markListForDeletion, deleteList, deleteMarkedList,
    // showDeleteListModal, and hideDeleteListModal
    store.markListForDeletion = function (id) {
        async function getListToDelete(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;
                storeReducer({
                    type: GlobalStoreActionType.MARK_LIST_FOR_DELETION,
                    payload: {id: id, playlist: playlist}
                });
            }
        }
        getListToDelete(id);
    }

    store.unmarkListForDeletion = function (id) { //shreyas adding now to close modal cancel
        //store.listMarkedForDeletion !== null is the check, so we must make it null
        console.log("unmarking list for deletion, setting marked list to null")
            async function clearMarkedList(id) {
                let playlist=null;
                storeReducer({
                    type: GlobalStoreActionType.UNMARK_LIST_FOR_DELETION,
                    payload: { playlist: playlist}
                });
            }
            clearMarkedList(id);
        
    }

    store.deleteList = function (id) {
        async function processDelete(id) {
            let response = await api.deletePlaylistById(id); //this is me sending to the server
            console.log("response data: ",response)
            if (response.status ===200) {
                console.log("test")
                store.loadIdNamePairs(); //loads updated list from the server
                console.log("list state after delete list loadIdNamePair: ", store.idNamePairs)
                history.push("/");
            }
        }
        processDelete(id);
    }
    store.deleteMarkedList = function() {
        console.log("deletemarkedList: ", store.idNamePairs);
        store.deleteList(store.listIdMarkedForDeletion);
        console.log("deletemarkedList-: ", store.idNamePairs);
        store.hideModals();
    }
    // THIS FUNCTION SHOWS THE MODAL FOR PROMPTING THE USER
    // TO SEE IF THEY REALLY WANT TO DELETE THE LIST

    store.showEditSongModal = (songIndex, songToEdit) => {
        console.log("In store.showEditSongModal")
        console.log("songIndex: ", songIndex," songToEdit",songToEdit)
        storeReducer({
            type: GlobalStoreActionType.EDIT_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToEdit}
        });        
    }
    store.showRemoveSongModal = (songIndex, songToRemove) => {
        console.log("entered store's show_remove_song_modal ")
        console.log("songIndex: ",songIndex,"song To Remove: ", songToRemove) //displays right song
        storeReducer({
            type: GlobalStoreActionType.REMOVE_SONG,
            payload: {currentSongIndex: songIndex, currentSong: songToRemove}
        });        
    }
    store.hideModals = () => {
        storeReducer({
            type: GlobalStoreActionType.HIDE_MODALS,
            payload: {}
        });    
    }
    store.isDeleteListModalOpen = () => {
        return store.currentModal === CurrentModal.DELETE_LIST;
    }
    store.isEditSongModalOpen = () => {
        return store.currentModal === CurrentModal.EDIT_SONG;
    }
    store.isRemoveSongModalOpen = () => {
        return store.currentModal === CurrentModal.REMOVE_SONG;
    }

    // THE FOLLOWING 8 FUNCTIONS ARE FOR COORDINATING THE UPDATING
    // OF A LIST, WHICH INCLUDES DEALING WITH THE TRANSACTION STACK. THE
    // FUNCTIONS ARE setCurrentList, addMoveItemTransaction, addUpdateItemTransaction,
    // moveItem, updateItem, updateCurrentList, undo, and redo
    store.setCurrentList = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    tps.clearAllTransactions();
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    
                    history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.setCurrentList1 = function (id) {
        async function asyncSetCurrentList(id) {
            let response = await api.getPlaylistById(id);
            if (response.data.success) {
                let playlist = response.data.playlist;

                response = await api.updatePlaylistById(playlist._id, playlist);
                if (response.data.success) {
                    tps.clearAllTransactions();
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_LIST,
                        payload: playlist
                    });
                    
                    //history.push("/playlist/" + playlist._id);
                }
            }
        }
        asyncSetCurrentList(id);
    }

    store.getPlaylistForPlayer1 = function (id) {
        async function asyncGetPlaylistForPlayer(id) {
            let songsYtArray = [[],[],[],[],[]];
            console.log('testing console log')
            let response = await api.getPlaylistForPlayer(id); 
            //the id is there, and response is undefined
            if (response.data.success) {
                let playlist = response.data.playlist;
                console.log("playlist: ",playlist);
                console.log("Playlist Songs: ", playlist.songs);
                
                let i=0;
                songsYtArray[4] =(playlist)
                for(i;i<playlist.songs.length;i++) {
                    songsYtArray[0].push(playlist.songs[i].youTubeId)
                    songsYtArray[1].push(playlist.songs[i].title)
                    songsYtArray[2].push(playlist.songs[i].artist)
                    
                }
                console.log("id: ",id)
                songsYtArray[3].push(id)
                console.log("songsYtArray: ",songsYtArray)
                console.log("playlist line 495: ",playlist)
                if(songsYtArray ){
                    storeReducer({
                        type: GlobalStoreActionType.SET_CURRENT_PLAYER_LIST,
                        payload: songsYtArray //songsYtArray or playlist
                    });
                    console.log("SET_CURRENT_PLAYER_LIST : ",songsYtArray)
                }
                
                //return(songsYtArray);
                
                //to pass an array from store to YoutubePlaylister.js
                //can we call YoutubePlaylister function changePlaylist()
                
            }
        }
        asyncGetPlaylistForPlayer(id);
    }

    // store.getPlaylistForPlayer = function (id) {
    //     async function asyncGetPlaylistForPlayer(id) {
    //         let response = await api.getPlaylistForPlayer(id);
    //         if (response.data.success) {
    //             let playlist = response.data.playlist;
    //             console.log("playlist: ",playlist);
    //         }
    //     asyncGetPlaylistForPlayer(id);
    //     }
    // }


    store.getPlaylistSize = function() {
        return store.currentList.songs.length;
    }
    store.addNewSong = function() {
        let index = this.getPlaylistSize();
        this.addCreateSongTransaction(index, "Untitled", "?", "dQw4w9WgXcQ");
    }



    // THIS FUNCTION CREATES A NEW SONG IN THE CURRENT LIST
    // USING THE PROVIDED DATA AND PUTS THIS SONG AT INDEX
    store.createSong = function(index, song) {
        let list = store.currentList;      
        list.songs.splice(index, 0, song);
        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION MOVES A SONG IN THE CURRENT LIST FROM
    // start TO end AND ADJUSTS ALL OTHER ITEMS ACCORDINGLY
    store.moveSong = function(start, end) {
        let list = store.currentList;

        // WE NEED TO UPDATE THE STATE FOR THE APP
        if (start < end) {
            let temp = list.songs[start];
            for (let i = start; i < end; i++) {
                list.songs[i] = list.songs[i + 1];
            }
            list.songs[end] = temp;
        }
        else if (start > end) {
            let temp = list.songs[start];
            for (let i = start; i > end; i--) {
                list.songs[i] = list.songs[i - 1];
            }
            list.songs[end] = temp;
        }

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION REMOVES THE SONG AT THE index LOCATION
    // FROM THE CURRENT LIST
    store.removeSong = function(index) {
        let list = store.currentList;      
        list.songs.splice(index, 1); 

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    // THIS FUNCTION UPDATES THE TEXT IN THE ITEM AT index TO text
    store.updateSong = function(index, songData) {
        let list = store.currentList;
        let song = list.songs[index];
        song.title = songData.title;
        song.artist = songData.artist;
        song.youTubeId = songData.youTubeId;

        // NOW MAKE IT OFFICIAL
        store.updateCurrentList();
    }
    store.addNewSong = () => {
        let playlistSize = store.getPlaylistSize();
        store.addCreateSongTransaction(
            playlistSize, "Untitled", "?", "dQw4w9WgXcQ");
    }
    // THIS FUNCDTION ADDS A CreateSong_Transaction TO THE TRANSACTION STACK
    store.addCreateSongTransaction = (index, title, artist, youTubeId) => {
        // ADD A SONG ITEM AND ITS NUMBER
        let song = {
            title: title,
            artist: artist,
            youTubeId: youTubeId
        };
        let transaction = new CreateSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }    
    store.addMoveSongTransaction = function (start, end) {
        let transaction = new MoveSong_Transaction(store, start, end);
        tps.addTransaction(transaction);
    }
    // THIS FUNCTION ADDS A RemoveSong_Transaction TO THE TRANSACTION STACK
    store.addRemoveSongTransaction = () => {
        let index = store.currentSongIndex;
        let song = store.currentList.songs[index];
        let transaction = new RemoveSong_Transaction(store, index, song);
        tps.addTransaction(transaction);
    }
    store.addUpdateSongTransaction = function (index, newSongData) {
        let song = store.currentList.songs[index];
        let oldSongData = {
            title: song.title,
            artist: song.artist,
            youTubeId: song.youTubeId
        };
        let transaction = new UpdateSong_Transaction(this, index, oldSongData, newSongData);        
        tps.addTransaction(transaction);
    }
    store.updateCurrentList = function() {
        async function asyncUpdateCurrentList() {
            const response = await api.updatePlaylistById(store.currentList._id, store.currentList);
            if (response.data.success) {
                storeReducer({
                    type: GlobalStoreActionType.SET_CURRENT_LIST,
                    payload: store.currentList
                });
            }
        }
        asyncUpdateCurrentList();
    }
    store.undo = function () {
        tps.undoTransaction();
    }
    store.redo = function () {
        tps.doTransaction();
    }
    store.canAddNewSong = function() {
        return (store.currentList !== null);
    }
    store.canUndo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToUndo());
    }
    store.canRedo = function() {
        return ((store.currentList !== null) && tps.hasTransactionToRedo());
    }
    store.canClose = function() {
        return (store.currentList !== null);
    }

    store.loadPublishedPlaylists = async function() {
        async function loadPublishedPlaylists() {
            const response = await api.getPublishedPlaylists();
            if (response.data.success) {
                let pairsArray = response.data.data;
                storeReducer({
                    type: GlobalStoreActionType.LOAD_ID_NAME_PAIRS,
                    payload: pairsArray
                });
            }
            else {
                console.log("API FAILED TO GET THE published playlists");
            }
        }
        loadPublishedPlaylists();
    }

    // THIS FUNCTION ENABLES THE PROCESS OF EDITING A LIST NAME
    store.setIsListNameEditActive = function () {
        storeReducer({
            type: GlobalStoreActionType.SET_LIST_NAME_EDIT_ACTIVE,
            payload: null
        });
    }

    return (
        <GlobalStoreContext.Provider value={{
            store
        }}>
            {props.children}
        </GlobalStoreContext.Provider>
    );
}

export default GlobalStoreContext;
export { GlobalStoreContextProvider };