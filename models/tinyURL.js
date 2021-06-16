const mongoose =require('mongoose');

/*Schema*/
const TinyURL= mongoose.model('tinyurls', new mongoose.Schema({
    shortcode: {
        type: String,
        required: true,
        index: true,
        unique: true
    },
    url: {
        type: String,
        required: true,
        index: true
    },
    startDate:{
        type: Date,
        default: new Date(),
        index: true
    },
    lastSeenDate:{
        type: Date,
        default: null,
        index: true
    },
    redirectCount:{
        type: Number,
        default: 0,
        index: true
    }
}))

module.exports= {
    TinyURL : TinyURL
};