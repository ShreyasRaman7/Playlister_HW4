/*
    This is where we'll route all of the received http requests
    into controller response functions.
    
    @author McKilla Gorilla
*/
const express = require('express')
const PlaylistController = require('../controllers/playlist-controller')
const router = express.Router()
const auth = require('../auth')

router.post('/playlist', auth.verify, PlaylistController.createPlaylist)
router.delete('/playlist/:id', auth.verify, PlaylistController.deletePlaylist)
router.get('/playlist/:id', auth.verify, PlaylistController.getPlaylistById)
router.get('/playlistpairs', auth.verify, PlaylistController.getPlaylistPairs)
router.get('/playlists', auth.verify, PlaylistController.getPlaylists)
router.put('/playlist/:id', auth.verify, PlaylistController.updatePlaylist)
router.get('/publishedPlaylists', PlaylistController.getPublishedPlaylists)
router.get('/guestGetPlaylist/:id',  PlaylistController.guestGetPlaylistById) //for guests to access playlist songs in youtube player
router.put('/likes/:id', auth.verify, PlaylistController.likePlaylist)
router.put('/dislikes/:id', auth.verify,PlaylistController.dislikePlaylist)
router.put('/comments/:id', auth.verify,  PlaylistController.commentPlaylist)
router.put('/listens/:id',   PlaylistController.playlistListens)

module.exports = router