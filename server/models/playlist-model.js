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
        }], required: true },
        isPublished: { type: Boolean, default:false},

        numLikes: { type: Number, default: 0 }, 

        likeUserEmails: { type: [String] }, //store user email, then to see num likes, we do count of unique emails


        numDislikes: { type: [{
            dislikes: Number,
            userEmail: [String]
        }]}, //store user email, then to see num likes, we do count of unique emails

        numListens: { type: [{
            listens: Number,
            userEmail: [String]
        }]}, //store user email, then to see num likes, we do count of unique emails

        datePublished: { type: Date, default:Date.now()},
        
        comments: { type: [{
            comment: String,
            userEmail: String,
            userFirstName: String,
            userLastName: String
        }]}, //store user email, then to see num likes, we do count of unique emails
    },
    { timestamps: true },
)

module.exports = mongoose.model('Playlist', playlistSchema)
