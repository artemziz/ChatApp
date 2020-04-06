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
    let currentName;
    socket.on('setName',name =>{
        currentName = name;
        
        socket.emit('getRooms',{rooms:getRooms(currentName)});
    })
    socket.on('login',( name , callback) =>{
               
       const {error,user} = addUser({name:name});
        if(!error) currentName = name;
    
       return callback({error,user});
    })
    socket.on('getUser',(callback)=>{
        const user = getUser(currentName);      
        callback(user);

    })
    socket.emit('getRooms',{rooms:getRooms(currentName)});

    socket.on('createRoom',(callback)=>{
             
        const room = createRoom(currentName);
        socket.join(room);
        socket.emit('getRooms',{rooms:getRooms(currentName)});
        

    })
    socket.on('getMessages',(roomId,callback)=>{
        
        callback(getMessages(roomId));

    });
    
    socket.on('addUserToRoom',(room) =>{
        console.log(room);
        console.log(currentName);
        
        addUserToRoom(currentName,room);
        socket.join(room);
        socket.broadcast.to(room).emit('getMessages',{
            data:new Date(),
            author:'admin',
            content:`${currentName} присоединился к чату`
        })
    })
    socket.on('sendMessage',(message,room)=>{
        
        addMessage(getUser(currentName),room,message);
        socket.emit('getRooms',{rooms:getRooms(currentName)});
        socket.emit('')

    })
    socket.on('disconnect', () => {
        //const user = removeUser(socket.id);
    })
})




server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));