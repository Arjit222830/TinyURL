var mongoose = require("mongoose");
var express= require("express");
var app = express();
var bodyParser = require("body-parser");
const config= require('config');

//connecting MongoDB
mongoose.connect(config.get('db'),{useNewUrlParser: true,useUnifiedTopology: true})
.then(()=> console.log(`Connected to ${config.get('db')}...`))
.catch(err => console.log(`Could not connect to ${config.get('db')}...`,err));

//connecting tinyRoutes
const tinyURLRoutes= require('./routes/tinyURLRoutes');

mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

/*middlewares*/

app.use(express.json());

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));

app.use('/',tinyURLRoutes);

/*Port Config*/

const port=process.env.PORT || 8000;
console.log(port);
const server=app.listen(port, ()=> console.log(`Listening on port ${port}...`));
var env = process.env.NODE_ENV || 'development';
console.log(env);
module.exports= server;