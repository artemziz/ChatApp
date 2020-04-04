const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser,removeUser,getUser} = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connection',(socket) =>{
    socket.on('login',( name , callback) =>{
               
        const {error,user} = addUser({id:socket.id,name:name});
     
        if(error) return callback(error);
       return callback();
    })
    socket.on('getUser',(callback)=>{
        const user = getUser(socket.id);
        
        callback(user);
      
    })
    socket.on('disconnect', () => {
        const user = removeUser(socket.id);
    })
})




server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));