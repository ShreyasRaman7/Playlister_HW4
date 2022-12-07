const mongoose = require('mongoose')
const Schema = mongoose.Schema
/*
    This is where we specify the format of the data we're going to put into
    the database.
    
    @author McKilla Gorilla
*/
const playlistSchema = new Schema(
    {
        name: { type: String, required: true },
        ownerEmail: { type: String, required: true },
        songs: { type: [{
            title: String,
            artist: String,
            youTubeId: String
        }] },
        isPublished: { type: Boolean, default:false},
        userLikes: {type: Array},
        numlikes: {type:Number, default: 0},
        userDisLikes: {type: Array},
        numDislikes: {type:Number, default: 0},
        numListens: { type: Number, default: 0},
        datePublished: { type: Date, default:Date.now()},
        comments: { type: [{
            user:String,
            comment:String
        }]}
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
