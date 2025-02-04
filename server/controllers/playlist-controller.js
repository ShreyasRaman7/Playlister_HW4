const Playlist = require('../models/playlist-model')
const User = require('../models/user-model');
/*
    This is our back-end API. It provides all the data services
    our database needs. Note that this file contains the controller
    functions for each endpoint.
    
    @author McKilla Gorilla
*/



// likePlaylist = async (req, res) => {
//     await Playlist.findOne({userLikes: req.body.user}, (err, user ) => {
//         if(!user){
//             Playlist.updateOne({_id:req.params.id},
//                 {$inc: {numlikes: 1},
//                 $push: {userLikes: req.body.user}},(err, data) => {
//                if(err){
//                    return res.status(404).json({
//                        err,
//                        message: 'Playlist not found!',
//                    })
//                }else{
//                 return res.status(200).json({ success: true, description: "Likes updated !user" ,user: user});
//                }
              
//            })
//         }else{
//             Playlist.updateOne({_id:req.params.id},
//                 {$inc: {numlikes: -1},
//                 $pull: {userLikes: req.body.user}},(err, data) => {
//                if(err){
//                    return res.status(404).json({
//                        err,
//                        message: 'Playlist not found!',
//                    })
//                }else{
//                 return res.status(200).json({ success: true, description: "Likes updated _user" ,user:req.body.user,datacann:data});
//                }
              
//            })
//         }
//     })
   
// }



// dislikePlaylist = (req, res) => {

// }

dislikePlaylist = async (req, res) => {
    await Playlist.findOne({userDisLikes: req.body.user}, (err, user ) => {
        if(!user){
            Playlist.updateOne({_id:req.params.id},
                {$inc: {numDislikes: 1},
                $push: {userDisLikes: req.body.user}},(err, data) => {
               if(err){
                   return res.status(404).json({
                       err,
                       message: 'Playlist not found!',
                   })
               }else{
                console.log(user)
                return res.status(200).json({ success: true, description: "User DisLikes updated" });
               }
              
           })
        }else{
            Playlist.updateOne({_id:req.params.id},
                {$inc: {numDislikes: -1},
                $pull: {userDisLikes: req.body.user}},(err, data) => {
               if(err){
                   return res.status(404).json({
                       err,
                       message: 'Playlist not found!',
                   })
               }else{
                return res.status(200).json({ success: true, description: "User DisLikes updated" });
               }
              
           })
        }
    })
   
}

likePlaylist = async (req, res) => {
    await Playlist.findOne({userLikes: req.body.user}, (err, user ) => {
        if(!user){
            Playlist.updateOne({_id:req.params.id},
                {$inc: {numlikes: 1},
                $push: {userLikes: req.body.user}},(err, data) => {
               if(err){
                   return res.status(404).json({
                       err,
                       message: 'Playlist not found!',
                   })
               }else{
                console.log(user)
                return res.status(200).json({ success: true, description: "User DisLikes updated" });
               }
              
           })
        }else{
            Playlist.updateOne({_id:req.params.id},
                {$inc: {numlikes: -1},
                $pull: {userLikes: req.body.user}},(err, data) => {
               if(err){
                   return res.status(404).json({
                       err,
                       message: 'Playlist not found!',
                   })
               }else{
                return res.status(200).json({ success: true, description: "User DisLikes updated" });
               }
              
           })
        }
    })
   
}

//orig like playlist below
// likePlaylist = async (req, res) => {
//     await Playlist.findOne({userLikes: req.body.user}, (err, user ) => {
//         if(!user){
//             Playlist.updateOne({_id:req.params.id},
//                 {$inc: {numlikes: 1},
//                 $push: {userLikes: req.body.user}},(err, data) => {
//                if(err){
//                    return res.status(404).json({
//                        err,
//                        message: 'Playlist not found!',
//                    })
//                }else{
//                 console.log(user)
//                 return res.status(200).json({ success: true, description: "User Likes updated" });
//                }
              
//            })
//         }else{
//             Playlist.updateOne({_id:req.params.id},
//                 {$inc: {numlikes: -1},
//                 $pull: {userLikes: req.body.user}},(err, data) => {
//                if(err){
//                    return res.status(404).json({
//                        err,
//                        message: 'Playlist not found!',
//                    })
//                }else{
//                 return res.status(200).json({ success: true, description: "User DisLikes updated" });
//                }
              
