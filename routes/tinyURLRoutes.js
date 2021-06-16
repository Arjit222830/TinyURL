const express= require('express');
const router= express.Router();
const shortid = require('shortid');
const {TinyURL} = require('../models/TinyURL');

router.get('/',async(req,res)=>{
    const tinyURLs= await TinyURL.find();
    res.status(200).send(tinyURLs);
});

//Get item info from tinyURL
router.get('/:shortcode/stats',async(req,res)=>{

    const tinyURL= await TinyURL.findOne({shortcode: req.params.shortcode}).select(['-_id','startDate','lastSeenDate','redirectCount']);

    if(!tinyURL)
        return res.status(404).send({ERROR:'TinyURL does not found in the system'});
    
    return res.status(200).send(tinyURL);
});

//Update uri from shortcode
router.get('/:shortcode',async(req,res)=>{

    try {
        const tinyURL= await TinyURL.findOneAndUpdate({shortcode: req.params.shortcode},{
            lastSeenDate: new Date(),
            $inc:{
                redirectCount: 1
            }
        },{new:true});

        if(!tinyURL)
            return res.status(404).send({ERROR:'Shortcode does not found in the system'});
        
        console.log(tinyURL);
        return res.status(302).redirect(`${tinyURL.shortcode}`);

    } catch(err){
        return res.status(404).send({ERROR:'Error while saving'});
    }
});

router.post('/shorten',async(req,res)=>{

    var {shortcode,url}= req.body;

    console.log(url);

    const regex= /^[0-9a-zA-Z_]{4,}$/;
    
    if(!shortcode){
        shortcode= shortid.generate().substring(0,6);
        while(!shortcode.match(regex))
            shortcode= shortid.generate().substring(0,6);
    }

    if(url && shortcode===url.substring(url.lastIndexOf('/')+1,url.lastIndexOf('.')))
        return res.status(201).send({shortcode:""});

    if(!url)
        return res.status(400).send({Error:'Url not present'});

    if(!shortcode.match(regex))
        return res.status(422).send({shortcode:"shortcode fails to meet the following regexp"});
    
    const isTinyUrlExist= await TinyURL.findOne({shortcode: shortcode});

    if(isTinyUrlExist)
        return res.status(409).send({ERROR:"Desired shortcode is already in use"});

    const tinyURL = new TinyURL({
        shortcode,
        url,
        lastSeenDate: ''
    });

    await tinyURL.save();

    res.send(tinyURL);


})

module.exports= router;