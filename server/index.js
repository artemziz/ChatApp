const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const {addUser,removeUser,getUser} = require('./users');
const {getRooms,createRoom,addUserToRoom,getMessages,addMessage} = require('./rooms');
const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());

io.on('connection',(socket) =>{
    socket.on('login',( name , callback) =>{
               
        const {error,user} = addUser({id:socket.id,name:name});
        
       return callback({error,user});
    })
    socket.on('getUser',(callback)=>{
        const user = getUser(socket.id);      
        callback(user);

    })
    socket.emit('getRooms',{rooms:getRooms(socket.id)});

    socket.on('createRoom',(callback)=>{
        const user = getUser(socket.id);
    
        
        const room = createRoom(socket.id,user.name);
        socket.join(room);
        socket.emit('getRooms',{rooms:getRooms(socket.id)});
        

    })
    socket.on('getMessages',(roomId,callback)=>{
        callback(getMessages(roomId));

    });
    socket.on('addUserToRoom',(room) =>{
        const user = getUser(socket.id);
        addUserToRoom(socket.id,user.name,room);
        socket.join(room);
        socket.broadcast.to(room).emit('message',{
            data:new Date(),
            author:'admin',
            content:`${user.name} присоединился к чату`
        })
    })
    socket.on('sendMessage',(message,room)=>{
        
        addMessage(getUser(socket.id),room,message);
        socket.emit('getRooms',{rooms:getRooms(socket.id)});

    })
    socket.on('disconnect', () => {
        //const user = removeUser(socket.id);
    })
})




server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));