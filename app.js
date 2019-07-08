var bodyparser=require('body-parser');
var express=require('express');
var mongoose=require('mongoose');
var keys=require('./config/keys');
var session = require('express-session')
var app=express();
 

//Mongo DB Connect 
mongoose.connect(keys.mongodbURI,{ useNewUrlParser: true })
.then(() => console.log('MongoDB Connected'))
.catch(err => console.log(err));

//Template Engine 
app.set('view engine','ejs');



//Parser
app.use(bodyparser());
app.use(bodyparser.json());


// initialize body-parser to parse incoming parameters requests to req.body
app.use(bodyparser.urlencoded({ extended: true }));

//Exprerss Sessions
app.use(session({secret: keys.sessionsecret,saveUninitialized: true,resave: true}));



//Dashboard Middleware!
app.use('/dashboard',require('./routes/dashboard'));

//User Middleware
app.use('/people',require('./routes/peopleblock'));

//Authentication
app.use('/auth',require('./routes/user'))

//main route

//Front-Page
app.use('/',require('./routes/front'))

//Pharma
app.use('/pharma',require('./routes/pharma'))

//Poll
app.use('/poll',require('./routes/poll'))

//logistics
app.use('/logistics',require('./routes/logistics'))


//API
app.use('/api',require('./routes/api'))

//404
app.get('*',(req,res)=>{
    res.render('../views/elements/404')
});
 

app.listen(1999,()=>console.log('Listening to port '+keys.PORT))