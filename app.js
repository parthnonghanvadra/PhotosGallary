const express = require ('express');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
const config = require ('./config/database');
const connection = mongoose.connect(config.database, {
  useNewUrlParser: true, useUnifiedTopology: true });
  if(connection){
console.log("database connected");
}else{
console.log("database connection error");
}

app.use(express.json());

const routeuser = require('./routes/routeuser');
app.use("/api/Users", routeuser)

const routealbum = require('./routes/routealbum');

app.use("/api/Albums", routealbum)

const routephoto = require('./routes/routephoto');

app.use("/api/Photos", routephoto)

app.get("/",function(req,res){
    res.end("hello world");
})
app.listen(port,function(){
    console.log("server is " + port);});