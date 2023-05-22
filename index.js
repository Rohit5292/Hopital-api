const express = require('express');
const router = require('./route/router');
const db = require('./config/mongoose');
const bodyParser = require('body-parser');
const passport= require('passport')
const passportStrategy = require('./config/passport')

const app = express();
const Port = 3000;


app.use(bodyParser.urlencoded({extended:false}))
app.use(bodyParser.json())
app.use(router)



app.listen(Port,(err)=>{
    if(err) console.log(err);
    else console.log('server is running')
})