//            })
//         }
//     })
   
// }



createPlaylist = (req, res) => {
    const body = req.body;
    console.log("createPlaylist body: " + JSON.stringify(body));

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a Playlist',
        })
    }

    const playlist = new Playlist(body);
    console.log("playlist: " + playlist.toString());
    if (!playlist) {
        return res.status(400).json({ success: false, error: err })
    }

    User.findOne({ _id: req.userId }, (err, user) => {
        console.log("user found: " + JSON.stringify(user));
        console.log(playlist.name)
        user.playlists.push(playlist._id);
        user
            .save()
            .then(() => {
                playlist
                    .save()
                    .then(() => {
                        return res.status(201).json({
                            playlist: playlist
                        })
                    })
                    .catch(error => {
                        return res.status(400).json({
                            errorMessage: 'Playlist Not Created!'
                        })
                    })
            });
    })
}
deletePlaylist = async (req, res) => {
    console.log("delete Playlist with id: " + JSON.stringify(req.params.id));
    console.log("delete " + req.params.id);
    Playlist.findById({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                errorMessage: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    Playlist.findOneAndDelete({ _id: req.params.id }, () => {
                        return res.status(200).json({});
                    }).catch(err => console.log(err))
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ 
                        errorMessage: "authentication error" 
                    });
                }
            });
        }
        asyncFindUser(playlist);
    })
}
getPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));
 
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    return res.status(200).json({ success: true, playlist: list })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(list);
    }).catch(err => console.log(err))
}

guestGetPlaylistById = async (req, res) => {
    console.log("Find Playlist with id: " + JSON.stringify(req.params.id));
    
    await Playlist.findById({ _id: req.params.id }, (err, list) => {
        if (err) {
            return res.status(400).json({ success: false, error: err });
        }
        console.log("Found list: " + JSON.stringify(list));
        return res.status(200).json({ success: true, playlist: list })
        // DOES THIS LIST BELONG TO THIS USER?
        // async function asyncFindUser(list) {
        //     await User.findOne({ email: list.ownerEmail }, (err, user) => {
        //         console.log("user._id: " + user._id);
        //         console.log("req.userId: " + req.userId);
        //         if (user._id == req.userId) {
        //             console.log("correct user!");
        //             return res.status(200).json({ success: true, playlist: list })
        //         }
        //         else {
        //             console.log("incorrect user!");
        //             return res.status(400).json({ success: false, description: "authentication error" });
        //         }
        //     });
        // }
        // asyncFindUser(list);
    }).catch(err => console.log(err))
    
}


getPlaylistPairs = async (req, res) => {
    console.log("getPlaylistPairs");
    await User.findOne({ _id: req.userId }, (err, user) => {
        console.log("find user with id " + req.userId);
        async function asyncFindList(email) {
            console.log("find all Playlists owned by " + email);
            await Playlist.find({ ownerEmail: email }, (err, playlists) => {
                console.log("found Playlists: " + JSON.stringify(playlists));
                if (err) {
                    return res.status(400).json({ success: false, error: err })
                }
                if (!playlists) {
                    console.log("!playlists.length");
                    return res
                        .status(404)
                        .json({ success: false, error: 'Playlists not found' })
                }
                else {
                    console.log("Send the Playlist pairs");
                    // PUT ALL THE LISTS INTO ID, NAME PAIRS
                    let pairs = [];
                    for (let key in playlists) {
                        let list = playlists[key];
                        let pair = {
                            _id: list._id,
                            name: list.name,
                            numLikes:list.numlikes,
                            numDislikes:list.numDislikes,
                            numListens:list.numListens,
                            views:list.numListens,
                            songs:list.songs,
                            isPublished: list.isPublished,
                            isPublished: list.published,
                            datePublished: list.datePublished,
                            updatedAt: list.updatedAt, 
                            

                        };
                        pairs.push(pair);
                    }
                    return res.status(200).json({ success: true, idNamePairs: pairs })
                }
            }).catch(err => console.log(err))
        }
        asyncFindList(user.email);
    }).catch(err => console.log(err))
}


