var express = require('express');
var todocontroller = require('./todocontroller')
const bodyParser= require('body-parser');

var app=express();

app.set('view engine','ejs');

app.use(bodyParser.urlencoded({extended:false}))
app.use(express.static('./public'))

todocontroller(app);

app.listen(3000, ()=>{
    console.log('Server running..')
})