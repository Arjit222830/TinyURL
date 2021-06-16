const mongoose =require('mongoose');

/*Schema*/
const TinyURL= mongoose.model('tinyurls', new mongoose.Schema({
    shortcode: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    startDate:{
        type: Date,
        default: new Date()
    },
    lastSeenDate:{
        type: Date,
        default: null
    },
    redirectCount:{
        type: Number,
        default: 0
    }
}))

module.exports= {
    TinyURL : TinyURL
};