getPublishedPlaylists = async (req, res) => {
    console.log("getPublishedPlaylists");
    await Playlist.find({isPublished:true}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}


getPlaylists = async (req, res) => {
    await Playlist.find({}, (err, playlists) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (!playlists.length) {
            return res
                .status(404)
                .json({ success: false, error: `Playlists not found` })
        }
        return res.status(200).json({ success: true, data: playlists })
    }).catch(err => console.log(err))
}
updatePlaylist = async (req, res) => {
    const body = req.body
    console.log("updatePlaylist: " + JSON.stringify(body));
    console.log("req.body.name: " + req.body.name);

    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOne({ _id: req.params.id }, (err, playlist) => {
        console.log("playlist found: " + JSON.stringify(playlist));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }

        // DOES THIS LIST BELONG TO THIS USER?
        async function asyncFindUser(list) {
            await User.findOne({ email: list.ownerEmail }, (err, user) => {
                console.log("user._id: " + user._id);
                console.log("req.userId: " + req.userId);
                if (user._id == req.userId) {
                    console.log("correct user!");
                    console.log("req.body.name: " + req.body.name);

                    list.name = body.playlist.name;
                    list.songs = body.playlist.songs;
                    list.isPublished =body.playlist.isPublished;
                    list.publishedDate =body.playlist.publishedDate;
                    list.numLikes =body.playlist.numLikes;
                    list.numDislikes =body.playlist.numDislikes;
                    list.numListens =body.playlist.numListens;
                    list.comments =body.playlist.comments;
                    list
                        .save()
                        .then(() => {
                            console.log("SUCCESS!!!");
                            return res.status(200).json({
                                success: true,
                                id: list._id,
                                message: 'Playlist updated!',
                            })
                        })
                        .catch(error => {
                            console.log("FAILURE: " + JSON.stringify(error));
                            return res.status(404).json({
                                error,
                                message: 'Playlist not updated!',
                            })
                        })
                }
                else {
                    console.log("incorrect user!");
                    return res.status(400).json({ success: false, description: "authentication error" });
                }
            });
        }
        asyncFindUser(playlist);
    })
}

// commentPlaylist = async (req, res) => {
//     const body = req.body
//     if (!body) {
//         return res.status(400).json({
//             success: false,
//             error: 'You must provide a body to update',
//         })
//     }

//     Playlist.findOneAndUpdate({ _id: req.params.id }, {
//         $push : {comments: 
//             {comment:req.body.comment, user:req.body.user}, 
//         }
//         },
//         (err, playlist) => {
//         console.log("playlist found: " + JSON.stringify(playlist.comments));
//         if (err) {
//             return res.status(404).json({
//                 err,
//                 message: 'Playlist not found!',
//             })
//         }else{
            
//             return res.status(200).json({
//                 success: true,
//                 message: 'User commented Successful',
//             })
//         }
//     })
// }

commentPlaylist = async (req, res) => {
    const body = req.body
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a body to update',
        })
    }

    Playlist.findOneAndUpdate({ _id: req.params.id }, {
        $push : {comments: 
            {comment:req.body.comment, user:req.body.user}, 
        }
        },
        (err, playlist) => {
        //odconsole.log("playlist found: " + JSON.stringify(playlist.comments));
        if (err) {
            return res.status(404).json({
                err,
                message: 'Playlist not found!',
            })
        }else{
            
            return res.status(200).json({
                success: true,
                message: 'User commented Successful',
            })
        }
    })
}


playlistListens = async (req, res) =>{
    Playlist.updateOne({_id:req.params.id},
                {$inc: {numListens: 1}},(err, data) => {
               if(err){
                   return res.status(404).json({
                       err,
                       message: 'Playlist not found!',
                   })
               }else{
               console.log("Data: ",data)
                return res.status(200).json({ success: true, description: "User DisLikes updated" });
               }
              
           })
}

module.exports = {
    createPlaylist,
    deletePlaylist,
    getPlaylistById,
    getPlaylistPairs,
    getPlaylists,
    updatePlaylist,
    getPublishedPlaylists,
    guestGetPlaylistById,
    likePlaylist,
    commentPlaylist,
    dislikePlaylist,
    playlistListens
}